---
title   : Iterating over jQuery and non-jQuery Objects
---

jQuery provides an object iterator utility called `$.each` as well as a jQuery collection iterator: `.each()`. These are not interchangeable. In addition, there are a couple of helpful methods called `$.map` and `.map()` that can shortcut one of our common interation use cases. Let's take a look at these.

### $.each

[`$.each`](http://api.jquery.com/jQuery.each/) is a generic iterator function for looping over object, arrays, and array-like objects. Plain objects are iterated via their named properties while arrays and array-like objects are iterated via their indices.

$.each is essentially a drop-in replacement of a traditional `for` or 'for-in' loop.

Given:

```
var sum = 0;

var arr = [ 1, 2, 3, 4, 5 ];
```

then this:
```
for ( var i = 0, l = arr.length; i < l; i++ ) {

	sum += arr[ i ];

}

console.log( sum ); // 15

```

can be replaced with this:

```
$.each( arr, function(index, value){

	sum += value;

});

console.log( sum ); // 15
```

Notice that we don't have to access `arr[ index ]` as the value is conveniently passed to the callback in `$.each`.

In addition, given:

```
var sum = 0;

var obj = {
	foo: 1,
	bar: 2
}
```

then this:

```
for (var item in obj) {

	sum += obj[ item ];

}

console.log( sum ); // 3
```

can be replaced with this:

```

$.each( obj, function(key, value){

	sum += value;

});

console.log( sum ); // 3
```

Again, we don't have to directly access `obj[ key ]` as the value is passed directly to the callback.

Note that `$.each` is for plain objects, arrays, array-like objects *that are not jQuery collections*.

This would be considered incorrect:

```
$.each( $('p'), function() {

	// Do something

});
```

Instead, for jQuery collections, we have `.each()`.

### .each()

[`.each()`](http://api.jquery.com/each/) is used directly on a jQuery collection. It iterates over each matched element in the collection and performs a callback on that object. The index of the current element within the collection is passed as an argument to the callback. The value (in this case the DOM element) is also passed, but the callback is fired within the context of the current matched element, so the `this` keyword points to the current element as we would expect in other jQuery callbacks.

Let's see some examples.

Given the following markup:

```
<ul>
	<li><a href="#">Link 1</a></li>
	<li><a href="#">Link 2</a></li>
	<li><a href="#">Link 3</a></li>
</ul>
```

we can write:

```
$('li').each( function(index, element){

	console.log( $(this).text() );

});

// Logs the following:
// Link 1
// Link 2
// Link 3
```

#### The Second Argument

The question is often raised, "If `this` is the element, why is there a second (DOM element) argument passed to the callback?"

Whether done intentionally, or in the context of our callback, our execution scope may change. If we consistently use the keyword `this`, we may end up confusing ourselves or another developer coming behind us. Even if our execution scope remains the same, it may be more readable to use the second parameter as a named parameter.

For example:

```
$('li').each( function(index, listItem) {

	this === listItem; // true

	// For example only. You probably shouldn't call $.ajax in a loop
	$.ajax({

		success: function(data) {

			// The context has changed. The 'this' keyword no longer refers to listItem.
			this !== listItem; // false

		}

	});

});
```

#### Sometimes `.each()` isn't necessary

Many jQuery methods implicitly iterate over the entire collection, applying their behavior to each matched element.

For example, this is unnecessary:

```
$('li').each( function(index, el) {

	$(el).addClass('newClass');

});
```

and this is fine:

```
$('li').addClass( 'newClass' );
```

Each `<li/>` in the document will have the class 'newClass' added.

On the other hand, some methods do not iterate over the collection. `.each()` is required when we need to get information from our element before we set a new value.

This will not work:

```
$('li').val( $(this).val() + '%' );

// .val() does not change the execution context, so this === window
```

and should be written like so:

```
$('li').each( function(i, el) {

	$(el).val( $(el).val() + '%' );

});
```

It can be confusing knowing what requires a `.each()` and what doesn't, so here's a list:

##### Methods requiring `.each()`
* [`.attr()`](http://api.jquery.com/attr/#attr1) (getter)
* [`.css()`](http://api.jquery.com/css/#css1) (getter)
* [`.data()`](http://api.jquery.com/data/#data2) (getter)
* [`.height()`](http://api.jquery.com/height/#height1) (getter)
* [`.html()`](http://api.jquery.com/html/#html1) (getter)
* [`.innerHeight()`](http://api.jquery.com/innerHeight/)
* [`.innerWidth()`](http://api.jquery.com/innerWidth/)
* [`.offset()`](http://api.jquery.com/offset/#offset1) (getter)
* [`.outerHeight()`](http://api.jquery.com/outerHeight/)
* [`.outerWidth()`](http://api.jquery.com/outerWidth/)
* [`.position()`](http://api.jquery.com/position/)
* [`.prop()`](http://api.jquery.com/prop/#prop1) (getter)
* [`.scrollLeft()`](http://api.jquery.com/scrollLeft/#scrollLeft1) (getter)
* [`.scrollTop()`](http://api.jquery.com/scrollTop/#scrollTop1) (getter)
* [`.val()`](http://api.jquery.com/val/#val1) (getter)
* [`.width()`](http://api.jquery.com/width/#width1) (getter)

Note that in most cases, the 'getter' signature returns the result from the first element in a jQuery collection while the setter acts over the entire collection of matched elements. The exception to this is `.text()` where the getter signature will return a concatenated string of text from all matched elements.

In addition to a value to set, the attribute, property, and css setters as well as the DOM insertion 'setter' methods (i.e. `.text()` and `.html()`) accept anonymous callback functions that are applied to each element in the matching set. The arguments passed to the callback are the index of the matched element within the set and the result of the 'getter' signature of the method.

For example, these are equivalent:

```
$('li').each( function(i, el) {

	$(el).val( $(el).val() + '%' );

});


$('li').val(function(index, value) {

	return value + '%';

});


```

One last thing thing to keep in mind with this implicit iteration is that the traversal methods such as `.children()` or `.parent()` will act on each matched element in a connection, returning a combined collection of all children or parent nodes.

### [`.map()`](http://api.jquery.com/map/)

There is a common iteration use case that can be better handled by using the `.map()` method. Anytime we want to create an array or concatenated string based on all matched elements in our jQuery selector, we're better served using `.map()`.

For example instead of doing this:

```
var newArr = [];

$('li').each( function() {

	newArr.push( this.id );

});
```

We can do this:

```
$('li').map( function(index, element) {

	return this.id;

}).get();
```

Notice the `.get()` chained at the end. `.map()` actually returns a jQuery-wrapped collection, even if we return strings out of the callback. We need to use the argument-less version of `.get()` in order to return a basic JavaScript array that we can work with. To concatenate into a string, we can chain the plain JS `.join()` array method after `.get()`.

### [`$.map`](http://api.jquery.com/jQuery.map/)

Like `$.each` and `.each()`, there is a `$.map` as well as `.map()`. The difference is also very similar to our each methods. `$.map` works on plain JavaScript arrays while `.map()` works on jQuery element collections. Because it is working on a plain array, `$.map` returns a plain array and `.get()` does not need to be called (and will in fact throw an error as it is not a native JavaScript method).

A word of warning: `$.map` switches the order of callback arguments. This was done in order to match the native JavaScript `.map()` method made available in ECMAScript 5.

Let's look at an example:

```
<li id="a"></li>
<li id="b"></li>
<li id="c"></li>

<script>

var arr = [{
	id: "a",
	tagName: 'li'
}, {
	id: "b",
	tagName: 'li'
}, {
	id: "c",
	tagName: 'li'
}];


$('li').map( function(index, element) {

	return element.id;

}).get(); // returns ["a", "b", "c"]

$.map( arr, function(value, index) {

	return value.id;

}); // returns ["a", "b", "c"]

</script>
```

### Conclusion

An understanding of the proper usage and best practices of `$.each`, `.each()`, `$.map`, and `.map()` can save you from writing a lot of useless or inefficient code and can also save you from a lot of headaches with hard-to-find bugs down the road.