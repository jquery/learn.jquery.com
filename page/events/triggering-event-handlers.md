<script>{
	"title": "Triggering Event Handlers",
	"level": "intermediate",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

jQuery provides a way to trigger the event handlers bound to an element without any user interaction via the `.trigger()` method.

## What handlers can be .trigger()'d?

jQuery's event handling system is a layer on top of native browser events. When an event handler is added using `.on( "click", function() {...} )`, it can be triggered using jQuery's `.trigger( "click" )` because jQuery stores a reference to that handler when it is originally added. Additionally, it will trigger the JavaScript inside the `onclick` attribute. The `.trigger()` function cannot be used to mimic native browser events, such as clicking on a file input box or an anchor tag. This is because, there is no event handler attached using jQuery's event system that corresponds to these events.

```
<a href="http://learn.jquery.com">Learn jQuery</a>
```

```
// This will not change the current page
$( "a" ).trigger( "click" );
```

## How can I mimic a native browser event, if not `.trigger()`?

In order to trigger a native browser event, you have to use [document.createEventObject](http://msdn.microsoft.com/en-us/library/ie/ms536390%28v=vs.85%29.aspx) for < IE9 and  [document.createEvent](https://developer.mozilla.org/en/DOM/document.createEvent) for all other browsers. Using these two APIs, you can programmatically create an event that behaves exactly as if someone has actually clicked on a file input box. The default action will happen, and the browse file dialog will display.

The jQuery UI Team created [jquery.simulate.js](https://github.com/jquery/jquery-simulate/) in order to simplify triggering a native browser event for use in their automated testing. Its usage is modeled after jQuery's trigger.

```
// Triggering a native browser event using the simulate plugin
$( "a" ).simulate( "click" );
```

This will not only trigger the jQuery event handlers, but also follow the link and change the current page.


## `.trigger()` vs `.triggerHandler()`

There are four differences between `.trigger()` and `.triggerHandler()`

1. `.triggerHandler()` only triggers the event on the first element of a jQuery object.
2. `.triggerHandler()` cannot be chained. It returns the value that is returned by the last handler, not a jQuery object.
3. `.triggerHandler()` will not cause the default behavior of the event (such as a form submission).
4. Events triggered by `.triggerHandler()`, will not bubble up the DOM hierarchy. Only the handlers on the single element will fire.

For more information see the [triggerHandler documentation](http://api.jquery.com/triggerHandler)

## Don't use `.trigger()` simply to execute specific functions

While this method has its uses, it should not be used simply to call a function that was bound as a click handler. Instead, you should store the function you want to call in a variable, and pass the variable name when you do your binding. Then, you can call the function itself whenever you want, without the need for `.trigger()`.

```
// Triggering an event handler the right way
var foo = function( event ) {
	if ( event ) {
		console.log( event );
	} else {
		console.log( "this didn't come from an event!" );
	}
};

$( "p" ).on( "click", foo );

foo(); // instead of $( "p" ).trigger( "click" )
```

A more complex architecture can be built on top of trigger using the [publish-subscribe pattern](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) using [jQuery plugins](https://gist.github.com/661855). With this technique, `.trigger()` can be used to notify other sections of code that an application specific event has happened.
