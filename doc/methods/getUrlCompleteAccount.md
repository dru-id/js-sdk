## Purpose

- Build DRUID complete account link

You can define a different url callback and pass the optional entry point (scope).

## Method

```javascript
DRUID.getUrlCompleteAccount(scope, urlCallback, state)
```
> This function returns a string

## Parameters

| PARAMETER   | DESCRIPTION                               | REQUIRED | DEFAULT VALUE                        |
|-------------|-------------------------------------------|----------|--------------------------------------|
| scope       | Section-key Identifier of the web client. | false    | config.scope                         |
| urlCallback | Url for callback                          | false    | config.redirections.postEditAccount  |
| state       | Parameter returned in url callback        | false    | null                                 |

> config object its the same configuration passed in the init function

## Complete example

> It is recommended to wait for the DRUID.init event in all examples

For example you can invoke it when click a button.

```javascript
document.getElementById('completeButton').onclick = function() {
	window.location.href = DRUID.getUrlCompleteAccount();
}
```

Example with checkUserComplete method
```javascript
DRUID.checkUserComplete().then(function(data) {
	// The user does not need to complete data
}, function() {
	// The user does need to complete data...
	window.location.href = DRUID.getUrlCompleteAccount();
});
```

Example setting href attribute to `<a>` element
```javascript
document.addEventListener('DRUID.init', function() {
	document.getElementById('completeLink').href = DRUID.getUrlCompleteAccount();
});
```
