## Purpose
- Logging out the logged user
- Clear session in DRUID

## Method

```javascript
DRUID.logoutUser(entrypoint);
```
> This function returns a Promise object

This function can combine with isConnected if you previously want to verify that the user is logged, but not necesary, the catch can do it (see the example).

## Parameters

| PARAMETER   | DESCRIPTION                               | REQUIRED | DEFAULT VALUE                 |
|-------------|-------------------------------------------|----------|-------------------------------|
| entrypoint  | Section-key Identifier of the web client. | false    | config.scope                  |

> config object its the same configuration passed in the init function

## Complete example

For example you can invoke it when click the logout button. 

```javascript
document.getElementById('logoutUser').onclick = function() {
	// Logout button clicked...
	DRUID.logoutUser().then(function() {
		// Logout done!
	}, function() {
		// Not logged or catch other error
	});
}
```

## Event

If logout is done, then the "DRUID.logout" event will be dispatched:
```javascript
document.addEventListener('DRUID.logout', function() {
	alert('User logout done!');
});
```
