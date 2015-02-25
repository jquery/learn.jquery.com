<script>{
	"title": "Introducing Custom Events",
	"level": "intermediate",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

## Custom Events

We're all familiar with the basic events — click, mouseover, focus, blur, submit, etc. — that we can latch on to as a user interacts with the browser. Custom events open up a whole new world of event-driven programming.

It can be difficult at first to understand why you'd want to use custom events, when the built-in events seem to suit your needs just fine. It turns out that custom events offer a whole new way of thinking about event-driven JavaScript. Instead of focusing on the element that triggers an action, custom events put the spotlight on the element being acted upon. This brings a bevy of benefits, including:

* Behaviors of the target element can easily be triggered by different elements using the same code.
* Behaviors can be triggered across multiple, similar, target elements at once.
* Behaviors are more clearly associated with the target element in code, making code easier to read and maintain.

Why should you care? An example is probably the best way to explain. Suppose you have a lightbulb in a room in a house. The lightbulb is currently turned on, and it's controlled by two three-way switches and a clapper:

```
<div class="room" id="kitchen">
	<div class="lightbulb on"></div>
	<div class="switch"></div>
	<div class="switch"></div>
	<div class="clapper"></div>
</div>
```

Triggering the clapper or either of the switches will change the state of the lightbulb. The switches and the clapper don't care what state the lightbulb is in; they just want to change the state.

Without custom events, you might write some code like this:

```
$( ".switch, .clapper" ).click(function() {
	var light = $( this ).closest( ".room" ).find( ".lightbulb" );
	if ( light.is( ".on" ) ) {
		light.removeClass( "on" ).addClass( "off" );
	} else {
		light.removeClass( "off" ).addClass( "on" );
	}
});
```

With custom events, your code might look more like this:

```
$( ".lightbulb" ).on( "light:toggle", function( event ) {
	var light = $( this );
	if ( light.is( ".on" ) ) {
		light.removeClass( "on" ).addClass( "off" );
	} else {
		light.removeClass( "off" ).addClass( "on" );
	}
});

$( ".switch, .clapper" ).click(function() {
	var room = $( this ).closest( ".room" );
	room.find( ".lightbulb" ).trigger( "light:toggle" );
});
```

This last bit of code is not that exciting, but something important has happened: we've moved the behavior of the lightbulb away from the switches and the clapper and to the lightbulb itself.

Let's make our example a little more interesting. We'll add another room to our house, along with a master switch, as shown here:

```
<div class="room" id="kitchen">
	<div class="lightbulb on"></div>
	<div class="switch"></div>
	<div class="switch"></div>
	<div class="clapper"></div>
</div>
<div class="room" id="bedroom">
	<div class="lightbulb on"></div>
	<div class="switch"></div>
	<div class="switch"></div>
	<div class="clapper"></div>
</div>
<div id="master_switch"></div>
```

If there are any lights on in the house, we want the master switch to turn all the lights off; otherwise, we want it to turn all lights on. To accomplish this, we'll add two more custom events to the lightbulbs: `light:on` and `light:off`. We'll make use of them in the `light:toggle` custom event, and use some logic to decide which one the master switch should trigger:

```
$( ".lightbulb" ).on( "light:toggle", function( event ) {
	var light = $( this );
	if ( light.is( ".on" ) ) {
		light.trigger( "light:off" );
	} else {
		light.trigger( "light:on" );
	}
}).on( "light:on", function( event ) {
	$( this ).removeClass( "off" ).addClass( "on" );
}).on( "light:off", function( event ) {
	$( this ).removeClass( "on" ).addClass( "off" );
});

$( ".switch, .clapper" ).click(function() {
	var room = $( this ).closest( ".room" );
	room.find( ".lightbulb" ).trigger( "light:toggle" );
});

$( "#master_switch" ).click(function() {
	var lightbulbs = $( ".lightbulb" );

	// Check if any lightbulbs are on
	if ( lightbulbs.is( ".on" ) ) {
		lightbulbs.trigger( "light:off" );
	} else {
		lightbulbs.trigger( "light:on" );
	}
});
```

Note how the behavior of the master switch is attached to the master switch; the behavior of a lightbulb belongs to the lightbulbs.

### Naming Custom Events

You can use any name for a custom event, however you should beware of creating new events with names that might be used by future DOM events.  For this reason, in this article we have chosen to use `light:` for all of our event names, as events with colons are unlikely to be used by a future DOM spec.

### Recap: `.on()` and `.trigger()`

In the world of custom events, there are two important jQuery methods: `.on()` and `.trigger()`. In the [Events](/events/) chapter, we saw how to use these methods for working with user events; for this chapter, it's important to remember two things:

* `.on()` method takes an event type and an event handling function as arguments. Optionally, it can also receive event-related data as its second argument, pushing the event handling function to the third argument. Any data that is passed will be available to the event handling function in the `data` property of the event object. The event handling function always receives the event object as its first argument.

* `.trigger()` method takes an event type as its argument. Optionally, it can also take an array of values. These values will be passed to the event handling function as arguments after the event object.

Here is an example of the usage of `.on()` and `.trigger()` that uses custom data in both cases:

```
$( document ).on( "myCustomEvent", {
	foo: "bar"
}, function( event, arg1, arg2 ) {
	console.log( event.data.foo ); // "bar"
	console.log( arg1 );           // "bim"
	console.log( arg2 );           // "baz"
});

$( document ).trigger( "myCustomEvent", [ "bim", "baz" ] );
```

### Conclusion

Custom events offer a new way of thinking about your code: they put the emphasis on the target of a behavior, not on the element that triggers it. If you take the time at the outset to spell out the pieces of your application, as well as the behaviors those pieces need to exhibit, custom events can provide a powerful way for you to "talk" to those pieces, either one at a time or en masse. Once the behaviors of a piece have been described, it becomes trivial to trigger those behaviors from anywhere, allowing for rapid creation of and experimentation with interface options. Finally, custom events can enhance code readability and maintainability, by making clear the relationship between an element and its behaviors.
