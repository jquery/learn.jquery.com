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

<javascript caption="Selecting elements by class name">
$('div.myClass'); // performance improves if you specify element type
</javascript>

<javascript caption="Selecting elements by attribute">
$('input[name=first_name]'); // beware, this can be very slow in older browsers
</javascript>


<javascript caption="Selecting elements by compound CSS selector">
$('#contents ul.people li');
</javascript>

<javascript caption="Pseudo-selectors">
$('a.external:first');
$('tr:odd');
$('#myForm :input');   // select all input-like elements in a form (more on this below)
$('div:visible');
$('div:gt(2)');        // all except the first three divs
$('div:animated');     // all currently animated divs
</javascript>


<div class="note" markdown="1">
**Note:** when you use the `:visible` and `:hidden` pseudo-selectors, jQuery tests the actual 
visibility of the element, not its CSS visibility or display. By that. we mean it looks 
to see if the element's physical height and width on the page are both greater than zero. 

However, this test doesn't work with `<tr>` elements; in this case, jQuery does check 
the CSS display property, and considers an element hidden if its display property 
is set to none.

Elements that have not been added to the DOM will always be 
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
$('div.foo').has('p');          // div.foo elements that contain <p> tags
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

By using the `:button` pseudo-selector, we target just the `<button>` elements and elements with a `type="button"`.

<javascript caption=":button pseudo-selector">
$('form :button');               // selects <button> elements and elements with type="button"
</javascript>

