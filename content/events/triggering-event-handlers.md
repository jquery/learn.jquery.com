---
chapter : events
section : 4
title   : Triggering Event Handlers
attribution:  jQuery Fundamentals
---
jQuery provides a way to trigger the event handlers bound to an element without
any user interaction via the `$.fn.trigger` method.  While this method has its
uses, it should not be used simply to call a function that was bound as a click
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
