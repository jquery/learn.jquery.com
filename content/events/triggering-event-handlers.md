---
title   : Triggering Event Handlers
attribution:  jQuery Fundamentals
github: johnkpaul
level: intermediate
---
#### Triggering Events
jQuery provides a way to trigger the event handlers bound to an element without any user interaction via the `$.fn.trigger` method.  

#### What handlers can be trigger()'d

jQuery's event handling system is a layer on top of native browser events. 
When an event handler is added using <code>.click(fn)</code> or <code>.on("click",fn)</code>, it can be triggered using jQuery's <code>.trigger("click")</code>
because jQuery stores a reference to that handler when it is originally added. Additionally, it will trigger the javascript inside the "onclick" attribute. The <code>.trigger()</code> function cannot be used to mimic native browser events, 
such as clicking on a file input box or an anchor tag. This is because, there is no event handler attached using jQuery's event system that coorespond to these events. 

<html caption="Anchor tag example">
    <a href="http://learn.jquery.com">Learn jQuery</a>
</html>

<javascript caption="This will not change the current page">
    $('a').trigger('click');
</javascript>

#### How can I mimic a native browser event, if not <code>.trigger()</code>?

In order to trigger a native browser event, you have to use [document.createEventObject](http://msdn.microsoft.com/en-us/library/ie/ms536390(v=vs.85).aspx) for < IE9 and  [document.createEvent](https://developer.mozilla.org/en/DOM/document.createEvent) for all other browsers.  
Using these two APIs, you can programatically create an event that behaves exactly as if someone has actually clicked on a file input box. The default action will happen, and the browse file dialog will display. 

The jQuery UI Team created [jquery.simulate.js](https://github.com/eduardolundgren/jquery-simulate/blob/master/jquery.simulate.js) in order to simplify triggering a native browser event for use in their automated testing. Its usage is modeled after jQuery's trigger.

<javascript caption="Triggering a native browser event using the simulate plugin">
    $('a').simulate('click');
</javascript>

This will not only trigger the jQuery event handlers, but also follow the link and change the current page.


#### <code>.trigger()</code> vs <code>.triggerHandler()</code>

There are four differences between <code>.trigger()</code> and <code>.triggerHandler()</code>

1. <code>triggerHandler</code> only triggers the event on the first element of a jQuery object. 
2. <code>triggerHandler</code> cannot be chained. It returns the value that is returned by the last handler, not a jQuery object.
3. <code>triggerHandler</code> will not cause the default behavior of the event (such as a form submission).
4. Events triggered by <code>triggerHandler</code>, will not bubble up the DOM heirarchy. Only the handlers on the single element will fire.

For more information see the [triggerHandler documentation](http://api.jquery.com/triggerHandler)

#### Don't use <code>.trigger()</code> to control your application

While this method has its uses, it should not be used simply to call a function that was bound as a click
handler.  Instead, you should store the function you want to call in a
variable, and pass the variable name when you do your binding.  Then, you can
call the function itself whenever you want, without the need for
`$.fn.trigger`.

<javascript caption="Triggering an event handler the right way">
   var foo = function(e) {
        if (e) {
            console.log(e);
        } else {
            console.log('this didn\'t come from an event!');
      }
    };

    $('p').click(foo);

    foo(); // instead of $('p').trigger('click')
</javascript>

