---
title:        Working with Events, part 2
attribution:  Karl Swedberg
status:       needswork
editrequired: 3
source:       http://www.learningjquery.com/2008/05/working-with-events-part-2
---
In my last article, I described the common problem of events seemingly ceasing
to work for new elements added to a document, whether by some form of ajax or
by DOM modification. We examined one way to overcome the problem: Event
Delegation. With event delegation, we bind the event handler to a containing
element that remains in the DOM and then check for the target of the event.

###Cloning Nodes

This time, we'll take a look at re-binding event handlers. But before we do, I
should mention that, as of jQuery version 1.2, event handlers can be cloned
along with elements. Consider this unordered list:

```
  <ul id="list3" class="eventlist">
    <li>plain</li>
    <li class="special">special <button>I am special</button></li>
    <li>plain</li>
  </ul>
```

We can make a copy of `<li class="special">` and insert it after the original,
while at the same time retaining any event handlers that were attached within
the original. The plain `.clone()` method doesn't work that way; instead, it just
copies the element:

```
$(document).ready(function() {
  $('#list3 li.special button').click(function() {
    var $parent = $(this).parent();
    $parent.clone().insertAfter($parent);
  });
});
```

Try it:

As you can see, the original button is able to keep creating new list items,
but the buttons inside the "dynamically generated" list items can't create new
ones.

To get the event handlers copied over as well, all we have to do is pass in
true to the method's single argument:

```
$(document).ready(function() {
  $('#list4 li.special button').click(function() {
    var $parent = $(this).parent();
    $parent.clone(true).append(' I\'m a clone!').insertAfter($parent);
  });
});
```

<div class="note" markdown="1">
I've added `.append(' I\'m a clone!')` here only as visual reinforcement of what is going on.
</div>

Try it now:

Using `.clone(true)` is great when we want to make a copy of existing elements
and their event handlers, but there are plenty of other situations that don't
involve cloning in which we might want event handlers to persist.

###Re-binding Basics

The basic concept behind re-binding is fairly straightforward: We create a
function that binds the handlers and then call it whenever new elements are
introduced. For example, with our unordered list above, we first create a
function called addItem that registers the click handler, which in turn will
add a new item:

```
function addItem() {
  $('#list5 li.special button').click(function() {
    var $newLi = $('<li class="special">special and new <button>I am new</button></li>');
    $(this).parent().after($newLi);
  });
}
```

Next, we call that function when the DOM initially loads:

```
$(document).ready(function() {
  addItem();
});
```

Finally, we can call the function inside the click handler—and inside itself.
That way, it will bind the event handlers to the new list item as well.

We'll add one more click handler to the button, but this one will not be
re-bound, so that we can see the difference.

Here is what the code for buttons in `#list5` looks like, all together:

```
function addItem() {
  $('#list5 li.special button').click(function() {
    var $newLi = $('&lt;li class="special"&gt;special and new &lt;button&gt;I am new&lt;/button&gt;&lt;/li&gt;');
    $(this).parent().after($newLi);
    addItem();
  });
}

$(document).ready(function() {
  addItem();

  // non-rebinding click handler ...
  $('#list5 li.special button').click(function() {
    $(this).after(' pressed');
  });
});
```

Try this one out:

We can see that "pressed" is appended to the first list item each time it is
clicked, but it is not appended to any of the list items created by our clicks.
On the other hand, the created buttons are able to generate further list items
because that function is being rebound.

However, what we've just done produces unwelcome results if we click on a
button more than once. The click handler is bound again with each click of a
button, producing a multiplier effect. The first click of a button creates one
extra list item; the second creates two; the third, four; and so on.

###Unbind, then Bind

To avoid the multiple binding, we can unbind first and then re-bind. So in line 2, instead of this ...

```
$('#list5 li.special button').click(function() {
```

... we'll have this ...

```
$('#list6 li.special button').unbind('click').bind('click', function() {
```

Note: The use of `.bind()` here. This is the universal event binder that jQuery
uses. All the others, such as `.click()`, `.blur()`, `.resize()`, and so on, are
shorthand methods for their `.bind('event')` equivalent.

The complete new code, again with the additional non-rebinding click handler
for contrast, looks like this:

