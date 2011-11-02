---
chapter : effects
section : 3
title   : Custom Effects with $.fn.animate
attribution:  jQuery Fundamentals
---
jQuery makes it possible to animate arbitrary CSS properties via the
`$.fn.animate` method.  The `$.fn.animate` method lets you animate to a set
value, or to a value relative to the current value.

<javascript caption="Custom effects with `$.fn.animate`">
    $('div.funtimes').animate(
        {
            left : "+=50",
            opacity : 0.25
        },
        300, // duration
        function() { console.log('done!'); // calback
    });
</javascript>

<div class="note" markdown="1">
Color-related properties cannot be animated with `$.fn.animate` using jQuery
out of the box.  Color animations can easily be accomplished by including the
[color plugin](http://github.com/jquery/jquery-color).  We'll discuss using
plugins later in the book.
</div>

### Easing

Definition: Easing describes the manner in which an effect occurs — whether
the rate of change is steady, or varies over the duration of the animation.
jQuery includes only two methods of easing: swing and linear.  If you want more
natural transitions in your animations, various easing plugins are available.

As of jQuery 1.4, it is possible to do per-property easing when using the
`$.fn.animate` method.

<javascript caption="Per-property easing">
    $('div.funtimes').animate(
        {
            left : [ "+=50", "swing" ],
            opacity : [ 0.25, "linear" ]
        },
        300
    );
</javascript>

For more details on easing options, see
[Animation documentation on api.jquery.com](http://api.jquery.com/animate/).
