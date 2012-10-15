---
title:        Running Code
attribution:  jQuery Fundamentals
github: jquery
---

### External

The first and recommended option is to write our code in an external file (with a ".js" extension), which can then be included on our web page using a HTML script tag and pointing the "src" attribute to our file's location. Having our JavaScript in it's own file will reduce code duplication if we wish to reuse it on other pages and will allow the browser to cache the file on the remote client's computer, decreasing our page load time.

``` js
// Saved in example.js.
alert('Hello World!');
```

``` html
<!--Code is then included via the script tag src attribute.-->
<script src="/path/to/example.js"></script>
```
### Inline

The second option is to inline the code directly on the web page. This is also achieved using HTML script tags but instead of pointing the "src" attribute to a file, we place the code between the tags. While there are use cases for this option, the majority of the time it is best to keep our code in an external file as described above.

``` html
<!--Embed code directly on a web page using script tags.-->
<script type="text/javascript">
  alert('Hello World!');
</script>
```

### Attributes

The last and strongly discouraged option, is to utilize the event handler attributes of HTML attributes.

``` html
<!--Inline code directly on HTML elements being clicked.-->
<a href="javascript:alert('Hello World!');">Click Me!</a>
<button onClick="alert('Good Bye World');">Click Me Too!</a>
```

### Placement

Placement of the previous two options is important and can vary depending on the situation. If we are including some JavaScript which does not access the elements on the page, we can safely place the script before the closing HTML head tag. However, if the code will interact with the elements on the page, we have to make sure those elements exists at the time of our script's execution. A common pitfall can be seen in the following example where we attempt to find the element with an ID of "hello-world", the problem here is our script will be executed prior to the element being defined within the document.

``` html
<!--Attempting to access an element too early will have unexpected results.-->
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript">
    var title = document.getElementById('hello-world');
    console.log(title);
</script>
</head>
<body>
<h1 id="hello-world">Hello World</h1>
</body>
</html>
```

It is a common pattern to just move our scripts to the bottom of the page, prior to the closing HTML body tag. This will guarentee the defination of any element we may need when our script is executed.

``` html
<!--Moving our script to the bottom of the page will make sure the element exists.-->
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<h1 id="hello-world">Hello World</h1>
<script type="text/javascript">
    var title = document.getElementById('hello-world');
    console.log(title);
</script>
</body>
</html>
```







