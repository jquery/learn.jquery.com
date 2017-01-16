<script>{
	"title": "The jQuery Object",
	"level": "beginner"
}</script>

When creating new elements (or selecting existing ones), jQuery returns the elements in a collection. Many developers new to jQuery assume that this collection is an array. It has a zero-indexed sequence of DOM elements, some familiar array functions, and a `.length` property, after all. Actually, the jQuery object is more complicated than that.

## DOM and DOM Elements

The Document Object Model (DOM for short) is a representation of an HTML document. It may contain any number of DOM elements. At a high level, a DOM element can be thought of as a "piece" of a web page. It may contain text and/or other DOM elements. DOM elements are described by a type, such as `<div>`, `<a>`, or `<p>`, and any number of attributes such as `src`, `href`, `class` and so on. For a more thorough description, refer to [the official DOM specification from the W3C](http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-745549614).

Elements have properties like any JavaScript object. Among these properties are attributes like `.tagName` and methods like `.appendChild()`. These properties are the only way to interact with the web page via JavaScript.

## The jQuery Object

It turns out that working directly with DOM elements can be awkward. The jQuery object defines [many](http://api.jquery.com/) methods to smooth out the experience for developers. Some benefits of the jQuery Object include:

*Compatibility* – The implementation of element methods varies across browser vendors and versions. The following snippet attempts to set the inner HTML of a `<tr>` element stored in `target`:

```
var target = document.getElementById( "target" );

target.innerHTML = "<td>Hello <b>World</b>!</td>";
```

This works in many cases, but it will fail in most versions of Internet Explorer. In that case, the [recommended approach](http://www.quirksmode.org/dom/w3c_html.html) is to use pure DOM methods instead. By wrapping the `target` element in a jQuery object, these edge cases are taken care of, and the expected result is achieved in all supported browsers:

```
// Setting the inner HTML with jQuery.

var target = document.getElementById( "target" );

$( target ).html( "<td>Hello <b>World</b>!</td>" );
```

*Convenience* – There are also a lot of common DOM manipulation use cases that are awkward to accomplish with pure DOM methods. For instance, inserting an element stored in `newElement` after the `target` element requires a rather verbose DOM method:

```
// Inserting a new element after another with the native DOM API.

var target = document.getElementById( "target" );

var newElement = document.createElement( "div" );

target.parentNode.insertBefore( newElement, target.nextSibling );
```

By wrapping the `target` element in a jQuery object, the same task becomes much simpler:

```
// Inserting a new element after another with jQuery.

var target = document.getElementById( "target" );

var newElement = document.createElement( "div" );

$( target ).after( newElement );
```

For the most part, these details are simply "gotchas" standing between you and your goals.

### Getting Elements Into the jQuery Object

When the jQuery function is invoked with a CSS selector, it will return a jQuery object wrapping any element(s) that match this selector. For instance, writing:

```
// Selecting all <h1> tags.

var headings = $( "h1" );
```

`headings` is now a jQuery element containing *all* the `<h1>` tags already on the page. This can be verified by inspecting the `.length` property of `headings`:

```
// Viewing the number of <h1> tags on the page.

var headings = $( "h1" );

alert( headings.length );
```

If the page has more than one `<h1>` tag, this number will be greater than one. If the page has no `<h1>` tags, the `.length` property will be zero. Checking the `.length` property is a common way to ensure that the selector successfully matched one or more elements.

If the goal is to select only the first heading element, another step is required. There are a number of ways to accomplish this, but the most straight-forward is the `.eq()` function.

```
// Selecting only the first <h1> element on the page (in a jQuery object)

var headings = $( "h1" );

var firstHeading = headings.eq( 0 );
```

Now `firstHeading` is a jQuery object containing only the first `<h1>` element on the page. And because `firstHeading` is a jQuery object, it has useful methods like `.html()` and `.after()`. jQuery also has a method named `.get()` which provides a related function. Instead of returning a jQuery-wrapped DOM element, it returns the DOM element itself.

```
// Selecting only the first <h1> element on the page.

var firstHeadingElem = $( "h1" ).get( 0 );
```

Alternatively, because the jQuery object is "array-like," it supports array subscripting via brackets:

```
// Selecting only the first <h1> element on the page (alternate approach).

var firstHeadingElem = $( "h1" )[ 0 ];
```

In either case, `firstHeadingElem` contains the native DOM element. This means it has DOM properties like `.innerHTML` and methods like `.appendChild()`, but *not* jQuery methods like `.html()` or `.after()`. The `firstHeadingElem` element is more difficult to work with, but there are certain instances that require it. One such instance is making comparisons.

### Not All jQuery Objects are Created `===`

An important detail regarding this "wrapping" behavior is that each wrapped object is unique. This is true *even if the object was created with the same selector or contain references to the exact same DOM elements*.

```
// Creating two jQuery objects for the same element.

var logo1 = $( "#logo" );
var logo2 = $( "#logo" );
```

Although `logo1` and `logo2` are created in the same way (and wrap the same DOM element), they are not the same object. For example:

```
// Comparing jQuery objects.

alert( $( "#logo" ) === $( "#logo" ) ); // alerts "false"
```

However, both objects contain the same DOM element. The `.get()` method is useful for testing if two jQuery objects have the same DOM element.

```
// Comparing DOM elements.

var logo1 = $( "#logo" );
var logo1Elem = logo1.get( 0 );

var logo2 = $( "#logo" );
var logo2Elem = logo2.get( 0 );

alert( logo1Elem === logo2Elem ); // alerts "true"
```

Many developers prefix a `$` to the name of variables that contain jQuery objects in order to help differentiate. There is nothing magic about this practice – it just helps some people keep track of what different variables contain. The previous example could be re-written to follow this convention:

```
// Comparing DOM elements (with more readable variable names).

var $logo1 = $( "#logo" );
var logo1 = $logo1.get( 0 );

var $logo2 = $( "#logo" );
var logo2 = $logo2.get( 0 );

alert( logo1 === logo2 ); // alerts "true"
```

This code functions identically to the example above, but it is a little more clear to read.

Regardless of the naming convention used, it is very important to make the distinction between jQuery object and native DOM elements. Native DOM methods and properties are not present on the jQuery object, and vice versa. Error messages like "event.target.closest is not a function"' and "TypeError: Object [object Object] has no method 'setAttribute'" indicate the presence of this common mistake.

### jQuery Objects Are Not "Live"

Given a jQuery object with all the paragraph elements on the page:

```
// Selecting all <p> elements on the page.

var allParagraphs = $( "p" );
```

…one might expect that the contents will grow and shrink over time as `<p>` elements are added and removed from the document. jQuery objects do **not** behave in this manner. The set of elements contained within a jQuery object will not change unless explicitly modified. This means that the collection is not "live" – it does not automatically update as the document changes. If the document may have changed since the creation of the jQuery object, the collection should be updated by creating a new one. It can be as easy as re-running the same selector:

```
// Updating the selection.

allParagraphs = $( "p" );
```

### Wrapping Up

Although DOM elements provide all the functionality one needs to create interactive web pages, they can be a hassle to work with. The jQuery object wraps these elements to smooth out this experience and make common tasks easy. When creating or selecting elements with jQuery, the result will always be wrapped in a new jQuery object. If the situation calls for the native DOM elements, they may be accessed through the `.get()` method and/or array-style subscripting.
