<script>{
	"title": "Selecting Elements",
	"level": "beginner"
}</script>

The most basic concept of jQuery is to "select some elements and do something with them." jQuery supports most CSS3 selectors, as well as some non-standard selectors. For a complete selector reference, visit the [Selectors documentation on api.jquery.com](http://api.jquery.com/category/selectors/).

## Selecting Elements by ID

```
$( "#myId" ); // Note IDs must be unique per page.
```

## Selecting Elements by Class Name

```
$( ".myClass" );
```

## Selecting Elements by Attribute

```
$( "input[name='first_name']" );
```

## Selecting Elements by Compound CSS Selector

```
$( "#contents ul.people li" );
```

## Selecting Elements with a Comma-separated List of Selectors

```
$( "div.myClass, ul.people" );
```

## Pseudo-Selectors

```
$( "a.external:first" );
$( "tr:odd" );

// Select all input-like elements in a form (more on this below).
$( "#myForm :input" );
$( "div:visible" );

// All except the first three divs.
$( "div:gt(2)" );

// All currently animated divs.
$( "div:animated" );
```

**Note:** When using the `:visible` and `:hidden` pseudo-selectors, jQuery tests the actual visibility of the element, not its CSS `visibility` or `display` properties. jQuery looks to see if the element's physical height and width on the page are both greater than zero.

However, this test doesn't work with `<tr>` elements. In the case of `<tr>` jQuery does check the CSS `display` property, and considers an element hidden if its `display` property is set to `none`.

Elements that have not been added to the DOM will always be considered hidden, even if the CSS that would affect them would render them visible. See the [Manipulating Elements](/manipulating-elements) section to learn how to create and add elements to the DOM.

## Choosing Selectors

Choosing good selectors is one way to improve JavaScript's performance. Too much specificity can be a bad thing. A selector such as `#myTable thead tr th.special` is overkill if a selector such as `#myTable th.special` will get the job done.


### Does My Selection Contain Any Elements?

Once you've made a selection, you'll often want to know whether you have anything to work with. A common mistake is to use:

```
// Doesn't work!
if ( $( "div.foo" ) ) {
	...
}
```

This won't work. When a selection is made using `$()`, an object is always returned, and objects always evaluate to `true`. Even if the selection doesn't contain any elements, the code inside the `if` statement will still run.

The best way to determine if there are any elements is to test the selection's `.length` property, which tells you how many elements were selected. If the answer is 0, the `.length` property will evaluate to `false` when used as a boolean value:

```
// Testing whether a selection contains elements.
if ( $( "div.foo" ).length ) {
	...
}
```

### Saving Selections

jQuery doesn't cache elements for you. If you've made a selection that you might need to make again, you should save the selection in a variable rather than making the selection repeatedly.

```
var divs = $( "div" );
```

Once the selection is stored in a variable, you can call jQuery methods on the variable just like you would have called them on the original selection.

A selection only fetches the elements that are on the page at the time the selection is made. If elements are added to the page later, you'll have to repeat the selection or otherwise add them to the selection stored in the variable. Stored selections don't magically update when the DOM changes.

### Refining & Filtering Selections

Sometimes the selection contains more than what you're after. jQuery offers several methods for refining and filtering selections.

```
// Refining selections.
$( "div.foo" ).has( "p" );         // div.foo elements that contain <p> tags
$( "h1" ).not( ".bar" );           // h1 elements that don't have a class of bar
$( "ul li" ).filter( ".current" ); // unordered list items with class of current
$( "ul li" ).first();              // just the first unordered list item
$( "ul li" ).eq( 5 );              // the sixth
```

### Selecting Form Elements

jQuery offers several pseudo-selectors that help find elements in forms. These are especially helpful because it can be difficult to distinguish between form elements based on their state or type using standard CSS selectors.

#### :checked

Not to be confused with *:checkbox*, `:checked` targets *checked* checkboxes, but keep in mind that this selector works also for *checked* radio buttons, and `<select>` elements (for `<select>` elements only, use the `:selected` selector):

```
$( "form :checked" );
```

The `:checked` pseudo-selector works when used with **checkboxes**, **radio buttons** and **selects**.

#### :disabled

Using the `:disabled` pseudo-selector targets any `<input>` elements with the `disabled` attribute:

```
$( "form :disabled" );
```

In order to get the best performance using `:disabled`, first select elements with a standard jQuery selector, then use `.filter( ":disabled" )`, or precede the pseudo-selector with a tag name or some other selector.

#### :enabled

Basically the inverse of the *:disabled* pseudo-selector, the `:enabled` pseudo-selector targets any elements that *do not* have a `disabled` attribute:

```
$( "form :enabled" );
```

In order to get the best performance using `:enabled`, first select elements with a standard jQuery selector, then use `.filter( ":enabled" )`, or precede the pseudo-selector with a tag name or some other selector.

#### :input

Using the `:input` selector selects all `<input>`, `<textarea>`, `<select>`, and `<button>` elements:

```
$( "form :input" );
```

#### :selected

Using the `:selected` pseudo-selector targets any selected items in `<option>` elements:

```
$( "form :selected" );
```

In order to get the best performance using `:selected`, first select elements with a standard jQuery selector, then use `.filter( ":selected" )`, or precede the pseudo-selector with a tag name or some other selector.

#### Selecting by type

jQuery provides pseudo selectors to select form-specific elements according to their type:

* [`:password`](http://api.jquery.com/password-selector/)
* [`:reset`](http://api.jquery.com/reset-selector/)
* [`:radio`](http://api.jquery.com/radio-selector/)
* [`:text`](http://api.jquery.com/text-selector/)
* [`:submit`](http://api.jquery.com/submit-selector/)
* [`:checkbox`](http://api.jquery.com/checkbox-selector/)
* [`:button`](http://api.jquery.com/button-selector/)
* [`:image`](http://api.jquery.com/image-selector/)
* [`:file`](http://api.jquery.com/file-selector/)

For all of these there are side notes about performance, so be sure to check out [the API docs](http://api.jquery.com/category/selectors/form-selectors/) for more in-depth information.
