---
title   : Manipulating Elements
level: beginner
source: http://jqfundamentals.com/legacy
attribution: 
  - jQuery Fundamentals
---
Once you've made a selection, the fun begins. You can change, move, remove, and clone elements. 
You can also create new elements via a simple syntax.

For complete documentation of jQuery manipulation methods, visit the
[Manipulation documentation on api.jquery.com](http://api.jquery.com/category/manipulation/).

### Getting and Setting Information about Elements

There are any number of ways you can change an existing element.  Among the
most common tasks you'll perform is changing the inner HTML or attribute of an
element.  jQuery offers simple, cross-browser methods for these sorts of
manipulations.  You can also get information about elements using many of the
same methods in their getter incarnations.  We'll see examples of these
throughout this section, but specifically, here are a few methods you can use
to get and set information about elements.

<div class="note">
Changing things about elements is trivial, but remember that the change will affect all elements in the selection. 
If you just want to change one element, be sure to specify that in the selection before calling a setter method.
</div>

<div class="note">
When methods act as getters, they generally only work on the first element in the selection. 
They do not return a jQuery object, so you can't chain additional methods to them. 
One notable exception is `$.fn.text`; as mentioned below, it gets the text for all elements in the selection.
</div>

#### $.fn.html
Get or set the html contents.

#### $.fn.text
Get or set the text contents; HTML will be stripped.

#### $.fn.attr
Get or set the value of the provided attribute.

#### $.fn.width
Get or set the width in pixels of the first element in the selection as an integer.

#### .fn.height
Get or set the height in pixels of the first element in the selection as an integer.

#### fn.position
Get an object with position information for the first element in the selection, relative to its first positioned ancestor. _This is a getter only_.

#### $.fn.val
Get or set the value of form elements.

```
// Changing the HTML of an element
$('#myDiv p:first')
.html('New <strong>first</strong> paragraph!');
```

### Moving, Copying, and Removing Elements

There are a variety of ways to move elements around the DOM; generally, there are two approaches:

*	Place the selected element(s) relative to another element

*	Place an element relative to the selected element(s)

For example, jQuery provides `$.fn.insertAfter` and `$.fn.after`. The
`$.fn.insertAfter` method places the selected element(s) after the element that
you provide as an argument; the `$.fn.after` method places the element provided
as an argument after the selected element.  Several other methods follow this
pattern: `$.fn.insertBefore` and `$.fn.before`; `$.fn.appendTo` and
`$.fn.append`; and `$.fn.prependTo` and `$.fn.prepend`.

The method that makes the most sense for you will depend on what elements you
already have selected, and whether you will need to store a reference to the
elements you're adding to the page.  If you need to store a reference, you will
always want to take the first approach — placing the selected elements relative
to another element — as it returns the element(s) you're placing.  In this
case, `$.fn.insertAfter`, `$.fn.insertBefore`, `$.fn.appendTo`, and
`$.fn.prependTo` will be your tools of choice.

```
// Moving elements using different approaches

// make the first list item the last list item
var $li = $('#myList li:first').appendTo('#myList');

// another approach to the same problem
$('#myList').append($('#myList li:first'));

// note that there's no way to access the
// list item that we moved, as this returns
// the list itself
```

### Cloning Elements

When you use methods such as `$.fn.appendTo`, you are moving the element; sometimes you want to make a copy of the element instead. 
In this case, you'll need to use `$.fn.clone` first.

```
// Making a copy of an element

// copy the first list item to the end of the list
$('#myList li:first').clone().appendTo('#myList');
```

<div class="note">
If you need to copy related data and events, be sure to pass `true` as an argument to `$.fn.clone`.
</div>

### Removing Elements

There are two ways to remove elements from the page: `$.fn.remove` and
`$.fn.detach`.  You'll use `$.fn.remove` when you want to permanently remove
the selection from the page; while the method does return the removed
element(s), those elements will not have their associated data and events
attached to them if you return them to the page.

If you need the data and events to persist, you'll want to use `$.fn.detach`
instead.  Like `$.fn.remove`, it returns the selection, but it also maintains
the data and events associated with the selection, so you can restore the
selection to the page at a later time.

<div class="note"> The `$.fn.detach` method is extremely valuable
if you are doing heavy manipulation to an element.  In that case, it's
beneficial to `$.fn.detach` the element from the page, work on it in your code,
and then restore it to the page when you're done.  This saves you from
expensive "DOM touches" while maintaining the element's data and events.
</div>

If you want to leave the element on the page but simply want to remove its
contents, you can use `$.fn.empty` to dispose of the element's inner HTML.

### Creating New Elements

jQuery offers a trivial and elegant way to create new elements using the same `$()` method you use to make selections.

```
// Creating new elements from an HTML string
$('<p>This is a new paragraph</p>');
$('<li class="new">new list item</li>');
```

```
Creating a new element with an attribute object
$('<a/>', {
    html : 'This is a <strong>new</strong> link',
    'class' : 'new',
    href : 'foo.html'
});
```

Note that in the attributes object we included as the second argument, the
property name class is quoted, while the property names text and href are not.
Property names generally do not need to be quoted unless they are reserved
words (as class is in this case).

When you create a new element, it is not immediately added to the page. 
There are several ways to add an element to the page once it's been created.

```
// Getting a new element on to the page
var $myNewElement = $('&lt;p>New element&lt;/p>');
$myNewElement.appendTo('#content');

$myNewElement.insertAfter('ul:last'); // this will remove the p from #content!
$('ul').last().after($myNewElement.clone());  // clone the p so now we have 2
```

Strictly speaking, you don't have to store the created element in a variable —
you could just call the method to add the element to the page directly after
the `$()`.  However, most of the time you will want a reference to the element
you added, so you don't need to select it later.

You can even create an element as you're adding it to the page, but note that
in this case you don't get a reference to the newly created element.

```
// Creating and adding an element to the page at the same time
$('ul').append('<li>list item</li>');
```

<div class="note"> The syntax for adding new elements to the page
is so easy, it's tempting to forget that there's a huge performance cost for
adding to the DOM repeatedly. If you are adding many elements to the same
container, you'll want to concatenate all the html into a single string, and
then append that string to the container instead of appending the elements one
at a time. You can use an array to gather all the pieces together, then join
them into a single string for appending.
</div>

```
var myItems = [], $myList = $('#myList');

for (var i=0; i&lt;100; i++) {
  myItems.push('&lt;li>item ' + i + '&lt;/li>');
}

$myList.append(myItems.join(''));
```

### Manipulating Attributes

jQuery's attribute manipulation capabilities are extensive.  Basic changes are
simple, but the `$.fn.attr` method also allows for more complex manipulations.
It can either set an explicit value, or set a value using the return value of a
function.  When the function syntax is used, the function receives two
arguments: the zero-based index of the element whose attribute is being
changed, and the current value of the attribute being changed.

```
// Manipulating a single attribute
$('#myDiv a:first').attr('href', 'newDestination.html');
```

```
// Manipulating multiple attributes
$('#myDiv a:first').attr({
  href : 'newDestination.html',
  rel : 'super-special'
});
```

```
// Using a function to determine an attribute's new value
$('#myDiv a:first').attr({
    rel : 'super-special',
    href : function(idx, href) {
        return '/new/' + href;
    }
});
$('#myDiv a:first').attr('href', function(idx, href) {
    return '/new/' + href;
});
```
