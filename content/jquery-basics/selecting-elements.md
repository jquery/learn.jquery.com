---
chapter : jquery-basics
section : 2
title   : Selecting Elements
---

The most basic concept of jQuery is to “select some elements and do something with
them.” jQuery supports most CSS3 selectors, as well as some non-standard
selectors.  For a complete selector reference, visit the
[Selectors documentation on api.jquery.com](http://api.jquery.com/category/selectors/).

Following are a few examples of common selection techniques.

<javascript caption="Selecting elements by ID">
$('#myId'); // note IDs must be unique per page
</javascript>

For performance, it's preferable try to anchor your selections to an id. JavaScript has a built-in function to get elements by id (called, not coincidentally, getElementById).

<javascript caption="Selecting elements by class name">
$('div.myClass'); // performance improves if you specify element type
</javascript>

<javascript caption="Selecting elements by attribute">
$('input[name=first_name]'); // beware, this can be very slow in older browsers
</javascript>

It's possible to select children of elements using compound selectors, just like with CSS.

<javascript caption="Selecting elements by compound CSS selector">
$('#contents ul.people li');
</javascript>

[jQuery reads selectors from right to left]  (http://net.tutsplus.com/tutorials/javascript-ajax/quick-tip-think-right-to-left-with-jquery/), so in the above example, it starts by looking for every li on the page, then it narrows it down to just those list items inside ul's with the class of people. Then finally it returns only the ones that meet those conditions and are children of #contents.

This is a very expensive operation to perform because we start with many elements and whittle them down. It would be a lot faster if we could start with that id, #content. And we can! You can select the parent by id then use find() to target the children like so.

<javascript caption="Selecting the parent element and finding its children.">
$('#contents').find('ul.people li');
</javascript>

You can learn more about find() and other traversal methods in [Traversing] (http://stage.learn.jquery.com/jquery-basics/traversing/).

### Pseudo-selectors

You can also select elements with pseudo-selectors, just like with CSS.

<javascript>
$('a.external:first');
$('tr:odd');
$('#myForm :input');   // select all input-like elements in a form
$('div:visible');
$('div:gt(2)');        // all except the first three divs
$('div:animated');     // all currently animated divs
</javascript>


<div class="note" markdown="1">
When you use the :visible and :hidden pseudo-selectors, jQuery tests the actual 
visibility of the element, not its CSS visibility or display — that is, it looks 
to see if the element's physical height and width on the page are both greater than zero. 
However, this test doesn't work with &lt;tr> elements; in this case, jQuery does check 
the CSS display property, and considers an element hidden if its display property 
is set to none. Elements that have not been added to the DOM will always be 
considered hidden, even if the CSS that would affect them would render them 
visible. (See the Manipulation section later in this chapter to learn how to 
create and add elements to the DOM.)

For reference, here is the code jQuery uses to determine whether an element is visible or hidden, with comments added for clarity:

</div>
<javascript>
    jQuery.expr.filters.hidden = function( elem ) {
      var width = elem.offsetWidth, height = elem.offsetHeight,
      skip = elem.nodeName.toLowerCase() === "tr";

      // does the element have 0 height, 0 width,
      // and it's not a &lt;tr>?
      return width === 0 && height === 0 && !skip ?

          // then it must be hidden
          true :

          // but if it has width and height
          // and it's not a &lt;tr>
          width > 0 && height > 0 && !skip ?

              // then it must be visible
              false :

              // if we get here, the element has width
              // and height, but it's also a &lt;tr>,
              // so check its display property to
              // decide whether it's hidden
              jQuery.curCSS(elem, "display") === "none";
    };

    jQuery.expr.filters.visible = function( elem ) {
      return !jQuery.expr.filters.hidden( elem );
    };
</javascript>

### Choosing Selectors

Choosing good selectors is one way to improve the performance of your JavaScript. 
A little specificity — for example, including an element type such as div when
 selecting elements by class name — can go a long way. Generally, any time you 
can give jQuery a hint about where it might expect to find what you're looking for, 
you should. On the other hand, too much specificity can be a bad thing. 
A selector such as `#myTable thead tr th.special` is overkill if a selector 
such as `#myTable th.special` will get you what you want.

jQuery offers many attribute-based selectors, allowing you to make selections 
based on the content of arbitrary attributes using simplified regular expressions.

<javascript>
// find all <a>s whose rel attribute
// ends with "thinger"
$("a[rel$='thinger']");
</javascript>

While these can be useful in a pinch, they can also be extremely slow in older browsers.
Wherever possible, make your selections using IDs, class names, and tag names.

### Does My Selection Contain Any Elements?

Once you've made a selection, you'll often want to know whether you have anything to work with.
 You may be inclined to try something like:

<javascript>
if ($('div.foo')) { ... }
</javascript>

This won't work. When you make a selection using `$()`, an object is always returned, 
and objects always evaluate to true. Even if your selection doesn't contain any elements, 
the code inside the if statement will still run.

Instead, you need to test the selection's length property, which tells you how many 
elements were selected. If the answer is 0, the length property will evaluate to false 
when used as a boolean value.

<javascript caption="Testing whether a selection contains elements">
    if ($('div.foo').length) { ... }
</javascript>

### Saving Selections

Every time you make a selection, a lot of code runs, and jQuery doesn't do caching of 
selections for you. If you've made a selection that you might need to make again, you 
should save the selection in a variable rather than making the selection repeatedly.

<javascript>
var $divs = $('div');
</javascript>

<div class="note" markdown="1">
In “Storing selections in a variable”, the variable name begins with a dollar sign. 
Unlike in other languages, there's nothing special about the dollar sign in JavaScript — 
it's just another character. We use it here to indicate that the variable contains a 
jQuery object. This practice — a sort of Hungarian notation — is merely convention, 
and is not mandatory.
</div>

Once you've stored your selection, you can call jQuery methods on the variable you 
stored it in just like you would have called them on the original selection.

<div class="note" markdown="1">
A selection only fetches the elements that are on the page when you make the selection. 
If you add elements to the page later, you'll have to repeat the selection or otherwise 
add them to the selection stored in the variable. Stored selections don't magically 
update when the DOM changes.
</div>

### Refining & Filtering Selections

Sometimes you have a selection that contains more than what you're after; in this case, you may want to refine your selection. jQuery offers several methods for zeroing in on exactly what you're after.

<javascript caption="Refining selections">
$('div.foo').has('p');          // div.foo elements that contain &lt;p>'s
$('h1').not('.bar');            // h1 elements that don't have a class of bar
$('ul li').filter('.current');  // unordered list items with class of current
$('ul li').first();             // just the first unordered list item
$('ul li').eq(5);               // the sixth
</javascript>

### Selecting Form Elements

jQuery offers several pseudo-selectors that help you find elements in your forms; 
these are especially helpful because it can be difficult to distinguish between 
form elements based on their state or type using standard CSS selectors.

### :button
Selects <button> elements and elements with type="button"

#### :checkbox
Selects inputs with type="checkbox"

#### :checked
Selects checked inputs

#### :disabled
Selects disabled form elements

#### :enabled
Selects enabled form elements

#### :file
Selects inputs with type="file"

#### :image
Selects inputs with type="image"

#### :input
Selects <input>, <textarea>, and <select> elements

#### :password
Selects inputs with type="password"

#### :radio
Selects inputs with type="radio"

#### :reset
Selects inputs with type="reset"

#### :selected
Selects options that are selected

#### :submit
Selects inputs with type="submit"

#### :text
Selects inputs with type="text"

<javascript caption="Using form-related pseduo-selectors">
    $('#myForm :input'); // get all elements that accept input
</javascript>
