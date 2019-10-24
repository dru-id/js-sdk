## Purpose

- Check if user needs to complete profile data

You can pass the optional entry point (scope).

## Method

```javascript
DRUID.checkUserComplete(entrypoint);
```
> This function returns a Promise object

## Parameters

| PARAMETER   | DESCRIPTION                               | REQUIRED | DEFAULT VALUE                 |
|-------------|-------------------------------------------|----------|-------------------------------|
| entrypoint  | Section-key Identifier of the web client. | false    | config.scope                  |

> config object its the same configuration passed in the init function

## Complete example

After DRUID.init event you can invoke it.

```javascript
document.addEventListener('DRUID.init', function() {
	DRUID.checkUserComplete().then(function() {
		// The user data its completed
	}, function() {
		// The user does need to complete data
	});
});
```
