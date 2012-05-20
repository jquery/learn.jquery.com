---
level      : beginner
title      : The jQuery Object
attribution: Mike Pennisi
github     : jugglinmike
---
Presumably, if you're reading this, you are curious about the thing that jQuery returns when you create new elements (or select existing ones).
This curiosity is a great first step, because at first glance, the jQuery object may seem to be an array of DOM elements.
It has a collection of DOM elements, some familiar array functions, and a `length` property, after all.
Actually, the jQuery object is more complicated than that.

### What is a DOM element? What is the DOM, for that matter?

The DOM (short for Document Object Model) is a representation of an HTML document.
It may contain any number of DOM elements.
At a high level, you can think a DOM element as a "piece" of a web page. It can contain text and/or other DOM elements.
It is described by a type (i.e. "div", "a", "p", etc.) and any number of attributes (i.e. "src", "href", "class", etc.).
For a more thorough description, please refer to [the official specification from the W3C](http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-745549614).

Elements have properties like any JavaScript object.
Among these properties are attributes like `tagName` and methods like `appendChild`.
These properties are the only way to interact with the web page via JavaScript.

### So why not just put the elements in an array?

It turns out that working directly with DOM elements can be quite awkward.
The jQuery object defines [a ton](http://api.jquery.com/) of methods to smooth out the experience for developers.
For example:

*Compatability*
The implementation of element methods varies across browser vendors and versions.
Imagine that you wanted to set the inner HTML of a `tr` element stored in `target`. You might write:

<javascript caption="Setting the inner HTML with the native DOM API">
var target = document.getElementById("target");
target.innerHTML = "<td>Hello <b>World</b>!</td>";
</javascript>

This works in most cases, but it will fail in most versions of Internet Explorer.
In that case, the [recommended approach](http://www.quirksmode.org/dom/w3c_html.html) is to use pure DOM methods instead.
By wrapping the `target` element in a jQuery object, these edge cases are taken care of, and the expected result is acheived in all supported browsers:

<javascript caption="Setting the inner HTML with jQuery">
var target = document.getElementById("target");
$( target ).html( "<td>Hello <b>World</b>!</td>");
</javascript>

*Convenience*
There are also a lot of common DOM manipulation use cases that are awkward to accomplish with pure DOM methods.
For instance, if you want to insert the element stored in `newElement` after the element stored in `target`, you have to write:

<javascript caption="Inserting a new element after another with the native DOM API">
var target = document.getElementById("target");
var newElement = document.createElement("div");
target.parentNode.insertBefore( target.nextSibling, newElement )
</javascript>

By wrapping the `target` element in a jQuery object, you can accomplish the same task in a much simpler manner:

<javascript caption="Inserting a new element after another with jQuery">
var target = document.getElementById("target");
var newElement = document.createElement("div");
$( target ).after( newElement );
</javascript>

If you're in the business of getting things done (and I suspect that you are), then these details are simply "gotchas" that stand between you and your goals.

### Sounds good. Now how do I get stuff in there?

If you pass a CSS selector to the jQuery function, the result will be a jQuery object wrapping any element(s) that match this selector.
For instance, by writing

<javascript caption="Selecting all 'h1' tags">
var allHeaders = $("h1");
</javascript>

`headers` is now a jQuery element containing *all* the `<h1>` tags already on the page.
You can convince yourself by checking the `length` property of `headers`:

<javascript caption="Viewing the number of 'h1' tags on the page">
var allHeaders = $("h1");
alert( allHeaders.length );
</javascript>

If the page has more than one `<h1>` tag, this number will be greater than one.
Likewise, if the page has no `<h1>` tags, the `length` property will be zero.
Checking the `length` property is a common way to ensure that the selector described something on the page.

To make sure we only have the first header element, we have to take one more step.
There are a number of ways to accomplish this, the most straight-forward may be the `eq()` function.

<javascript caption="Selecting only the first 'h1' element on the page (in a jQuery object)">
var headers = $("h1");
var firstHeader = headers.eq(0);
</javascript>

Now we can be assured that `firstHeader` is a jQuery object containing only the first `<h1>` element on the page.
And because `firstHeader` is a jQuery object, you can use methods like `html()` or `after()`.
jQuery also has a method named `get()` which provides a related function.
Instead of returning a jQuery-wrapped DOM element, it returns the DOM element itself.

<javascript caption="Selecting only the first 'h1' element on the page">
var firstHeaderElem = $("h1").get(0);
</javascript>

You can also treat the jQuery object like a true JavaScript array and use brackets to retrieve the DOM element you want, like so:

<javascript caption="Selecting only the first 'h1' element on the page (alternate approach)">
var firstHeaderElem = $("h1")[0];
</javascript>

In either case, `firstHeaderElem` contains the "native" DOM element.
This means it has DOM properties like `innerHTML` and methods like `appendChild()`, but *not* jQuery methods like `html()` or `after()`.
As discussed earlier, the element is more difficult to work with, but there are certain instances where you will need it.
One such instance is making comparisons.

### Not all jQuery objects are created `===`

An important detail regarding this "wrapping" behavior is that each wrapped object is unique.
This is true *even if the object was created with the same selector or contain references to the exact same DOM elements*.

<javascript caption="Creating two jQuery objects for the same element">
var logo1 = $("#logo");
var logo2 = $("#logo");
</javascript>

Although `logo1` and `logo2` are created in the same way (and wrap the same DOM element), they are not the same object.
For example:

<javascript caption="Comparing jQuery object">
alert( $("#logo") === $("#logo") ); // alerts 'false'
</javascript>

However, both objects contain the same DOM element.
The `get` method is useful for testing if two jQuery objects have the same DOM element.

<javascript caption="Comparing DOM elements">
var logo1 = $("$logo");
var logo1Elem = logo1.get(0);

var logo2 = $("#logo");
var logo2Elem = logo2.get(0);

alert( logo1Elem === logo2Elem ); // alerts 'true'
</javascript>

Many developers prefix a `$` to the name of variables that contain jQuery objects in order to help differentiate.
There is nothing magic about this practice--it just helps some people to keep track of what different variables contain.
We could re-write the previous example to follow this convention:

<javascript caption="Comparing DOM elements (with more readable variable names)">
var $logo1 = $("#logo");
var logo1 = $logo1.get(0);

var $logo2 = $("#logo");
var logo2 = $logo2.get(0);

alert( logo1 === logo2 ); // alerts 'true'
</javascript>

This code functions identically to the example above, but it is a little more clear to read.

However you choose to organize your code, it is very important to make the distinction between jQuery object and native DOM elements!
You cannot access native DOM methods and properties directly from a jQuery object, and vice versa.
**If you see error messages like, "event.target.closest is not a function"' or "TypeError: Object [object Object] has no method 'setAttribute'" you are likely making this common mistake and now have the knowledge to remedy it.**

### jQuery objects are not "live"

Given a jQuery object with all the paragraph elements on the page:

<javascript caption="Selecting all 'p' elements on the page">
var allParagraphs = $("p");
</javascript>

...you might expect that the contents will grow and shrink over time as `<p>` elements are added and removed from the document.
This is how "nodelists" returned by the `getElementsByTagName` method work, after all.

jQuery objects do **not** behave in this manner.
The set of elements contained within a jQuery object will not change unless you modify it in your code.
This means that the collection is not "live"--it does not automatically update as the document changes.
If you expect the document may have changed from when you created the jQuery object, then update your collection by creating a new one!
It can be as easy as re-running the same selector:

<javascript caption="Updating the selection">
allParagraphs = $("p");
</javascript>

### Wrapping up

Although DOM elements provide all the functionality one needs to create interactive web pages, they can be a hassle to work with.
The jQuery object wraps these elements to smooth out this experience and make common tasks easy.
When creating or selecting elements with jQuery, the result will always be wrapped in a new jQuery object.
If you do need the native DOM elements, you can always use the `get()` method and/or array-style subscripting to get at them.

These dinstinctions may not be immediately obvious, but understanding them is an important step in fully utilizing jQuery as it was intended.
