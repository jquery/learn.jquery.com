<script>{
  "title": "Using jQuery",
  "level": "beginner"
}</script>

### jQuery Fundamentals

This tutorial will help you try out some common uses of jQuery.

If you haven't setup a demo HTML page that includes a copy of jQuery, see [How To Setup jQuery](https://learn.jquery.com/about-jquery/how-to-setup-jQuery/) for the complete tutorial on how to get started, or simply follow along with the examples below.

### Adding and Removing an HTML Class

jQuery is often used to bind events to elements in the DOM, assigning them functionality to be triggered by a user's actions on the page. To demonstrate, let's highlight the menu item a user last clicked by changing its HTML class to "active", and assigning the "active" class a different appearance using CSS.

First, copy or create the `index.html` file below:

```
// index.html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Demo</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="http://jquery.com">Home</a></li>
      <li><a href="http://google.com">About</a></li>
      <li><a href="http://github.com">Products</a></li>
    </ul>
  </nav>
  <script src="jquery.js"></script>
  <script src="demo.js"></script>
  <script src="main.css"></script>
</body>
</html>
```

The `<script src>` tags reference the jQuery library, which you should have downloaded and copied into your directory, as well as the files `demo.js` and `main.css`. If you don't already have them, create these two files in the same directory and copy their content as shown below.

* **Note:** Normally, these different types of files are sorted into folders that represent the overall structure of the webpage, reflecting the separation between content, action, and style, or, in parallel terms, model, controller, and view. Though you could alter the CSS of an element directly in the JavaScript by using jQuery's [`.css()`](http://api.jquery.com/css/) method, that piece of information about the style won't be included with the rest of the CSS, making it hard to find in the future, or for other developers. Similarly, you could construct HTML and text in a JavaScript file to be appended to the DOM, but again, that content won't be included with the rest of the HTML, where it belongs. Instead, organize and label your content in HTML, use JavaScript and jQuery to assign events to the elements, and let the CSS take care of the styling.

```
// demo.js
$( document ).ready(function( event ) {

  // Your code here

  event.preventDefault();

});
```

```
// main.css
a.active {
  font-weight: bold;
}
```

**Important:** *You must place the remaining jQuery examples inside the `ready` event so that your code executes when the document is ready to be worked on, as explained in the [previous setup tutorial](http://learn.jquery.com/about-jquery/how-to-setup-jQuery/).*

Add the [.addClass()](http://api.jquery.com/addClass/) call inside the `ready` event:

```
$( "a" ).addClass( "active" );
```

All `<a>` elements are now bold. If you right click on a link and select "Inspect Element" you'll see that the class of "active" has been added to all `<a>` elements.

To remove an existing class, use [.removeClass()](http://api.jquery.com/removeClass/):

```
$( "a" ).removeClass( "active" );
```

Let's bring this all together now. What if we only want the most recently clicked link to turn bold? jQuery can alter groups of elements by selecting all of them, but it can also point to a specific element using the `$(this)` referant.

```
var $links = $( "a" ).on( "click", function makeActive( event ) {

  $links.removeClass( "active" );
  $( this ).addClass( "active" );

  event.preventDefault();

});
```

First, we save the selection of all `<a>` elements to the variable `$links`, so we can reuse the selection later without having to query the DOM again.

Next, we remove the "active" class from all `<a>` elements, guaranteeing that the link clicked previously is no longer bold or "active".

`$(this)` then refers to the specific link that was clicked on, and so applies the HTML class only to that link, resulting in the desired effect of the "active" class moving from link to link as the user changes the focus.

This strategy of altering an HTML class is used all the time to alter an element based on user actions and events, like hiding content until a user clicks to expand it, or showing a different menu to a user based on whether or not they're signed in.

### Special Effects

jQuery also provides some handy visual [effects](http://api.jquery.com/category/effects/) to help you make your websites stand out. For example, if you create a click handler of:

```
$( "a" ).on("click", function fadeAway( event ) {

  event.preventDefault();

  $( this ).hide( "slow" );

});
```

The link slowly disappears when clicked.

## Callbacks and Functions

Unlike many other programming languages, JavaScript enables you to freely pass functions around to be executed at a later time. A *callback* is a function that is passed as an argument to another function and is executed after its parent function has completed. Callbacks are special because they patiently wait to execute until their parent finishes. Meanwhile, the browser can be executing other functions or doing all sorts of other work.

To use callbacks, it is important to know how to pass them into their parent function.

### Callback *without* Arguments

If a callback has no arguments, you can pass it in like this:

```
$.get( "myhtmlpage.html", myCallBack );
```

When [$.get()](http://api.jquery.com/jQuery.get/) finishes getting the page `myhtmlpage.html`, it executes the `myCallBack()` function.

* **Note:** The second parameter here is simply the function name (but *not* as a string, and without parentheses because you don't want to call the function at this point).

### Callback *with* Arguments

Executing callbacks with arguments can be tricky.

#### Wrong

This code example will ***not*** work:

```
$.get( "myhtmlpage.html", myCallBack( param1, param2 ) );
```

The reason this fails is that the code executes `myCallBack( param1, param2 )` immediately and then passes `myCallBack()`'s *return value* as the second parameter to `$.get()`. We actually want to pass the function `myCallBack()`, not `myCallBack( param1, param2 )`'s return value (which may or may not be a function). So, how to pass in `myCallBack()` *and* include its arguments?

#### Right

To defer executing `myCallBack()` with its parameters, you can use an anonymous function as a wrapper. Note the use of `function() {`. The anonymous function does exactly one thing: calls `myCallBack()`, with the values of `param1` and `param2`.

```
$.get( "myhtmlpage.html", function() {

  myCallBack( param1, param2 );

});
```

When `$.get()` finishes getting the page `myhtmlpage.html`, it executes the anonymous function, which executes `myCallBack( param1, param2 )`.
