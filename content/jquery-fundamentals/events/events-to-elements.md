---
chapter : events
section : 2
title   : Connecting Events to Elements
attribution:  jQuery Fundamentals
---
## Connecting Events to Elements

jQuery offers convenience methods for most common events, and these are the
methods you will see used most often.  These methods — including `$.fn.click`,
`$.fn.focus`, `$.fn.blur`, `$.fn.change`, etc. — are shorthand for jQuery's
`$.fn.bind` method.  The bind method is useful for binding the same handler
function to multiple events, when you want to provide data to the event hander,
when you are working with custom events, or when you want to pass an object of
multiple events and handlers.

<div class="example" markdown="1">
Event binding using a convenience method

    $('p').click(function() {
        console.log('click');
     });
</div>

<div class="example" markdown="1">
Event biding using the `$.fn.bind` method

    $('p').bind('click', function() {
        console.log('click');
    });
</div>

<div class="example" markdown="1">
Event binding using the `$.fn.bind` method with data

    $('input').bind(
        'click change',  // bind to multiple events
        { foo : 'bar' }, // pass in data

        function(eventObject) {
            console.log(eventObject.type, eventObject.data);
            // logs event type, then { foo : 'bar' }
        }
    );
</div>

### Connecting Events to Run Only Once

Sometimes you need a particular handler to run only once — after that, you may
want no handler to run, or you may want a different handler to run.  jQuery
provides the `$.fn.one` method for this purpose.

<div class="example" markdown="1">
Switching handlers using the `$.fn.one` method

    $('p').one('click', function() {
        console.log('You just clicked this for the first time!');
        $(this).click(function() { console.log('You have clicked this before!'); });
    });
</div>

The `$.fn.one` method is especially useful if you need to do some complicated
setup the first time an element is clicked, but not subsequent times.

### Disconnecting Events

To disconnect an event handler, you use the `$.fn.unbind` method and pass in
the event type to unbind.  If you attached a named function to the event, then
you can isolate the unbinding to that named function by passing it as the
second argument.

<div class="example" markdown="1">
Unbinding all click handlers on a selection

    $('p').unbind('click');
</div>

<div class="example" markdown="1">
Unbinding a particular click handler

    var foo = function() { console.log('foo'); };
    var bar = function() { console.log('bar'); };

    $('p').bind('click', foo).bind('click', bar);
    $('p').unbind('click', bar); // foo is still bound to the click event
</div>

### Namespacing Events

For complex applications and for plugins you share with others, it can be
useful to namespace your events so you don't unintentionally disconnect events
that you didn't or couldn't know about.

<div class="example" markdown="1">
Namespacing events

    $('p').bind('click.myNamespace', function() { /* ... */ });
    $('p').unbind('click.myNamespace');
    $('p').unbind('.myNamespace'); // unbind all events in the namespace
</div>

### Binding Multiple Events

Quite often elements in your application will be bound to multiple events, each
having a different function for handing the event.  In these cases you can pass
an object into `$.fn.bind` with one or more key/value pairs, with the key being
the event name and the value being the function to handle the event.

<div class="example" markdown="1">
Binding Multiple Events

    $('p').bind({
    	'click': function() { console.log('clicked!'); },
    	'mouseover': function() { console.log('hovered!'); }
    });
</div>

<div class="note" markdown="1">
### Note

The option to pass an object of multiple events and handlers to $.fn.bind was
introduced in jQuery 1.4.4.
</div>
