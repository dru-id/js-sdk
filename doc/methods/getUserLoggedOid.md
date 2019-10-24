## Purpose
- Get the unique Object ID of the user logged
- Check if user is logged or not

## Method

```javascript
DRUID.getUserLoggedOid(entrypoint);
```
> This function returns a Promise object

## Parameters

| PARAMETER   | DESCRIPTION                               | REQUIRED | DEFAULT VALUE                 |
|-------------|-------------------------------------------|----------|-------------------------------|
| entrypoint  | Section-key Identifier of the web client. | false    | config.scope                  |

> config object its the same configuration passed in the init function

## Complete example

After DRUID.init event you can invoke it.

The example is getting the Object ID of the user logged.

```javascript
document.addEventListener('DRUID.init', function() {
	DRUID.getUserLoggedOid().then(function(oid) {
		// Logged
		alert(oid);
	}, function() {
		// Not logged or error catch
	});
});
```
