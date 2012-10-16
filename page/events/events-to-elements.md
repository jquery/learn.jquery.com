---
title   : Handling Events
attribution:  jQuery Fundamentals
---
jQuery provides a method `.on()` to 
respond to any event on the selected elements. This is called an _event binding_.
Although `.on()` isn't the only method provided for event binding, it is a best
practice to use this for jQuery 1.7+. See history of event binding for more info.
<!-- TODO: link to history page -->

The on method provides several useful features:
<ul>
<li><a href="#simple-event-binding">Bind any event triggered on the selected elements to an event handler</a></li>
<li><a href="#multiple-events-one-handler">Bind multiple events to one event handler</a></li>
<li><a href="#multiple-events-multiple-handlers">Bind multiple events and multiple handlers to the selected elements</a></li>
<li><a href="#event-object">Use details about the event in the event handler</a></li>
<li><a href="#passing-data">Pass data to the event handler for custom events</a></li>
<li><a href="#event-delegation">Bind events to elements that will be rendered in the future</a></li>
</ul>
### Examples

#### <a name="simple-event-binding">Simple event binding</a>
```
// When any <p> tag is clicked, we expect to see '<p> was clicked' in the console.
$('p').on('click', function() {
  console.log('<p> was clicked');
});
```

#### <a name="multiple-events-one-handler">Many events, but only one event handler</a>

Suppose you want to trigger the same event whenever the mouse hovers over or leaves 
the selected elements. The best practice for this is to use "mouseenter mouseleave". 
Note the difference between this and the next example.

```
// When a user focuses on or changes any input element, we expect a console message

$('div').on('mouseenter mouseleave',  // bind to multiple events
  function() {
    console.log('mouse hovered over or left a div');
  }
);
```

#### <a name="multiple-events-multiple-handlers">Many events and handlers</a>

Suppose that instead you want different event handlers for when the mouse enters and 
leaves an element. This is more common than the previous example. For example, if you 
want to show and hide a tooltip on hover, you would use this. 

`.on()` accepts an object containing multiple events and handlers.

```
$('div').on({
  mouseenter: function() {
      console.log('hovered over a div');
    },
  mouseleave: function() {
      console.log('mouse left a div');
    },
  click: function() {
      console.log('clicked on a div');
    }
});
```
  
#### <a name="event-object">The event object</a>

Handling events can be tricky. It's often helpful to use the extra information contained
in the event object passed to the event handler for more control. To become familiar with 
the event object, use this code to inspect it in your browser console after you click on 
a `<div>` in the page. For a breakdown of the event object, see 
<a href="/events/inside-event-handling-function/">Inside the Event Handling Function</a>.

```
$('div').on('click', function(event) {
  console.log('event object:');
  console.dir(event);
});
```

#### <a name="passing-data">Passing data to the event handler</a>

You can pass your own data to the event object.

```
$('p').on('click', {foo: 'bar'}, function(event) {
  console.log('event data: ' + event.data.foo + ' (should be "bar")');
});
```


#### <a name="event-delegation">Binding events to elements that don't exist yet</a>

This is called _event delegation_. Here's an example just for completeness, but see the 
page on <a href="/events/event-delegation/">Event Delegation</a> for a full explanation.

```
$('ul').on('click', 'li', function() {
  console.log('Something in a <ul> was clicked, and we detected that it was an <li> element.
});
```

### Connecting Events to Run Only Once

Sometimes you need a particular handler to run only once — after that, you may
want no handler to run, or you may want a different handler to run.  jQuery
provides the `.one()` method for this purpose.

```
// Switching handlers using the `.one()` method
$('p').one('click', function() {
  console.log('You just clicked this for the first time!');
  $(this).click(function() { console.log('You have clicked this before!'); });
});
```

The `.one()` method is especially useful if you need to do some complicated
setup the first time an element is clicked, but not subsequent times.

`.one()` accepts the same arguments as `on()` which means it supports multiple events to one
or multiple handlers, passing custom data and event delegation.

### Disconnecting Events

Although all the fun of jQuery occurs in the `.on()` method, it's counterpart is just as important 
if you want to be a responsible developer. `.off()` cleans up that event 
binding when you don't need it anymore. Complex user interfaces with lots of event bindings 
can bog down browser performance, so using the `.off()` method diligently is a best practice to 
ensure that you only have the event bindings that you need, when you need them.

```
// Unbinding all click handlers on a selection
$('p').off('click');
```

```
// Unbinding a particular click handler, using a reference to the function
var foo = function() { console.log('foo'); };
var bar = function() { console.log('bar'); };

$('p').on('click', foo).bind('click', bar);
$('p').off('click', bar); // foo is still bound to the click event
```

### Namespacing Events

For complex applications and for plugins you share with others, it can be
useful to namespace your events so you don't unintentionally disconnect events
that you didn't or couldn't know about. For details, see Event Namespacing.

<!-- TODO: Link to namespacing -->
