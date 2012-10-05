---
title   : How jQuery Works
status: needswork
editrequired: 11
attribution:  jQuery Docs
---
### jQuery: The Basics

This is a basic tutorial, designed to help you get started using jQuery. If you
don't have a test page setup yet, start by creating a new HTML page with the
following contents:
``` html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo</title>
  </head>
  <body>
    <a href="http://jquery.com/">jQuery</a>
    <script src="jquery.js"></script>
    <script>
    var foo = "bar";
    </script>
  </body>
</html>
```

Edit the `src` attribute in the script tag to point to your copy of jquery.js.
For example, if jquery.js is in the same directory as your HTML file, you
can use:
``` html
  <script src="jquery.js"></script>
```

You can download your own copy of jQuery from the [Downloading jQuery](../downloading-jquery/) page

### Launching Code on Document Ready
The first thing that most Javascript programmers end up doing is adding some code to their program, similar to this:
``` js
window.onload = function(){ alert("welcome"); }
```
Inside of which is the code that you want to run right when the page is loaded. Problematically, however, the Javascript code isn't run until all images are finished downloading (this includes banner ads). The reason for using window.onload in the first place is that the HTML 'document' isn't finished loading yet, when you first try to run your code.

To circumvent both problems, jQuery has a simple statement that checks the `document` and waits until it's ready to be manipulated, known as the [ ready event ](http://api.jquery.com/ready):

``` js
$(document).ready(function(){
  // Your code here
});
```

Inside the ready event, add a click handler to the link:

``` js
$(document).ready(function(){
  $("a").click(function(event){
    alert("Thanks for visiting!");
  });
});
```
Save your HTML file and reload the test page in your browser. Clicking the link on the page should make a browser's alert pop-up, before leaving to go to the main jQuery page.

For click and most other [events](http://api.jquery.com/category/events/), you can prevent the default behaviour - here, following the link to jquery.com - by calling event.preventDefault() in the event handler:

``` js
$(document).ready(function(){
  $("a").click(function(<b>event</b>){
    alert("As you can see, the link no longer took you to jquery.com");
    <b>event.preventDefault();</b>
  });
});
```

### Complete Example

The following is an example of what the complete HTML file might look like if
you were to use the script in your own file. Note that it links to Google's
[CDN](http://code.google.com/apis/libraries/) to load the jQuery core file.
Also, while the custom script is included in the `<head>`, it is generally
preferable to place it in a separate file and refer that file with the script
element's src attribute

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>jQuery demo</title>
</head>
<body>
  <a href="http://jquery.com/">jQuery</a>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
  <script>
    $(document).ready(function(){
      $("a").click(function(event){
        alert("The link will no longer take you to jquery.com");
        event.preventDefault();
      });
    });
  </script>
</body>
</html>
```

### Adding and Removing an HTML Class

**Important:** *The remaining jQuery examples will need to be placed inside the ready event so that they are executed when the document is ready to be worked on.*

Another common task is adding (or removing) a `class`.

First, add some style information into the `head` of your document, like this:

``` html
<style>
   a.test { font-weight: bold; }
</style>
```

Next, add the [addClass](http://api.jquery.com/addClass) call to your script:

``` js
$("a").addClass("test");
```

All your `a` elements will now be bold.

To remove the `class`, use [removeClass](http://api.jquery.com/removeClass)

``` js
$("a").removeClass("test");
```

### Special Effects

In jQuery, a couple of handy [effects](http://api.jquery.com/category/effects/)
are provided, to really make your web site stand out. To put this to the test,
change the click that you added earlier to this:

``` js
$("a").click(function(event){
  event.preventDefault();
  $(this).hide("slow");
});
```

Now, if you click any link, it should make itself slowly disappear.

## Callback and Functions

A callback is a function that is passed as an argument to another function and
is executed after its parent function has completed. The special thing about a
callback is that functions that appear after the "parent" can execute before
the callback executes.  Another important thing to know is how to properly pass
the callback.

### Callback *without* arguments

For a callback with no arguments you pass it like this:

``` js
$.get('myhtmlpage.html', myCallBack);
```

**Note** that the second parameter here is simply the function name (but *not* as a string and without parentheses). Functions in Javascript are 'First class citizens' and so can be passed around like variable references and executed at a later time.

### Callback *with* arguments

"What do you do if you have arguments that you want to pass?", you might ask yourself.

#### Wrong
The Wrong Way (will ***not*** work!)

``` js
$.get('myhtmlpage.html', myCallBack(param1, param2));
```


This will not work because it calls `myCallBack(param1, param2)`


and then passes the return value as the second parameter to [$.get()](http://api.jquery.com/jQuery.get/)

#### Right

The problem with the above example is that `myCallBack(param1, param2)` is
evaluated before being passed as a function. Javascript and by extension jQuery
expects a function pointer in cases like these, e.g., `setTimeout( function() {}, 100)`

In the below usage, an anonymous function is created (just a block of
statements) and is registered as the callback function.  Note the use of
`function(){`.  The anonymous function does exactly one thing:  calls
`myCallBack`, with the values of `param1` and `param2` from the outer scope.

``` js
 $.get('myhtmlpage.html', function(){
   myCallBack(param1, param2);
 });
```

`param1` and `param2` are evaluated as a callback when the `$.get` is done getting the page.
