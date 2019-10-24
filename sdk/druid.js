/*
*/
'use strict';

(function() {

window.DRUID = {
	config: {
		client_id: null,
		scope: null,
		// URL
		endpoints: {},
		redirections: {},
	},
	log: function(...args) {
		var c = 'color:#fff;margin-right:.3em;padding:.5em 1em;font-weight:bold;',
			c1 = c+'background:#008fbe;',
			c2 = c+'background:#c2d100;';
		console.log('%cD%cR%cU%cI%cD', c1, c1, c1, c2, c2, ...args);
	},
	// Helpers
	H: {
		paramsBuilder: function(params) {
			var urlParams = [];
			for(var param in params) {
				var value = params[param];
				if(value === null) { continue }
				urlParams.push(param+'='+encodeURIComponent(value));
			}
			return urlParams.join('&');
		},
		URLBuilder: function(url, params) {
			if(params) { url+='?'+this.paramsBuilder(params); }
			return url;
		},
		getParam: function(name) {
			var url = new URL(window.location.href);
			return url.searchParams.get(name);
		},
		prefill: function(data) {
			if(data === null) { return null; }
			if(data.constructor !== Object) { return null; }
			var prefill = {
				objectType: 'user',
				ids: {},
				location: { address: {} },
				datas: {}
			}
			for(var key in data) {
				var value = data[key];
				switch(true) {
					case ['email', 'screen_name', 'national_id', 'phone_number'].includes(key):
						prefill.ids[key] = { value: value };
					break;
					case ['telephone'].includes(key):
						prefill.location[key] = value;
					break;
					case ['streetAddress', 'locality', 'region', 'postalCode', 'country'].includes(key):
						prefill.location.address[key] = value;
					break;
					default:
						prefill.datas[key] = { value: value };
				}
			}
			return btoa(JSON.stringify(prefill));
		}
	},
	// Request
	request: function(method, uri, params, body, headers) {

		var url = this.H.URLBuilder(uri, params);
		var body = body||null;
		this.log('request ->', method, url);
		var that = this;

		return new Promise(function(done, fail) {
			var xhr = new window.XMLHttpRequest();
			xhr.open(method, url, true);
			xhr.setRequestHeader('Accept', 'application/json, text/javascript');
			xhr.withCredentials = true;
			//xhr.crossDomain = true;
			if(headers) {
				for(var key in headers) {
					var value = headers[key];
					xhr.setRequestHeader(key, value);
				}
			}
			if(body) {
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				xhr.send(that.H.paramsBuilder(body));
			} else {
				xhr.send(null);
			}
			xhr.onload = function() {
				if(xhr.status >= 200 && xhr.status < 300) {
					try {
						if(xhr.status == 204) { done(); } else { done(JSON.parse(xhr.response)); }
					} catch(e) { fail(); }
				} else {
					fail();
				}
			};
			xhr.onerror = function() { fail(); };
			
		});
	},
	// Init
	isInitialized: function() {
		if(!this.initialized) {
			this.log('not initialized');
			//throw new Error('DRUID not initialized');
		}
		return this.initialized;
	},
	initialized: false,
	init: function(options, external) {

		this.log('init...');

		// options
		this.config.scope = options.scope||null;
		this.config.client_id = options.client_id||null;
		this.config.redirections = options.redirections||{};
		this.config.endpoints = options.endpoints||{};

		var that = this;
		window.onload = function() {

			// external
			if(external) {
				that.request('GET', external).then(function(data) {
					that.log('external loaded', data);
					that.config = Object.assign(that.config, data);
					that.initialized = true;
					that.event('init');
				}, function() {
					that.log('error external json');
				});
			} else {
				that.event('init');
				that.initialized = true;
			}

			// callback
			if(that.H.getParam('code')) {
				that.event('login');
			}

		};

	},
	event: function(name) {
		return document.dispatchEvent(
			new CustomEvent('DRUID.'+name)
		);
	},
	// Methods
	/**
	 * Returns the link for login process.
	 *
	 * @return string The URL for login process.
	 */
	getUrlLogin: function(scope, urlCallback, social, prefill, state) {
		return this.H.URLBuilder(this.config.endpoints.authorization_endpoint, {
			client_id: this.config.client_id,
			redirect_uri: urlCallback||this.config.redirections.postLogin,
			response_type: 'code',
			scope: scope||this.config.scope,
			gid_auth_provider: social||null,
			x_prefill: this.H.prefill(prefill||null),
			state: state||null
		});
	},

	/**
	 * Returns the link for register form page.
	 *
	 * @return string The URL for register process.
	 */
	getUrlRegister: function(scope, urlCallback, prefill, state) {
		return this.H.URLBuilder(this.config.endpoints.signup_endpoint, {
			client_id: this.config.client_id,
			redirect_uri: urlCallback||this.config.redirections.register,
			response_type: 'code',
			x_method: 'sign_up',
			scope: scope||this.config.scope,
			x_prefill: this.H.prefill(prefill||null),
			state: state||null
		});
	},

	/**
	 * Returns the link for edit account form page.
	 *
	 * @return string The URL for edit account process.
	 */
	getUrlEditAccount: function(scope, urlCallback, state) {
		var params = { client_id: this.config.client_id, redirect_uri: urlCallback||this.config.redirections.postEditAccount }
		return this.H.URLBuilder(this.config.endpoints.edit_account_endpoint, {
			client_id: this.config.client_id,
			next: this.H.URLBuilder(this.config.endpoints.next_url, params),
			cancel_url: this.H.URLBuilder(this.config.endpoints.cancel_url, params),
			scope: scope||this.config.scope,
			state: state||null
		});
	},

	/**
	 * Returns the URL to complete the account for a section (scope) given.
	 *
	 * @return string The URL for complete process.
	 */
	getUrlCompleteAccount: function(scope, urlCallback, state) {
		var params = { client_id: this.config.client_id, redirect_uri: urlCallback||this.config.redirections.postEditAccount }
		return this.H.URLBuilder(this.config.endpoints.complete_account_endpoint, {
			client_id: this.config.client_id,
			next: this.H.URLBuilder(this.config.endpoints.next_url, params),
			cancel_url: this.H.URLBuilder(this.config.endpoints.cancel_url, params),
			scope: scope||this.config.scope,
			state: state||null
		});
	},
	/**
	 * Returns the personal data of the user logged.
	 */
	me: null,
	getUserLogged: function(entrypoint) {
		if(!this.isInitialized()) { return; }
		this.me = this.me||this.request('GET', this.config.endpoints.me, null, null, {
			"From-Origin": this.config.client_id,
			"From": entrypoint||this.config.scope,
		});
		return this.me;
	},
	/**
	 * Helper to check if the user is connected (logged on DruID)
	 */
	isConnected: function(entrypoint) {
		return this.getUserLogged(entrypoint).then(function() {});
	},
	/**
	 * Checks if the user have been completed all required fields for that section.
	 */
	checkUserComplete: function(entrypoint) {
		return this.getUserLogged(entrypoint).then(function(data) {
			if(data.result.status !== 200) { return Promise.reject(); }
		});
	},
	/**
	 * Performs the logout process.
	 */
	logoutUser: function(entrypoint) {
		if(!this.isInitialized()) { return; }
		var that = this;
		return this.request('GET', this.config.endpoints.logout, null, null, {
			"From-Origin": this.config.client_id,
			"From": entrypoint||this.config.scope,
		}).then(function() {
			that.me = null;
			that.event('logout');
		});
	},
	/**
	 * Returns ObjectID of user Logged
	 * You must use this method to get the oid of user logged
	 */
	getUserLoggedOid: function(entrypoint) {
		return this.getUserLogged(entrypoint).then(function(data) {
			return data.content.objectId;
		});
	}
}

})();