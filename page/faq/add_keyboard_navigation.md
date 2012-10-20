---
title:        Adding Keyboard Navigation
level:        beginner
source:       http://jqueryfordesigners.com/adding-keyboard-navigation/
---

##The problem

[Mathieu White](http://mathieuwhite.com/) got [in touch with me to ask](http://jqueryfordesigners.com/request/) how to add the keyboard support to his site. He wasn’t using my own slider code, he was using [Niall Doherty’s version](http://www.ndoherty.biz/coda-slider). Since changing the slider code was out of the question, and moving to my own carousel code to trigger the goto events would also be way too much work for a simple effect, I wanted to find a simple and easy to add solution. So to keep things as simple as possible, I worked out I should be able to layer on the functionality after the slider code was finished.

Since jQuery lends itself to finding something, then doing something to it, I would let the slider code run, then find the links on the page used to navigate the slider, and trigger them as appropriate on keyboard input.

The task is to slide the panels left or right, depending on which cursor key is pressed on the page.

##The solution

As Mathieu’s slider is the primary focus of the page, we want the keyboard support to apply from anywhere on the page. And we’re only navigating left and right, which won’t interfere with scrolling up and down the page.

We need a keyboard event listener on the document.documentElement element as this is the best point for a catch all element (to work in all browsers). If an input element is focused, and you press a key, it fires the keypress event on the input element, then on all the parent elements, which eventually hits the body element, then the documentElement then the the window.

Once we have our keyboard event listener, we need to determine whether the user pressed the left or right cursor key, and if they did trigger the effect.

Triggering the effect is the trick. We’re doing this by triggering a click on the navigation links. So we’re faking a user interaction. If the user pressed the right cursor key, we need to find the navigation link that’s currently selected (in this case it has a class of current), and find the link to the right, and trigger a click on this.

##Capturing key events

Then a keyboard key is pressed the event break into three separate events, which fire in the following order:

- keydown
- keypress
- keyup

So I’m going to use the last phase of the events and use the keyup event.

```
$( document.documentElement ).keyup(function(event) {

  // handle cursor keys

});
```

Note that all event handlers in jQuery, such as click, keyup, mouseover, etc receive an event [argument](http://en.wikipedia.org/wiki/Parameter_(computer_science)) - which I’ve captured under the variable name event.

The left and right key codes are 37 and 39 respectively. So we only want to action the slide if these keys are pressed, so we’ll check the keyCode property on the event - this property is [very well supported in browsers](http://www.quirksmode.org/js/keys.html):

```
$( document.documentElement ).keyup(function(event) {

  // handle cursor keys

  if (event.keyCode === 37) {

    // go left

  } else if (event.keyCode === 39) {

    // go right

  }

});
```

##Triggering the Click on the Right Link

Triggering a click event is easy, but the problem we have to solve is finding the right link to click. Since this slider adds a class of current to the currently active link, we’ll use that as our anchor point, and try to find the link before (if the left cursor key is pressed) and after (if the right cursor key is pressed).

In some cases the current class might be on list element, which would make the navigating slightly easier, but in this case the markup looks a bit like this:

```
<div class="coda-slider-wrapper">
  <ul>
    <li><a class="current" href="#1">1</a></li>
    <li><a href="#2">2</a></li>
    <li><a href="#3">3</a></li>
    <li><a href="#4">4</a></li>
    <li><a href="#5">5</a></li>
  </ul>
</div>
```

In the case above, the “next” link is #2. Currently there’s no previous available, but we’ll let jQuery handle this for us.

To find the next link, first we need to grab the link that’s currently selected:

```
	$(".coda-slider-wrapper ul a.current")
```

Next we need to move up the tree (to the li element) and move to the next element and then back down to the a element to trigger a click.

```
	$(".coda-slider-wrapper ul a.current")
	  .parent() // moves up to the li element
	  .next() // moves to the adjacent li element
	  .find("a") // moves down to the link
	  .click(); // triggers a click on the next link
```

Since jQuery continues to allow chained methods to work even if there’s no elements found, we can also use prev() in the place of next() when current is on the first element and the code will work just fine still.

Let’s plug this code in to the keyboard event handler:

```
$( document.documentElement ).keyup(function(event) {

  // handle cursor keys
  if (event.keyCode === 37) {

    // go left
    $(".coda-slider-wrapper ul a.current")
      .parent() // moves up to the li element
      .prev() // moves to the adjacent li element
      .find("a") // moves down to the link
      .click(); // triggers a click on the previous link

  } else if (event.keyCode === 39) {

    // go right
    // same as above, but just on one line and next instead of prev
    $(".coda-slider-wrapper ul a.current").parent().next().find("a").click();

  }

});
```

This code can be simplified since a lot of it is repetitive aside from the ‘next’ and ‘prev’. If you’re happy for slightly more complicated code, then use the code below, otherwise stick with the code above.

```
$( document.documentElement ).keyup(function(event) {
  var direction = null;

  // handle cursor keys
  if (event.keyCode === 37) {

    // go left
    direction = "prev";

  } else if (event.keyCode === 39) {

    // go right
    direction = "next";

  }

  if (direction != null) {

    $(".coda-slider-wrapper ul a.current").parent()[ direction ]().find("a").click();

  }

});
```

##Where does this all go?

So we have our code, but where does it all fit together with the existing code?

Since we’re going in after the slider plugin is run, so it should go *directly after the plugin is initialised.

In Mathieu’s code, he had the following:

```
	$().ready(function() {

	  $("#coda-slider-1").codaSlider();

	});
```

Note that $().ready is the same as $(document).ready (though it’s not a style I would personally use). *Directly* after the plugin (i.e. before the });) results in the following code:

```
$().ready(function() {

	$().ready(function() {

	  $("#coda-slider-1").codaSlider();

	  $( document.documentElement ).keyup(function (event) {

	    var direction = null;

	    // handle cursor keys
	    if (event.keyCode === 37) {

	      // go left
	      direction = "prev";

	    } else if (event.keyCode === 39) {

	      // go right
	      direction = "next";

	    }

	    if (direction != null) {

	      $(".coda-slider-wrapper ul a.current").parent()[ direction ]().find("a").click();

	    }

	  });

	});

```

You can see this all [in action in the demo](http://static.jqueryfordesigners.com/demo/keyboard-nav.html), and be sure to use the left and right keyboard cursor keys to see the demo working.

##Alternative uses

You can reuse this code for a lot of the sliders so long as there are links to navigate between the panels - you just need to navigate the DOM correctly to trigger the click on the right link based on the cursor key presses.