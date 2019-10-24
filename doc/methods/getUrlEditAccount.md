## Purpose

- Build DRUID edit account (or profile) link

You can defining a different url callback and pass the optional entry point (scope).

## Method

```javascript
DRUID.getUrlEditAccount(scope, urlCallback, state)
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

For example you can invoke it when click the profile button.

```javascript
document.getElementById('profileButton').onclick = function() {
	window.location.href = DRUID.getUrlEditAccount();
}
```

Example with different urlCallback
```javascript
document.getElementById('profileButton').onclick = function() {
	window.location.href = DRUID.getUrlEditAccount(null, "https://examples.dru-id.com/myalternativecallback");
}
```

Example with different scope (entry point)
```javascript
document.getElementById('profileButton').onclick = function() {
	window.location.href = DRUID.getUrlEditAccount("231705665113870-st-jmeter");
}
```

Example setting href attribute to `<a>` element
```javascript
document.addEventListener('DRUID.init', function() {
	document.getElementById('profileLink').href = DRUID.getUrlEditAccount();
});
```
