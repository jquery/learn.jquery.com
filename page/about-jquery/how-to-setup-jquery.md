<script>{
	"title": "How To Setup jQuery",
	"level": "beginner"
}</script>

### jQuery: Setup

This is a basic tutorial, designed to help you get started using jQuery. Start by creating the following HTML page named `index.html` and open it in the browser:

```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Demo</title>
</head>
<body>
<a href="https://jquery.com/">jQuery</a>
<script src="jquery.js"></script>
<script src="demo.js"></script>
</body>
</html>
```

The `src` attribute in the first `<script>` element must point to a copy of jQuery. Download a copy of jQuery from the [Downloading jQuery](http://jquery.com/download/) page and store the `jquery.js` file in the same directory as `index.html`.

Alternatively you could use a [Content Delivery Network](https://code.jquery.com/) (CDN).

*Note: When you download jQuery, the file name may contain a version number, e.g., `jquery-x.y.z.js`. Make sure to either rename this file to `jquery.js` or update the `src` attribute of the `<script>` element to match the file name.*

Create another file in the same directory called `demo.js`. The `src` attribute in the second `<script>` element must point to the location of this JavaScript file, which will contain the code that will run on the page.

### Launching Code on Document Ready

To run code as soon as the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) is loaded and ready to be manipulated, you can use the jQuery [ready method](http://api.jquery.com/ready/):

```
$( document ).ready( function() {
  // Your code here.
} );

// Or the shorthand:
$( function() {
  // Document is ready!
} );
```

For example, inside the `ready` event, you can add a click handler to the link:

```
$( document ).ready( function() {
  $( "a" ).on( "click", function() {
    alert( "Thanks for visiting!" );
  } );
} );
```

Copy the above jQuery code into `demo.js`, save it, and reload `index.html`. Clicking the link should now first display an alert pop-up, and then continue with the browser's default behavior of navigating to https://jquery.com.

For `click` and most other [events](http://api.jquery.com/category/events/), you can prevent the default browser behavior by calling `event.preventDefault()` in the event handler:

```
$( document ).ready( function() {
  $( "a" ).on( "click", function customResponse( event ) {
    alert( "As you can see, the link no longer took you to jquery.com." );

    event.preventDefault();
  } );
} );
```

Try replacing the first snippet of jQuery code, which you previously copied into `demo.js`, with the one above. Save `index.html` and reload the page to try it out.

### Alternative Setups

You may encounter a somewhat similar strategy of running the code in an `onload` method as opposed to using `ready`, as shown below. `onload` will wait for all assets such as images and external style sheets to be fully loaded, so it should only be used in cases where the JavaScript needs to reference values from those assets.

```
window.onload = function waitForIt() {
  alert( "This will be slower than using .ready() and is not recommended." );
};
```

In other cases you may want to alias the jQuery namespace to avoid potential conflicts with other JavaScript libraries that also use `$`. The `ready` method can take an argument, so you can pass it callback function that takes the jQuery global object as its argument. This provides a "private" function scope in which you can safely reference jQuery by `$`.

```
jQuery( document ).ready( function setUp( $ ) {
  // Code using $ as usual goes here.
} );
```