```
function addItemUnbind() {
  $('#list6 li.special button')
    .unbind('click')
    .bind('click', function() {
      var $newLi = $('<li class="special">special and new <button>I am new</button></li>');
      $(this).parent().after($newLi);
      addItemUnbind();
  });
}
$(document).ready(function() {
  addItemUnbind();

  // non-rebinding click handler
  $('#list6 li.special button').click(function() {
    $(this).after(' pressed');
  });
});
```

See how this one works:

Unfortunately, our attempt to unbind the `addItemUnbind()` function went too far,
unbinding the "non-rebinding" click handler as well, before it even had a
chance to run once (it's evident because there is no "pressed" text after the
"I am special" button here). Clearly, we're going to have to be more careful
about what we're unbinding.

###Event Namespacing

One way to avoid the over-reaching event unbinding is to apply a "namespace" to
the click event for both binding and unbinding. So, instead of `.bind('click')`
and `.unbind('click)`, we'll have, for example, `.bind('click.addit')` and
`.unbind('click.addit)`. Here is one last code sample, which looks identical to
the previous, except that it now has the namespaced event (and the list id is
`list7`):

```
function addItemNS() {
  $('#list7 li.special button')
    .unbind('click.addit')
    .bind('click.addit', function() {
      var $newLi = $('&lt;li class="special"&gt;special and new &lt;button&gt;I am new&lt;/button&gt;&lt;/li&gt;');
      $(this).parent().after($newLi);
      addItemNS();
  });
}
$(document).ready(function() {
  addItemNS();

  // non-rebinding click handler
  $('#list7 li.special button').click(function() {
    $(this).after(' pressed');
  });
});
```

We should now — finally! — have a set of behaviors attached to these buttons that act the way we intend them to:

For more information about event namespacing, read Brandon Aaron's article, Namespace Your Events.

###Bonus: Unbind by Function Reference

If you've made it this far, then you must have extraordinary patience, in which
case I'll reward it with one final method of rebinding. Rather than namespace
the events, we can reference the function in the second argument of the `.bind()`
and `.unbind()` methods. We have to shuffle things around a bit to avoid "too
much recursion," but it'll do just fine like so:

```
function addItemFinal() {
    var $newLi = $('&lt;li class="special"&gt;special and new &lt;button&gt;I am new&lt;/button&gt;&lt;/li&gt;');
    $(this).parent().after($newLi);
    $('#list8 li.special button')
      .unbind('click', addItemFinal)
      .bind('click', addItemFinal);
}

$(document).ready(function() {
$('#list8 li.special button').bind('click', addItemFinal);

  // non-rebinding click handler
  $('#list8 li.special button').click(function() {
    $(this).after(' pressed');
  });
});
```

Note here that there are no parentheses after `addItemFinal` when it appears
inside the bind/unbind, because we are referencing the function, not calling
it. So let's test it out one last time:

###Plugin Options

There are three great plugins that can do a lot of this work for us:

[Live Query](http://plugins.jquery.com/project/livequery) by [Brandon Aaron](http://blog.brandonaaron.net/)
[Listen](http://plugins.jquery.com/project/Listen) by Ariel [Ariel Flesler](http://flesler.blogspot.com/)
[Intercept](http://plugins.jquery.com/project/Intercept) by [Ariel Flesler](http://flesler.blogspot.com/)

If this entry left you bewildered, or if you want a quick, well tested
solution, you should definitely try one of them. Each works a little
differently, but they're all super plugins.

###Update: Event Namespacing with Add and Remove

I'm providing an example that allows for both adding a row and removing a row.
The code is based on the "Event Namespacing" example above:

```
function addRemoveItemNS() {
  var $newLi = $('<li class="special">special and new <button class="addone">I am new</button> <button class="removeme">remove me</button></li>');

$('#list9 li.special')
  .find('button.addone')
    .unbind('click.addit')
    .bind('click.addit', function() {
      $(this).parent().after($newLi);
      addRemoveItemNS();
  })
  .end()
  .find('button.removeme')
  .unbind('click.removeit')
  .bind('click.removeit', function() {
    $(this).parent().remove();
  });
}

$(document).ready(function() {
  addRemoveItemNS();
});
```

I added an "addone" class to the initial button, but otherwise the list is the
same as the others. You can try it out here:

included in this post:
[http://www.learningjquery.com/js/events2.js](http://www.learningjquery.com/js/events2.js)
