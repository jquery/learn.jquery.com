---
title   : Triggering Event Handlers
attribution:  jQuery Fundamentals
---
#### Triggering Events
jQuery provides a way to trigger the event handlers bound to an element without any user interaction via the `$.fn.trigger` method.  

#### What handlers can be trigger()'d

jQuery's event handling system is a layer on top of the native browser DOM Level 2 or Microsoft (pre IE9) events. 
When an event handler is added using <code>.click(fn)</code> or <code>.on("click",fn)</code>, it can be triggered using jQuery's <code>.trigger("click")</code>
because jQuery stores a reference to that handler when it is originally added. The <code>.trigger()</code> function cannot be used to mimic native browser events, 
such as clicking on a file input box or an anchor tag. This is because, there is no event handler attached using jQuery's event system that coorespond to these events. 

#### How can I mimic a native browser event, if not <code>.trigger()</code>?


#### <code>.trigger()</code> vs <code>.triggerHandler()</code>

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

<!--
<javascript caption="When binding a click handler using">
  var foo = function(){
        console.log("clicked");
  }l
  $("#button").click(foo)
</javascript>



<javascript caption="jQuery transforms this into the equivalent of">
  var foo = function(){
        console.log("clicked");
  }l
  document.getElementById("button").addEventListener("click",foo,true);
</javascript>
-->
