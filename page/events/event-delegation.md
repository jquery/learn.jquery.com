---
title   : Understanding Event Delegation
level: intermediate
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

Say you have to add new line items to your page, given the following HTML:
```
<html>
<body>
<div id="container">
	<ul id="list">
		<li><a href="#">Item #1</a></li>
		<li><a href="http://somedomain.com">Item #2</a></li>
		<li><a href="#">Item #3</a></li>
		<li>...</li>
		<li><a href="http://someotherdomain.com">Item #100</a></li>
	</ul>
</div>
</body>
</html>
```

We need to attach the same event handler to multiple elements. In this example we want to attach an event that will log the text of the anchor tag to the console whenever it is clicked.

We can attach a direct bind click event to each `<li>` using the `.on()` method, that will alert the text inside of it by doing the following:
```
// attach a directly bound event
$( "#list a" ).on( "click", function( event ) {
	event.preventDefault();
	console.log( $( this ).text() );
});
```

While this works perfectly fine, there are drawbacks. Consider this:
```
// add a new element on to our existing list
$( "#list" ).append( "<li><a href=\"http://newsite.com\">Item #101</a></li>" );
```
If we were to click our newly added item, nothing would happen. This is because of the directly bound event that we attached previously. Direct events are only attached to elements at the time we called the `.on()` method for our existing collection of `<a>`'s, that is only the `<a>`'s that were found when we call `$()`.

## Event Propagation
Understanding how events propagate is an important factor in being able to leverage Event Delegation. Any time an anchor tags is clicked, a *click* event is fired for the:

* `<a>`
* `<li>`
* `<ul>`
* `<div>`
* `<body>`
* `<html>`
* *document* root

Anytime one of these links is clicked you can think of it as if you were clicking the entire document body. This is called *event bubbling* or *event propagation*.

Since we know how events bubble we can created a delegated event that listens for a specific event to happen on our element
```
// attach a delegated event
$( "#list" ).on( "click", "a", function( event ) {
	event.preventDefault();
	console.log( $( this ).text() );
});
```
Notice for the second parameter to the `.on()` method we are telling it which selector to listen for. Now when a *click* event is triggered on our `<ul>`, our delegated event will check to see if the triggering element matches our selector (`"a"`). If it does, our anonymous function will execute. We have now attached a single *click* event listener to our `<ul>` instead of an unknown number of directly bound events on our `<a>`'s.

Now lets say that whenever a link is clicked we want to check and see if the `href` attribute starts with "http" and if it does we want to set the `target` attribute to `_blank`.
```
// attach a delegated event
$( "#list" ).on( "click", "a", function( event ) {
	var $elem = $( this );
	if ( $elem.is( "[href^=http]" ) ) {
		$elem.attr( "target", "_blank" );
	}
});
```
This simply passes the `.is()` method a selector to see if the element's `href` attributes starts with "http". Also we have removed the `event.preventDefault();` statement, this is because we want the default action to happen (which is to following the `href`)

We can actually take this a step further and make our code simpler and more concise by allowing the selector argument to `.on()` do our logic for us.
```
// attach a delegated event with a more refined selector
$( "#list" ).on( "click", "a[href^=http]", function( event ) {
	$( this ).attr( "target", "_blank" );
});
```

##Summary
Event delegation refers to the process of using event bubbling to handle events at a higher level in the DOM than the element on which the event originated. It allows us to attach a single event listener for elements that exist now or in the future.
