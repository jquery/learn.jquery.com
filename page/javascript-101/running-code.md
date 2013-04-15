---
title:        Running Code
level:        beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

### External

The first and recommended option is to write code in an external file (with a `.js` extension), which can then be included on our web page using an HTML `<script>` tag and pointing the `src` attribute to the file's location. Having JavaScript in a separate file will reduce code duplication if you want to reuse it on other pages. It will also allow the browser to cache the file on the remote client's computer, decreasing page load time.

```
<!-- Code is written in a .js file, included via the script tag src attribute. -->
<script src="/path/to/example.js"></script>
```
### Inline

The second option is to inline the code directly on the web page. This is also achieved using HTML `<script>` tags, but instead of pointing the `src` attribute to a file, the code is placed between the tags. While there are use cases for this option, the majority of the time it is best to keep our code in an external file as described above.

```
<!-- Embed code directly on a web page using script tags. -->
<script>
alert( "Hello World!" );
</script>
```

### Attributes

The last option is to use the event handler attributes of HTML elements. This method is strongly discouraged:

```
<!-- Inline code directly on HTML elements being clicked. -->
<a href="javascript:alert( 'Hello World' );">Click Me!</a>
<button onClick="alert( 'Good Bye World' );">Click Me Too!</a>
```

### Placement

Placement of the previous two options is important and can vary depending on the situation. If you are including JavaScript that doesn't access the elements on the page, you can safely place the script before the closing HTML `<head>` tag. However, if the code will interact with the elements on the page, you have to make sure those elements exist at the time the script is executed. This common pitfall can be seen in the example below. The script for finding the element with the ID `hello-world` will be executed before the element is defined in the document.

```
<!doctype html>
<html>
<head>
	<script>
	// Attempting to access an element too early will have unexpected results.
	var title = document.getElementById( "hello-world" );
	console.log( title );
	</script>
</head>
<body>

<h1 id="hello-world">Hello World</h1>

</body>
</html>
```

It is a common pattern to move scripts to the bottom of the page, prior to the closing HTML `<body>` tag. This will guarantee that elements are defined when the script is executed:

```
<!doctype html>
<html>
<head></head>
<body>

<h1 id="hello-world">Hello World</h1>
<script>
// Moving the script to the bottom of the page will make sure the element exists.
var title = document.getElementById( "hello-world" );
console.log( title );
</script>

</body>
</html>
```
