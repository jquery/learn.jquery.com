---
chapter : jquery-basics"
section : 3
title   : CSS, Styling, & Dimensions
---
## CSS, Styling, &amp; Dimensions

jQuery includes a handy way to get and set CSS properties of elements.

<div class="note" markdown="1">
CSS properties that normally include a hyphen
need to be camel cased in JavaScript.  For example, the CSS property font-size
is expressed as fontSize when used as a property name in JavaScript.  This does
not apply, however, when passing the name of a CSS property to the `$.fn.css`
method as a string — in that case, either the camel cased or hyphenated form
will work.
</div>

<javascript caption="Getting CSS properties">
$('h1').css('fontSize'); // returns a string such as "19px"
$('h1').css('font-size'); // also works
</javascript>

<javascript caption="Setting CSS properties">
$('h1').css('fontSize', '100px'); // setting an individual property
$('h1').css({ 'fontSize' : '100px', 'color' : 'red' }); // setting multiple properties
</javascript>

Note the style of the argument we use on the second line — it is an object that
contains multiple properties. This is a common way to pass multiple arguments
to a function, and many jQuery setter methods accept objects to set mulitple
values at once.

### Using CSS Classes for Styling

As a getter, the `$.fn.css` method is valuable; however, it should generally be
avoided as a setter in production-ready code, because you don't want
presentational information in your JavaScript. Instead, write CSS rules for
classes that describe the various visual states, and then simply change the
class on the element you want to affect.

<javascript caption="Working with classes">
var $h1 = $('h1');

$h1.addClass('big');
$h1.removeClass('big');
$h1.toggleClass('big');

if ($h1.hasClass('big')) { ... }
</javascript>

Classes can also be useful for storing state information about an element, such as indicating that an element is selected.

### Dimensions

jQuery offers a variety of methods for obtaining and modifying dimension and position information about an element.

The code in “Basic dimensions methods”, is just a very brief overview of the
dimensions functionality in jQuery; for complete details about jQuery dimension
methods, visit the [Dimensions documentation on api.jquery.com](http://api.jquery.com/category/dimensions/).

<javascript caption="Basic dimensions methods">
$('h1').width('50px');   // sets the width of all H1 elements
$('h1').width();         // gets the width of the first H1

$('h1').height('50px');  // sets the height of all H1 elements
$('h1').height();        // gets the height of the first H1

$('h1').position();      // returns an object containing position
                         // information for the first H1 relative to
                         // its "offset (positioned) parent"
</javascript>
