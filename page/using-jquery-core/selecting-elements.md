---
title   : Selecting Elements
level: beginner
---

The most basic concept of jQuery is to “select some elements and do something with them.” jQuery supports most CSS3 selectors, as well as some non-standard selectors. For a complete selector reference, visit the [Selectors documentation on api.jquery.com](http://api.jquery.com/category/selectors/).

## Selecting Elements by ID

```
// Selecting elements by ID
$("#myId"); // note IDs must be unique per page
```

## Selecting Elements by Class Name

```
// Selecting elements by class name
$(".myClass");
```

## Selecting Elements by Attribute

```
// Selecting elements by attribute
$("input[name='first_name']"); // beware, this can be very slow in older browsers
```

## Selecting Elements by Compound CSS Selector

```
// Selecting elements by compound CSS selector
$("#contents ul.people li");
```

## Pseudo-selectors

```
// Pseudo-selectors
$("a.external:first");
$("tr:odd");

// select all input-like elements in a form (more on this below)
$("#myForm :input");
$("div:visible");

// all except the first three divs
$("div:gt(2)");

// all currently animated divs
$("div:animated");
```

**Note:** when using the `:visible` and `:hidden` pseudo-selectors, jQuery tests the actual visibility of the element, not its CSS visibility or display. jQuery looks to see if the element's physical height and width on the page are both greater than zero.

However, this test doesn't work with `<tr>` elements. In the case of `<tr>` jQuery does check the CSS display property, and considers an element hidden if its display property is set to none.

Elements that have not been added to the DOM will always be considered hidden, even if the CSS that would affect them would render them visible. See the [Manipulating Elements](/manipulating-elements) section to learn how to create and add elements to the DOM.

## Choosing Selectors

Choosing good selectors is one way to improve JavaScript's performance. A little specificity &#8212; for example, including an element type when selecting elements by class name &#8212; can go a long way. On the other hand, too much specificity can be a bad thing. A selector such as `#myTable thead tr th.special` is overkill if a selector such as `#myTable th.special` will get the job done.

jQuery offers many attribute-based selectors, allowing selections based on the content of arbitrary attributes using simplified regular expressions.

```
// find all <a>s whose rel attribute
// ends with "thinger"
$("a[rel$='thinger']");
```

While these can be useful in a pinch, they can also be extremely slow in older browsers. Wherever possible, make selections using IDs, class names, and tag names.

### Does My Selection Contain Any Elements?

Once you've made a selection, you'll often want to know whether you have anything to work with. A common mistake is to use:

```
// Doesn't work!
if ( $("div.foo") ) {
  ...
}
```

This won't work. When a selection is made using `$()`, an object is always returned, and objects always evaluate to true. Even if the selection doesn't contain any elements, the code inside the if statement will still run.

The best way to determine if there are any elements is to test the selection's length property, which tells you how many elements were selected. If the answer is 0, the length property will evaluate to false when used as a boolean value:

```
//Testing whether a selection contains elements
if ( $("div.foo").length ) {
  ...
}
```

### Saving Selections

jQuery doesn't cache elements for you. If you've made a selection that you might need to make again, you should save the selection in a variable rather than making the selection repeatedly.

```
var $divs = $("div");
```

In the example above, the variable name begins with a dollar sign. Unlike in other languages, there's nothing special about the dollar sign in JavaScript &#8212; it's just another character. Here, it's used to indicate that the variable contains a jQuery object. This practice is merely convention, and is not mandatory.

Once the selection is stored in a variable, you can call jQuery methods on the variable just like you would have called them on the original selection.

A selection only fetches the elements that are on the page at the time the selection is made. If elements are added to the page later, you'll have to repeat the selection or otherwise add them to the selection stored in the variable. Stored selections don't magically update when the DOM changes.

### Refining & Filtering Selections

Sometimes the selection contains more than what you're after. jQuery offers several methods for refining and filtering selections.

```
// Refining selections
$("div.foo").has("p");          // div.foo elements that contain <p> tags
$("h1").not(".bar");            // h1 elements that don't have a class of bar
$("ul li").filter(".current");  // unordered list items with class of current
$("ul li").first();             // just the first unordered list item
$("ul li").eq( 5 );               // the sixth
```

### Selecting Form Elements

jQuery offers several pseudo-selectors that help find elements in forms. These are especially helpful because it can be difficult to distinguish between form elements based on their state or type using standard CSS selectors.

#### :button

Using the `:button` pseudo-selector targets just the `<button>` elements and elements with a `type = "button"`:

```
// :button pseudo-selector
// selects <button> elements and elements with type="button"
$("form :button");
```

In order to get the best performance using `:button`, it's best to first select elements with a standard jQuery selector, then to use `.filter(":button")`. More can be seen on the [jQuery :button documentation page](http://api.jquery.com/button-selector/). Another option is to precede the pseudo-selector with a tag name or some other selector.

#### :checkbox

Using the `:checkbox` pseudo-selector targets any elements with a `type = "checkbox"`:

```
// :checkbox pseudo-selector
// selects elements with type="checkbox"
$("form :checkbox");
```

Much like the `:button` pseudo-selector, it's best to first select elements with a standard jQuery selector, then to use `.filter(":checkbox")`, or to precede the pseudo-selector with some other selector.

#### :checked

Not to be confused with *:checkbox*, `:checked` targets only the *checked* checkboxes as well as checked radio buttons.

```
// :checked pseudo-selector
// selects checked checkboxes and radio buttons
$("form :checked");
```

The `:checked` pseudo-selector works when used with **checkboxes** and **radio** buttons.

#### :disabled

Using the `:disabled` pseudo-selector targets all `<input>` elements with the `disabled` attribute:

```
// :disabled pseudo-selector
// selects all input elements with the disabled attribute
$("form :disabled");
```

In order to get the best performance using `:disabled`, first select elements with a standard jQuery selector, then use `.filter(":disabled")`, or precede the pseudo-selector with a tag name or some other selector.

#### :enabled

Basically the inverse of the *:disabled* pseudo-selector, the `:enabled` pseudo-selector targets all elements that *do not* have a disabled attribute:

```
// :enabled pseudo-selector
// selects all elements that do not have the disabled attribute
$("form :enabled");
```

In order to get the best performance using `:enabled`, first select elements with a standard jQuery selector, then use `.filter(":enabled")`, or precede the pseudo-selector with a tag name or some other selector.

#### :file

Using the `:file` pseudo-selector targets all `<input>`s that have a `type = "file"`:

```
// :file pseudo-selector
// selects all inputs with a type = "file"
$("form :file");
```

In order to get the best performance using `:file`, first select elements with a standard jQuery selector, then use `.filter(":file")`, or precede the pseudo-selector with a tag name or some other selector.

**Note:** for better performance in modern browsers, use `[type = "file"]` instead of the `:file` pseudo-selector.

#### :image

Using the `:image` pseudo-selector easily targets all `<input>` tags that are the *image* type:

```
// :image pseudo-selector
// selects all input elements of type "image"
$("form :image");
```

In order to get the best performance using `:image`, first select elements with a standard jQuery selector, then use `.filter(":image")`, or precede the pseudo-selector with a tag name or some other selector.

**Note:** for better performance in modern browsers, use `[type = "image"]` instead of the `:image` pseudo-selector.

#### :input

Using the `:input` selector selects all `<input>`, `<textarea>`, `<select>`, and `<button>` elements:

```
// :input pseudo-selector
// selects <input>, <textarea>, <select>, and <button> elements
$("form :input");
```

#### :password

Using the `:password` pseudo-selector easily targets any `<input>`s with a type of *password*:

```
// :password pseudo-selector
// selects all <input>s "password"
$("form :password");
```

In order to get the best performance using `:password`,first select elements with a standard jQuery selector, then use `.filter(":password")`, or precede the pseudo-selector with a tag name or some other selector.

**Note:** for better performance in modern browsers, use `[ type = "password" ]` instead of the `:password` pseudo-selector.

#### :radio

Using the `:radio` pseudo-selector easily targets any `<input>`s that have a type of *radio*:

```
// :radio pseudo-selector
// selects all <input>s of type "radio"
$("form :radio");
```

To select a set of associated radio buttons use:

```
// Selection associated radio buttons with :radio
// selects all radio buttons with the name attribute of gender
$("form input[name="gender"]:radio")
```

In order to get the best performance using `:radio`, first select elements with a standard jQuery selector, then use `.filter(":radio")`, or precede the pseudo-selector with a tag name or some other selector.

**Note:** for better performance in modern browsers, use `[ type = "radio" ]` instead of the `:radio` pseudo-selector.

#### :reset

```
// :reset pseudo-selector
// selects all elements of type "reset"
$("form :reset");
```

In order to get the best performance using `:reset`, first select elements with a standard jQuery selector, then use `.filter(":reset")`, or precede the pseudo-selector with a tag name or some other selector.

**Note:** for better performance in modern browsers, use `[ type = "reset" ]` instead of the `:reset` pseudo-selector.

#### :selected

```
// :selected pseudo-selector
// selects all selected items in <option> elements
$("form :selected");
```

In order to get the best performance using `:selected`, first select elements with a standard jQuery selector, then use `.filter(":selected")`, or precede the pseudo-selector with a tag name or some other selector.

#### :submit

```
// :submit pseudo-selector
// selects all inputs with type = "submit"
$("form :submit");
```

The `:submit` selector usually applies to `<button>` or `<input>` elements. Some browsers (such as Internet Explorer) do not automatically give the `<button>` element a *type = "submit"* by default.

**Note:** for better performance in modern browsers, use `[ type = "submit" ]` instead of the `:submit` pseudo-selector.

#### :text
```
// :text pseudo-selector
// selects all inputs with type = "text"
$("form :text");
```

In order to get the best performance using `:selected`, first select elements with a standard jQuery selector, then use `.filter(":selected")`, or precede the pseudo-selector with a tag name or some other selector.

**Note:** As of jQuery 1.5.2, `:text` selects `<input>` elements that have no specified *type* attribute. So, `type = "text"` is implied.
