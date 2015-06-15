<script>{
  "title": "How To Setup jQuery",
  "level": "beginner"
}</script>

### jQuery: Setup

This is a basic tutorial, designed to help you get started using jQuery. Start by creating the following HTML page and name it `index.html`, and open it in the browser:

```
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Demo</title>
</head>
<body>
  <a href="http://jquery.com/">jQuery</a>
  <script src="jquery.js"></script>
  <script src="demo.js"></script>
</body>
</html>
```

The `src` attribute in the first `<script>` element must point to a copy of jQuery. Download a copy of jQuery from the [Downloading jQuery](http://jquery.com/download/) page and store the `jquery.js` file in the same directory as your HTML file.

*Note: When you download jQuery, the file name may contain a version number, e.g., `jquery-x.y.z.js`. Make sure to either rename this file to `jquery.js` or update the `src` attribute of the `<script>` element to match the file name.*

Create another file in the same directory called `demo.js`. The `src` attribute in the second `<script>` element must point to the location of this JavaScript file, which will contain the code that will run on the page.

### Launching Code on Document Ready

To run code as soon as the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) is loaded and ready to be manipulated, jQuery has a statement known as the [ready event](http://api.jquery.com/ready/):

```
$( document ).ready(function() {

  // Your code here.

});
```

For example, inside the `ready` event, you can add a click handler to the link:

```
$( document ).ready(function() {

  $( "a" ).on( "click", function popUp( event ) {

    alert( "Thanks for visiting!" );

  });

});
```

Copy the above jQuery code into your JavaScript file. Then, save your HTML file and reload the demo page in your browser. Clicking the link should now first display an alert pop-up, then continue with the browser's default behavior of navigating to http://jquery.com.

For `click` and most other [events](http://api.jquery.com/category/events/), you can prevent the default browser behavior by calling `event.preventDefault()` in the event handler:

```
$( document ).ready(function() {

  $( "a" ).on( "click", function customResponse( event ) {

    alert( "As you can see, the link no longer took you to jquery.com" );

    event.preventDefault();

  });

});
```

Try replacing your first snippet of jQuery code, which you previously copied into your JavaScript file, with the one above. Save the HTML file and reload the page to try it out.

###Alternative Setups

Commonly used shorthand for the `ready` event uses `$` to reference jQuery:

```
$(function() {

  $( "a" ).on("click", function raiseAlert( event ) {

    alert( "Works interchangeably!" );

  });

});
```

You may encounter a somewhat similar strategy of running the code in an `onload` event as opposed to using `ready`, as shown below. `onload` will wait for all assets such as images and external style sheets to be fully loaded, so it should only be used in cases where the JavaScript needs to reference values from those assets.

```
window.onload = function waitForIt() {

  alert( "This will typically be slower than using .ready()" );

};
```

In other cases you may want to alias the jQuery namespace to avoid potential conflicts with other JavaScript libraries that may also use `$`. The `ready` function can take an argument, so you can pass it another function that takes the jQuery global object as its argument. This provides a "private" function scope in which you can safely reference jQuery by `$`.

```jQuery( document ).ready(function setUp( $ ) {
  // Code using $ as usual goes here.
});
```