In order to get the best performance using `:button`, we recommend to
first select elements with a standard jQuery selector, then to use
`.filter(":button")`. More can be seen on the [jQuery :button
documentation page](http://api.jquery.com/button-selector/). Or, precede
the pseudo-selector with a tag name/some other selector.

#### :checkbox

When using the `:checkbox` pseudo-selector, we target any elements with
a `type="checkbox"`.

<javascript caption=":checkbox pseudo-selector">
$('form :checkbox');               // selects elements with type="checkbox"
</javascript>

Much like the `:button` pseudo-selector, in order to get the best performance using `:checkbox`, we recommend to
first select elements with a standard jQuery selector, then to use
`.filter(":checkbox")`, or to precede the pseudo-selector with a tag name/some other selector.


#### :checked

Not to be confused with *:checkbox*, `:checked` only targets the
*checked* checkboxes *and* checked radio buttons.

<javascript caption=":checked pseudo-selector">
$('form :checked');               // selects checked checkboxes and radio buttons
</javascript>

The `:checked` pseudo-selector works when used with **checkboxes** and
**radio** buttons.

#### :disabled

By using the `:disabled` pseudo-selector, we can target all `<input>`
elements with the `disabled` attribute.

<javascript caption=":disabled pseudo-selector">
$('form :disabled');               // selects all input elements with the disabled attribute
</javascript>

Much like some other pseudo-selectors, in order to get the best performance using `:disabled`, we recommend to
first select elements with a standard jQuery selector, then to use
`.filter(":disabled")`, or to precede
the pseudo-selector with a tag name/some other selector.

#### :enabled

Basically the inverse of the *:disabled* pseudo-selector, the `:enabled`
pseudo-selector allows us to target all elements that *do not*
have a disabled attribute.

<javascript caption=":enabled pseudo-selector">
$('form :enabled');               // selects all elements that do not have the disabled attribute
</javascript>

Much like some other pseudo-selectors, in order to get the best performance using `:enabled`, we recommend to
first select elements with a standard jQuery selector, then to use
`.filter(":enabled")`, or to precede
the pseudo-selector with a tag name/some other selector.


#### :file

When using the `:file` pseudo-selector, we can target all `<input>`s
that have a `type="file"`.

<javascript caption=":file pseudo-selector">
$('form :file');               // selects all inputs with a type="file"
</javascript>

Much like some other pseudo-selectors, in order to get the best performance using `:file`, we recommend to
first select elements with a standard jQuery selector, then to use
`.filter(":file")`, or to precede
the pseudo-selector with a tag name/some other selector.

**Note:** for better performance in modern browsers, we recommend using
`[type="file"]` instead of the `:file` pseudo-selector.


#### :image

When using the `:image` pseudo-selector, we can easily target all
`<input>` tags that are the *image* type.

<javascript caption=":image pseudo-selector">
$('form :image');               // selects all input elements of type "image"
</javascript>

Much like some other pseudo-selectors, in order to get the best performance using `:image`, we recommend to
first select elements with a standard jQuery selector, then to use
`.filter(":image")`, or to precede
the pseudo-selector with a tag name/some other selector.

**Note:** for better performance in modern browsers, we recommend using
`[type="image"]` instead of the `:image` pseudo-selector.


#### :input

Using the `:input` selector selects all `<input>`, `<textarea>`, `<select>`, and
`<button>` elements.

<javascript caption=":input pseudo-selector">
$('form :input');               // selects <input>, <textarea>, <select>, and <button> elements
</javascript>


#### :password

When using the `:password` pseudo-selector, we can easily target any
`<input>`s with a type of *password*.

<javascript caption=":password pseudo-selector">
$('form :password');               // selects all <input>s "password"
</javascript>

Much like some other pseudo-selectors, in order to get the best performance using `:password`, we recommend to
first select elements with a standard jQuery selector, then to use
`.filter(":password")`, or to precede
the pseudo-selector with a tag name/some other selector.

**Note:** for better performance in modern browsers, we recommend using
`[type="password"]` instead of the `:password` pseudo-selector.


#### :radio

By using the `:radio` pseudo-selector, we can easily target any or all
`<input>`s that have a type of *radio*.

<javascript caption=":radio pseudo-selector">
$('form :radio');               // selects all <input>s of type "radio"
</javascript>

To select a set of associated radio buttons, you can use:

<javascript caption="selection associated radio buttons with :radio">
$('form input[name=gender]:radio') // selects all radio buttons with the name attribute of gender
</javascript>

Much like some other pseudo-selectors, in order to get the best performance using `:radio`, we recommend to
first select elements with a standard jQuery selector, then to use
`.filter(":radio")`, or to precede
the pseudo-selector with a tag name/some other selector.

**Note:** for better performance in modern browsers, we recommend using
`[type="radio"]` instead of the `:radio` pseudo-selector.


#### :reset



<javascript caption=":reset pseudo-selector">
$('form :reset');               // selects all elements of type "reset"
</javascript>

Much like some other pseudo-selectors, in order to get the best performance using `:reset`, we recommend to
first select elements with a standard jQuery selector, then to use
`.filter(":reset")`, or to precede
the pseudo-selector with a tag name/some other selector.

**Note:** for better performance in modern browsers, we recommend using
`[type="reset"]` instead of the `:reset` pseudo-selector.


#### :selected

<javascript caption=":selected pseudo-selector">
$('form :selected');               // selects all selected items in <option> elements
</javascript>

Much like some other pseudo-selectors, in order to get the best performance using `:selected`, we recommend to
first select elements with a standard jQuery selector, then to use
`.filter(":selected")`, or to precede
the pseudo-selector with a tag name/some other selector.


#### :submit

<javascript caption=":submit pseudo-selector">
$('form :submit');               // selects all inputs with type='submit'
</javascript>

The `:submit` selector usually applies to `<button>` or `<input>`
elements. Some browsers (such as Internet Explorer) do not automatically give the
`<button>` element a *type="submit"* by default.

**Note:** for better performance in modern browsers, we recommend using
`[type="submit"]` instead of the `:submit` pseudo-selector.


#### :text
<javascript caption=":text pseudo-selector">
$('form :text');               // selects all inputs with type='text'
</javascript>

Much like some other pseudo-selectors, in order to get the best performance using `:selected`, we recommend to
first select elements with a standard jQuery selector, then to use
`.filter(":selected")`, or to precede
the pseudo-selector with a tag name/some other selector.

**Note:** As of jQuery 1.5.2, `:text` selects `<input>` elements that
have no specified *type* attribute. So, `type="text"` is implied.
