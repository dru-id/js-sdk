## Requirements
 - Javascript ECMAScript 2015 or higher

The SDK is written completely in pure JavaScript, compatible with jQuery, Vue.js...

## Install

The DRUID SDK JS is a single JavaScript file, and you reference it with the HTML tag `<script>`. The `<script>` tag should be inside the `<head>`:

```html
<script type="text/javascript" src="sdk/druid.js"></script>
```
The attribute *type="text/javascript"* is not necessary with HTML5 compatible browsers.

### Configuration

The configuration has multiple options (with the parameters), you can choose the one that best suits your needs.

The code should be after DRUID install script, it can go wherever you think is appropriate, in `<head>` (recommend), `<body>` or inside other javascript function.

```javascript
DRUID.init(options, external);
```

The **options** parameter its a JSON object with configuration properties.

The **external** parameter its a path of the remote JSON file, it must contain the rest or all of the necessary properties, if one is already in the first parameter it will be replaced, **The external properties has priority.**

> This JSON file can be generate and download from DRUID Cockpit.

#### 1. Combined option

You can specify part of settings in the **options** (JSON object) parameter, and other part in the **external** parameter:

Example init function:
```html
<script type="text/javascript">
DRUID.init({scope: '1234567890-jssdktestapp'}, 'sdk/conf.json');
</script>
```
> This its interesting to set a common scope for all calls

External JSON file (sdk/conf.json):
```json
{
	"client_id": "123456789010",
	"redirections": {
		...
	},
	"endpoints": {
		...
	}
}
```

#### 2. Inline option
You can specify all settings in the **options** parameter.
This options its **fastest** because not necessary call a external file to get the properties.

Example init function:
```html
<script type="text/javascript">
DRUID.init({
	"scope": "1234567890-jssdktestapp",
	"client_id": "123456789010",
	"redirections": {
		...
	},
	"endpoints": {
		...
	}
});
</script>
```

#### 2. External JSON option
You can specify all the settings the **external** parameter

Example init function:
```html
<script type="text/javascript">
DRUID.init(null, 'sdk/conf.json');
</script>
```

External JSON file (sdk/conf.json):
```json
{
	"scope": "1234567890-jssdktestapp",
	"client_id": "123456789010",
	"redirections": {
		...
	},
	"endpoints": {
		...
	}
}
```