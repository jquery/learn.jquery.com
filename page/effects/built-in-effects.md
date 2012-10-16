---
title   : Built-in Effects
level: beginner
---
Frequently used effects are built into jQuery as methods:

#### $.fn.show

Show the selected element.

#### $.fn.hide

Hide the selected elements.

#### $.fn.fadeIn

Animate the opacity of the selected elements to 100%.

#### $.fn.fadeOut

Animate the opacity of the selected elements to 0%.

#### $.fn.slideDown

Display the selected elements with a vertical sliding motion.

#### $.fn.slideUp

Hide the selected elements with a vertical sliding motion.

#### $.fn.slideToggle

Show or hide the selected elements with a vertical sliding motion, depending on
whether the elements are currently visible.

```
// A basic use of a built-in effect
    $('h1').show();

### Changing the Duration of Built-in Effects

With the exception of `$.fn.show` and `$.fn.hide`, all of the built-in methods
are animated over the course of 400ms by default. Changing the duration of an
effect is simple.

```
// Setting the duration of an effect">
    $('h1').fadeIn(300);      // fade in over 300ms
    $('h1').fadeOut('slow');  // using a built-in speed definition
```

### jQuery.fx.speeds

jQuery has an object at `jQuery.fx.speeds` that contains the default speed, as
well as settings for "`slow`" and "`fast`".

```
speeds: {
    slow: 600,
    fast: 200,
    // Default speed
    _default: 400
}
```

It is possible to override or add to this object.  For example, you may want to
change the default duration of effects, or you may want to create your own
effects speed.

```
// Augmenting `jQuery.fx.speeds` with custom speed definitions">
    jQuery.fx.speeds.blazing = 100;
    jQuery.fx.speeds.turtle = 2000;
```

### Doing Something when an Effect is Done

Often, you'll want to run some code once an animation is done.  If you run it
before the animation is done, it may affect the quality of the animation, or it
may remove elements that are part of the animation.  [Definition: Callback
functions provide a way to register your interest in an event that will happen
in the future.] In this case, the event we'll be responding to is the
conclusion of the animation.  Inside of the callback function, the keyword this
refers to the element that the effect was called on; as we did inside of event
handler functions, we can turn it into a jQuery object via $(this).

```
// Running code when an animation is complete">
    $('div.old').fadeOut(300, function() { $(this).remove(); });
```

Note that if your selection doesn't return any elements, your callback will
never run!  You can solve this problem by testing whether your selection
returned any elements; if not, you can just run the callback immediately.

```
// Run a callback even if there were no elements to animate
    var $thing = $('#nonexistent');

    var cb = function() {
        console.log('done!');
    };

    if ($thing.length) {
        $thing.fadeIn(300, cb);
    } else {
        cb();
    }
```
