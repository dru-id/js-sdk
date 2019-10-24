## Purpose
- Check if user is logged or not
- Show or hide parts of web
- Optimize web code

## Method

```javascript
DRUID.isConnected(entrypoint);
```
> This function returns a Promise object

## Parameters

| PARAMETER   | DESCRIPTION                               | REQUIRED | DEFAULT VALUE                 |
|-------------|-------------------------------------------|----------|-------------------------------|
| entrypoint  | Section-key Identifier of the web client. | false    | config.scope                  |

> config object its the same configuration passed in the init function

## Complete example

After DRUID.init event you can invoke it.

The example is consulting whether the user is connected or not.

```javascript
document.addEventListener('DRUID.init', function() {
	DRUID.isConnected().then(function() {
		// Connected
	}, function() {
		// Not connected
	});
});
```
