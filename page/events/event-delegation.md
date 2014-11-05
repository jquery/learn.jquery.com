<script>{
	"title": "Understanding Event Delegation",
	"level": "intermediate",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

## Introduction

Event delegation allows us to attach a single event listener, to a parent element, that will fire for all descendants matching a selector, whether those descendants exist now or are added in the future.

## Example

For the remainder of the lesson, we will reference the following HTML structure:
```
<html>
<body>
<div id="container">
	<ul id="list">
		<li><a href="http://domain1.com">Item #1</a></li>
		<li><a href="/local/path/1">Item #2</a></li>
		<li><a href="/local/path/2">Item #3</a></li>
		<li><a href="http://domain4.com">Item #4</a></li>
	</ul>
</div>
</body>
</html>
```

When an anchor in our `#list` group is clicked, we want to log its text to the console. Normally we could directly bind to the click event of each anchor using the `.on()` method:

```
// Attach a directly bound event handler
$( "#list a" ).on( "click", function( event ) {
	event.preventDefault();
	console.log( $( this ).text() );
});
```

While this works perfectly fine, there are drawbacks. Consider what happens when we add a new anchor after having already bound the above listener:

```
// Add a new element on to our existing list
$( "#list" ).append( "<li><a href='http://newdomain.com'>Item #5</a></li>" );
```

If we were to click our newly added item, nothing would happen. This is because of the directly bound event handler that we attached previously. Direct events are only attached to elements at the time the `.on()` method is called. In this case, since our new anchor did not exist when `.on()` was called, it does not get the event handler.

## Event Propagation

Understanding how events propagate is an important factor in being able to leverage Event Delegation. Any time one of our anchor tags is clicked, a *click* event is fired for that anchor, and then bubbles up the DOM tree, triggering each of its parent click event handlers:

* `<a>`
* `<li>`
* `<ul #list>`
* `<div #container>`
* `<body>`
* `<html>`
* *document* root

This means that anytime you click one of our bound anchor tags, you are effectively clicking the entire document body! This is called *event bubbling* or *event propagation*.

Since we know how events bubble, we can create a *delegated* event:

```
// Attach a delegated event handler
$( "#list" ).on( "click", "a", function( event ) {
	event.preventDefault();
	console.log( $( this ).text() );
});
```

Notice how we have moved the `a` part from the selector to the second parameter position of the `.on()` method. This second, selector parameter tells the handler to listen for the specified event, and when it hears it, check to see if the triggering element for that event matches the second parameter. In this case, the triggering event is our anchor tag, which matches that parameter. Since it matches, our anonymous function will execute. We have now attached a single *click* event listener to our `<ul>` that will listen for clicks on its descendant anchors, instead of attaching an unknown number of directly bound events to the existing anchor tags only.

### Using the Triggering Element

What if we wanted to open the link in a new window if that link is an external one (as denoted here by beginning with "http")?

```
// Attach a delegated event handler
$( "#list" ).on( "click", "a", function( event ) {
	var elem = $( this );
	if ( elem.is( "[href^='http']" ) ) {
		elem.attr( "target", "_blank" );
	}
});
```

This simply passes the `.is()` method a selector to see if the `href` attribute of the element starts with "http". We have also removed the `event.preventDefault();` statement as we want the default action to happen (which is to follow the `href`).

We can actually simplify our code by allowing the selector parameter of `.on()` do our logic for us:

```
// Attach a delegated event handler with a more refined selector
$( "#list" ).on( "click", "a[href^='http']", function( event ) {
	$( this ).attr( "target", "_blank" );
});
```

## Summary

Event delegation refers to the process of using event propagation (bubbling) to handle events at a higher level in the DOM than the element on which the event originated. It allows us to attach a single event listener for elements that exist now or in the future.
