<script>{
	"title": "Inside the Event Handling Function",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

Every event handling function receives an event object, which contains many properties and methods. The event object is most commonly used to prevent the default action of the event via the `.preventDefault()` method. However, the event object contains a number of other useful properties and methods, including:

#### pageX, pageY

The mouse position at the time the event occurred, relative to the top left of the page.

#### type

The type of the event (e.g. "click").

#### which

The button or key that was pressed.

#### data

Any data that was passed in when the event was bound.

#### target

The DOM element that initiated the event.

#### preventDefault()

Prevent the default action of the event (e.g. following a link).

#### stopPropagation()

Stop the event from bubbling up to other elements.

In addition to the event object, the event handling function also has access to the DOM element that the handler was bound to via the keyword `this`. To turn the DOM element into a jQuery object that we can use jQuery methods on, we simply do `$( this )`, often following this idiom:

```
var elem = $( this );
```

```
// Preventing a link from being followed
$( "a" ).click(function( event ) {
	var elem = $( this );
	if ( elem.attr( "href" ).match( "evil" ) ) {
		event.preventDefault();
		elem.addClass( "evil" );
	}
});
```
