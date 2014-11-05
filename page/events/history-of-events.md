<script>{
	"title": "History of jQuery Events",
	"level": "intermediate"
}</script>

Throughout the evolution of jQuery the means of event binding has changed for various reasons ranging from performance to semantics. As of jQuery v1.7 the `.on()` method is the accepted means of both directly binding events and creating delegated events. This article aims to explore the history of *event delegation* from jQuery v1.0 to the present and how each version leverages it.

Given the following HTML, for our example we want to log the text of the each `<li>` to console whenever it is clicked.

```
<div id="container">
	<ul id="list">
		<li>Item #1</li>
		<li>Item #2</li>
		<li>Item #3</li>
		<li>...</li>
		<li>Item #100</li>
	</ul>
</div>​
```

### [.bind()](http://api.jquery.com/bind/) (Deprecated)

Introduced in jQuery v1.0

It is possible to use `.bind()` and attach a handler to every element.

```
​$( "#list li" ).bind( "click", function( event ) {
	var elem = $( event.target );
	console.log( elem.text() );
});​​​​​​​​​​​​​​​​​​​​​
```

As discussed in the [event delegation](/event/event-delegation) article, this is not optimal.

### liveQuery
*liveQuery* was a popular jQuery plugin that allowed for the creation of events which would be triggered for elements that existed now or in the future. This plugin did not use event delegation and used expensive CPU processing to poll the DOM for changes every 20ms and fire events accordingly.


### [.bind()](http://api.jquery.com/bind/) delegation (Deprecated)

Introduced in jQuery v1.0

Generally we don't associate `.bind()` with *event delegation*, however prior to jQuery v1.3 it was the only means of delegation available to us.

```
​$( "#list" ).bind( "click", function( event ) {
	var elem = $( event.target );
	if ( elem.is( "li" ) ) {
		console.log( elem.text() );
	}
});​​​​​​​​​​​​​​​​​​​​​
```

We are able to take advantage of *event bubbling* here by attaching a *click* event to the parent `<ul>` element. Whenever the `<li>` is clicked, the event bubbles up to its parent, the `<ul>`, which executes our event handler. Our event handler checks to see if the **event.target** (the element that caused the event to fire) matches our selector.


### [.live()](http://api.jquery.com/live/) (Deprecated)

Introduced in jQuery v1.3

All `.live()` event handlers are bound to the *document* root by default.

```
​$( "#list li" ).live( "click", function( event ) {
	var elem = $( this );
	console.log( elem.text() );
});​​​​​​​​​​​​​​​​​​​​​
```

When we use `.live()` our event is bound to `$( document )`. When the `<li>` is clicked, bubbling occurs and our *click* event is fired for each of the following elements:

* `<ul>`
* `<div>`
* `<body>`
* `<html>`
* *document* root

The last element to receive the *click* event is *document*, this is where our `.live()` event is bound. `.live()` will then check to see if our selector `#list li` is the element that triggered the event, if so our event handler is executed.


### [.live()](http://api.jquery.com/live/) w/ context (Deprecated)

Introduced in jQuery v1.4

Passing the *context* as a second optional argument to the `$()` function has been supported since v1.0. However support for using this *context* with the `$.live()` method was not added until v1.4.

If we were take our previous `.live()` example and provide it the default *context*, it would look like:

```
​$( "#list li", document ).live( "click", function( event ) {
	var elem = $( this );
	console.log( elem.text() );
});​​​​​​​​​​​​​​​​​​​​​
```

Since we can override the *context* when using the `.live()` method, we can specify a *context* that is closer to the element in the DOM hierarchy

```
$( "li", "#list" ).live( "click", function( event ) {
	var elem = $( this );
	console.log( elem.text() );
});​​​​​​​​​​​​​​​​​​​​​
```

In this instance when an `<li>` is clicked the event still bubbles all the way up the *document tree* as it did before. However, our event handler is now bound to the parent `<ul>` tag, so we do not have to wait for the event to bubble all the way up to the *document* root.

### [.delegate()](http://api.jquery.com/delegate/) (Deprecated)

First introduced in jQuery v1.4.2

The `.delegate()` method provides a clear difference between the *context* of where to attach delegated event handler, and the *selector* to match when the event bubbles up to the delegated element.

```
$( "#list" ).delegate( "li", "click", function( event ) {
	var elem = $( this );
	console.log( elem.text() );
});​​​​​​​​​​​​​​​​​​​​​
```

### [.on()](http://api.jquery.com/on/)

First introduced in jQuery v1.7

The `.on()` method gives us a semantic approach for creating directly bound events as well as delegated events. It eliminates the need to use the deprecated `.bind()`, `.live()`, and `.delegate()` methods, providing a single API for creating events.

```
$( "#list" ).on( "click", "li", function( event ) {
	var elem = $( this );
	console.log( elem.text() );
});​​​​​​​​​​​​​​​​​​​​​
```

### Summary

All of these ways of *event delegation* were innovative and considered a best practice at the time of their release. Depending on what version of jQuery you have implemented use the appropriate means of *event delegation*.
