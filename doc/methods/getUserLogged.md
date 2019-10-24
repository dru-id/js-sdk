## Purpose
- Get the personal data of the user logged
- Check if user is logged or not

## Method

```javascript
DRUID.getUserLogged(entrypoint);
```
> This function returns a Promise object

## Parameters

| PARAMETER   | DESCRIPTION                               | REQUIRED | DEFAULT VALUE                 |
|-------------|-------------------------------------------|----------|-------------------------------|
| entrypoint  | Section-key Identifier of the web client. | false    | config.scope                  |

> config object its the same configuration passed in the init function

## Complete example

After DRUID.init event you can invoke it.

The example is getting the user data logged.

```javascript
document.addEventListener('DRUID.init', function() {
	DRUID.getUserLogged().then(function(data) {
		// Logged
		// Ex. name: data.content.datas.name.value
		// Ex, email: data.content.ids.email.value
	}, function() {
		// Not logged or error catch
	});
});
```

Example with isConnected method
```javascript
document.addEventListener('DRUID.init', function() {
	DRUID.isConnected().then(function() {
		// Connected
		DRUID.getUserLogged().then(function(data) {
			// Logged
		}, function() {
			// Error catch
		});
	}, function() {
		// Not connected
	});
});
```
