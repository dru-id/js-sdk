## Purpose

- Build DRUID login process link

You can defining a different url callback and pass the optional entry point (scope).

## Method

```javascript
DRUID.getUrlLogin(scope, urlCallback, social, prefill, state);
```
> This function returns a string

## Parameters

| PARAMETER   | DESCRIPTION                               | REQUIRED | DEFAULT VALUE                 |
|-------------|-------------------------------------------|----------|-------------------------------|
| scope       | Section-key Identifier of the web client. | false    | config.scope                  |
| urlCallback | Url for callback                          | false    | config.redirections.postLogin |
| social      | To force login with social network.       | false    | null                          |
| prefill     | Object with fields to prefilled values    | false    | null                          |
| state       | Parameter returned in url callback        | false    | null                          |

> config object its the same configuration passed in the init function

## Complete example

> It is recommended to wait for the DRUID.init event in all examples

For example you can invoke it when click the login button. 

```javascript
document.getElementById('loginButton').onclick = function() {
	window.location.href = DRUID.getUrlLogin();
}
```

Example with custom urlCallback
```javascript
document.getElementById('loginButton').onclick = function() {
	window.location.href = DRUID.getUrlLogin(null, "https://examples.dru-id.com/myalternativecallback");
}
```

Example setting href attribute to `<a>` element
```javascript
document.addEventListener('DRUID.init', function() {
	document.getElementById('loginLink').href = DRUID.getUrlLogin();
});
```
