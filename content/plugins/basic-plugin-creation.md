---
chapter : plugins
section : 2
title   : How to create a basic plugin
attribution:  jQuery Fundamentals
---
Sometimes you want to make a piece of functionality available throughout your code; 
for example, perhaps you want a single method you can call on a jQuery selection that performs a series of operations on the selection. Maybe you wrote a really useful utility function that you want to be able to move easily to other projects.
In this case, you may want to write a plugin.

##How jQuery works 101

Before we write our own plugins, we must first understand a little about how jQuery works. Take a look at this code:

<javascript>
$('a').css('color','red');
</javascript> 

This is some pretty basic jQuery code, but do you know what's happening behind the scenes? Whenever you use the `$` function to select elements, it returns an object. This object contains all of the methods you've been using (`css()`, `click()`, etc.), and all of the elements that fit your selector. The `$` function gets the methods from the `$.fn` object. This object contains all of the jQuery methods, and If we want to write our own methods, it will need to contain those as well.

##Basic plugin authoring

Let's say we want to create a plugin that makes text green. All we have to do is add a function called `greenify` to `$.fn` and it will available just like any other method.

<javascript>
$.fn.greenify = function () {
  this.css('color','green');
}

$('a').greenify();  // makes all the links green
</javascript>

Notice that to use `css()`, another method, we use `this`, not `$(this)`. This is because our `greenify` function is a part of the same object as `css()`.

##Chaining

This works, but there's a couple of things we need to do for our plugin to survive in the real world. One of jQuery's features is chaining, when you link five or six actions onto one selector. This is accomplished by having all jQuery methods return the original jQuery object again (there are a few exeptions: `width()` called without parameters returns the width of the selected element, and is not chainable). Making our plugin chainable takes one line of code:

<javascript>
$.fn.greenify = function () {
  this.css('color','green');
  return this;
}

$('a').greenify().addClass('greenified');
</javascript>

##Adding scope

The `$` variable is very popular among javascript libraries, and if you're using one with jQuery, you will have to make jQuery not use the `$` with `jQuery.noConflict()`. However, this will break our plugin. To work well with other plugins, _and_ still use the jQuery `$` variable, we need to put all of our code inside of an [Immediately Invoked Function Expression](http://stage.learn.jquery.com/javascript-101/functions/#immediately-invoked-function-expression), and then pass the function `jQuery`, and name the parameter `$`:

<javascript>
(function ($) {
  $.fn.greenify = function () {
    this.css('color','green');
    return this;
  }
}(jQuery));
</javascript>

In addition, the primary purpose of an Immediately Invoked Function is to allow us to have our own private variables. Pretend we want a different color green, and we want to store it in a variable.

<javascript> 
(function ($) {
  var shade = '#556B2F';

  $.fn.greenify = function () {
    this.css('color',shade);
    return this;
  }
}(jQuery));
</javascript>

##Using the each() method

Your typical jQuery object will contain references to any number of DOM
elements, and that's why jQuery objects are often referred to as collections.

So, to do something with a collection we need to loop through it, which is most
easily achieved using jQuery's `each()` method:

<javascript>
$.fn.myNewPlugin = function() {
  return this.each(function(){

  });
};
</javascript>

jQuery's `each()` method, like most other jQuery methods, returns a jQuery
object, thus enabling what we've all come to know and love as 'chaining'
(`$(...).css().attr()...`).  We wouldn't want to break this convention so we
return the this object.  Within this loop you can do whatever you want with
each element.  

##Putting it together

Here's an example of a small plugin using some of the techniques
we've discussed:

<javascript>
(function($){
  $.fn.showLinkLocation = function() {
    return this.filter('a').each(function(){
      $(this).append( ' (' + $(this).attr('href') + ')');
    });
 };
}(jQuery));

 // Usage example:
 $('a').showLinkLocation();
</javascript>

This handy plugin goes through all anchors in the collection and appends the
href attribute in brackets.

<markup>
<!-- Before plugin is called: -->
<a href="page.html">Foo</a>

<!-- After plugin is called: -->
<a href="page.html">Foo (page.html)</a>
</markup>

Our plugin can be optimized though:

<javascript>
(function($){
  $.fn.showLinkLocation = function() {
    return this.filter('a').append(function(){
          return ' (' + this.href + ')';
    });
  };
}(jQuery));
</javascript>

We're using the `append` method's capability to accept a callback, and the
return value of that callback will determine what is appended to each element
in the collection.  Notice also that we're not using the `attr` method to
retrieve the href attribute, because the native DOM API gives us easy access
with the aptly named href property.

Here's another example of a plugin. This one doesn't require us to loop
through every element with the `each()` method.  Instead, we're simply going to
delegate to other jQuery methods directly:

<javascript>
(function($){
  $.fn.fadeInAndAddClass = function(duration, className) {
    return this.fadeIn(duration, function(){
        $(this).addClass(className);
    });
  };
}(jQuery));

// Usage example:
$('a').fadeInAndAddClass(400, 'finishedFading');
</javascript>
