<script>{
	"title": "jQuery Event Basics",
	"level": "beginner",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

## jQuery Event Basics

### Setting Up Event Responses on DOM Elements

jQuery makes it straightforward to set up event-driven responses on page elements. These events are often triggered by the end user's interaction with the page, such as when text is entered into a form element or the mouse pointer is moved. In some cases, such as the page load and unload events, the browser itself will trigger the event.

jQuery offers convenience methods for most native browser events. These methods — including `.click()`, `.focus()`, `.blur()`, `.change()`, etc. — are shorthand for jQuery's `.on()` method. The on method is useful for binding the same handler function to multiple events, when you want to provide data to the event handler, when you are working with custom events, or when you want to pass an object of multiple events and handlers.

```
// Event setup using a convenience method
$( "p" ).click(function() {
	console.log( "You clicked a paragraph!" );
});
```

```
// Equivalent event setup using the `.on()` method
$( "p" ).on( "click", function() {
	console.log( "click" );
});
```

### Extending Events to New Page Elements

It is important to note that `.on()` can only create event listeners on elements that exist *at the time you set up the listeners*. Similar elements created after the event listeners are established will not automatically pick up event behaviors you've set up previously. For example:

```
$( document ).ready(function(){

	// Sets up click behavior on all button elements with the alert class
	// that exist in the DOM when the instruction was executed
	$( "button.alert" ).on( "click", function() {
		console.log( "A button with the alert class was clicked!" );
	});

	// Now create a new button element with the alert class. This button
	// was created after the click listeners were applied above, so it
	// will not have the same click behavior as its peers
	$( "<button class='alert'>Alert!</button>" ).appendTo( document.body );
});
```

Consult the article on event delegation to see how to use `.on()` so that event behaviors will be extended to new elements without having to rebind them.

### Inside the Event Handler Function

Every event handling function receives an event object, which contains many properties and methods. The event object is most commonly used to prevent the default action of the event via the `.preventDefault()` method. However, the event object contains a number of other useful properties and methods, including:

#### pageX, pageY

The mouse position at the time the event occurred, relative to the top left corner of the page display area (not the entire browser window).

#### type

The type of the event (e.g., "click").

#### which

The button or key that was pressed.

#### data

Any data that was passed in when the event was bound. For example:

```
// Event setup using the `.on()` method with data
$( "input" ).on(
	"change",
	{ foo: "bar" }, // Associate data with event binding
	function( eventObject ) {
		console.log("An input value has changed! ", eventObject.data.foo);
	}
);
```

#### target

The DOM element that initiated the event.

#### namespace

The namespace specified when the event was triggered.

#### timeStamp

The difference in milliseconds between the time the event occurred in the browser and January 1, 1970.

#### preventDefault()

Prevent the default action of the event (e.g. following a link).

#### stopPropagation()

Stop the event from bubbling up to other elements.

In addition to the event object, the event handling function also has access to the DOM element that the handler was bound to via the keyword `this`. To turn the DOM element into a jQuery object that we can use jQuery methods on, we simply do `$( this )`, often following this idiom:

```
var element = $( this );
```

A fuller example would be:

```
// Preventing a link from being followed
$( "a" ).click(function( eventObject ) {
	var elem = $( this );
	if ( elem.attr( "href" ).match( /evil/ ) ) {
		eventObject.preventDefault();
		elem.addClass( "evil" );
	}
});
```

### Setting Up Multiple Event Responses

Quite often elements in your application will be bound to multiple events. If multiple events are to share the same handling function, you can provide the event types as a space-separated list to `.on()`:

```
// Multiple events, same handler
$( "input" ).on(
	"click change", // Bind handlers for multiple events
	function() {
		console.log( "An input was clicked or changed!" );
	}
);
```

When each event has its own handler, you can pass an object into `.on()` with one or more key/value pairs, with the key being the event name and the value being the function to handle the event.

```
// Binding multiple events with different handlers
$( "p" ).on({
	"click": function() { console.log( "clicked!" ); },
	"mouseover": function() { console.log( "hovered!" ); }
});
```

### Namespacing Events

For complex applications and for plugins you share with others, it can be useful to namespace your events so you don't unintentionally disconnect events that you didn't or couldn't know about.

```
// Namespacing events
$( "p" ).on( "click.myNamespace", function() { /* ... */ } );
$( "p" ).off( "click.myNamespace" );
$( "p" ).off( ".myNamespace" ); // Unbind all events in the namespace
```

### Tearing Down Event Listeners

To remove an event listener, you use the `.off()` method and pass in the event type to off. If you attached a named function to the event, then you can isolate the event tear down to just that named function by passing it as the second argument.

```
// Tearing down all click handlers on a selection
$( "p" ).off( "click" );
```

```
// Tearing down a particular click handler, using a reference to the function
var foo = function() { console.log( "foo" ); };
var bar = function() { console.log( "bar" ); };

$( "p" ).on( "click", foo ).on( "click", bar );
$( "p" ).off( "click", bar ); // foo is still bound to the click event
```

### Setting Up Events to Run Only Once

Sometimes you need a particular handler to run only once — after that, you may want no handler to run, or you may want a different handler to run. jQuery provides the `.one()` method for this purpose.

```
// Switching handlers using the `.one()` method
$( "p" ).one( "click", firstClick );

function firstClick() {
	console.log( "You just clicked this for the first time!" );

	// Now set up the new handler for subsequent clicks;
	// omit this step if no further click responses are needed
	$( this ).click( function() { console.log( "You have clicked this before!" ); } );
}
```

Note that in the code snippet above, the `firstClick` function will be executed for the first click on *each* paragraph element rather than the function being removed from *all* paragraphs when *any* paragraph is clicked for the first time.

`.one()` can also be used to bind multiple events:

```
// Using .one() to bind several events
$( "input[id]" ).one( "focus mouseover keydown", firstEvent);

function firstEvent( eventObject ) {
	console.log( "A " + eventObject.type + " event occurred for the first time on the input with id " + this.id );
}
```

In this case, the `firstEvent` function will be executed once *for each event*. For the snippet above, this means that once an input element gains focus, the handler function will still execute for the first keydown event on that element.
