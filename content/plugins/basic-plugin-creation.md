---
title   : How to create a basic plugin
attribution:  jQuery Fundamentals
---
Sometimes you want to make a piece of functionality available throughout your code; 
for example, perhaps you want a single method you can call on a jQuery selection that performs a series of operations on the selection. 
In this case, you may want to write a plugin.

Most plugins are simply methods created in the `$.fn` namespace. jQuery guarantees that a method called on a jQuery object will be able to access that jQuery object as this inside the method. 
In return, your plugin needs to guarantee that it returns the same object it received, unless explicitly documented otherwise.

## How to create a basic plugin

The notation for creating a typical plugin is as follows:

<javascript>
(function($){
  $.fn.myNewPlugin = function() {
    return this.each(function(){
     // do something
    });
  };
}(jQuery));
</javascript>

Don't let that confuse you though. The point of a jQuery plugin is to extend
jQuery's prototype object, and that's what's happening on this line:

<javascript>
$.fn.myNewPlugin = function() { //...
</javascript>

We wrap this assignment in an immediately-invoked function:
<javascript>
(function($){
  //...
}(jQuery));
</javascript>

This has the effect of creating a "private" scope that allows us to extend
jQuery using the dollar symbol without having to risk the possibility that the
dollar has been overwritten by another library.

So our actual plugin, thus far, is this:

<javascript>
$.fn.myNewPlugin = function() {
  return this.each(function(){
    // do something
  });
};
</javascript>

The `this` keyword within the new plugin refers to the jQuery object on which
the plugin is being called.

<javascript>
var somejQueryObject = $('#something');

$.fn.myNewPlugin = function() {
  alert(this === somejQueryObject);
};

somejQueryObject.myNewPlugin(); // alerts 'true'
</javascript>

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
each element.  Here's an example of a small plugin using some of the techniques
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

Here's another example of a plugin.  This one doesn't require us to loop
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
