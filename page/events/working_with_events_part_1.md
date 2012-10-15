---
title:        Working with Events, part 1
attribution:  Karl Swedberg
status:       needswork
editrequired: 2
source:       http://www.learningjquery.com/2008/03/working-with-events-part-1
---

CSS and JavaScript are different in many ways, almost all of which are too
obvious to mention. However, one difference between the two bears explanation,
because it is often the cause of confusion and consternation, especially among
those who are making the transition from CSS guru to jQuery novice. In fact, it
was one of the first things I asked about on the jQuery mailing list back in
2006. Since then, I've seen at least one question on the subject every week,
and sometimes as many as one per day—despite an [FAQ page](http://docs.jquery.com/Frequently_Asked_Questions#Why_do_my_events_stop_working_after_an_Ajax_request.3F)
and [these](http://plugins.jquery.com/project/livequery)
[three](http://plugins.jquery.com/project/Listen)
[plugins](http://plugins.jquery.com/project/Intercept) to help users deal with
it.

##How CSS and JavaScript Are Different

So, what's this important difference?

*In CSS*, style rules are automatically applied to any element that matches the
selectors, no matter when those elements are added to the document (DOM).

*In JavaScript*, event handlers that are registered for elements in the
document apply only to those elements that are part of the DOM at the time the
event is attached. If we add similar elements to the DOM at a later time,
whether through simple DOM manipulation or ajax, CSS will give those elements
the same appearance, but JavaScript will not automatically make them act the
same way.

For example, let's say we have `<button
class="alert">Alert!</button>` in our document, and we want to attach
a click handler to it that generates an alert message. In jQuery, we might do
so with the following code:

```
    $(document).ready(function() {
      $('button.alert').click(function() {
        alert('this is an alert message');
      });
    });
```

Here we are registering the click handler for the button with a class of
"alert" as soon as the DOM has loaded. So, the button is there, and we have a
click function bound to it. If we add a second &lt;button class="alert"&gt;
later on, however, it will know nothing about that click handler. The click
event had been dealt with before this second button existed. So, the second
button will not generate an alert.

Let's test what we've just discussed. I've added a script with the above three
lines of jQuery code so that the following button will produce an alert message
when clicked.

##Events Don't Work with Added Elements

Now, let's create a new button (if we don't already have a second one) using jQuery code like this:

```
    $('#create-button').click(function() {
      if ( $('button.alert').length <2) {
        $('<button class="alert">Not another alert').insertAfter(this);
      }
      return false;
    });
```

Have you clicked the link to create the second button? Great. Now click that button. It does nothing. Just as expected.

##CSS Continues to "Work" with Newly Created Elements

Now let's take a look at another example. In this one, we have three list items—two plain items and one with a class of special:

```
<ul id="list1" class="eventlist">
  <li>plain</li>
  <li class="special">special <button>I am special</button>&lt/li>
  <li>plain</li>
</ul>
```

Press the "I am special" button to create a new list item with a class of "special":

Notice that, like the first special li, the new one has the yellow background.
The CSS has come through for us. But press the newly created "I am new" button
and, just as with the second alert above, nothing happens. The jQuery code
we're using to add the new item says that upon clicking a button inside a list
item with a class of "special" (which itself is inside an element with id of
"list1") a new list item with class="special" should be inserted after the list
item in which the button was clicked:

```
    $(document).ready(function() {
      $('#list1 li.special button').click(function() {
        var $newLi = $('<li class="special">special and new <button>I am new</button></li>');
        $(this).parent().after($newLi);
      });
    });
```

So, how can we get the events to carry over to the new elements? Two common
approaches are event delegation and "re-binding" event handlers. In this entry,
we'll examine event delegation; in part 2, we'll explore ways to re-bind.

##Event Delegation: Getting Events to Embrace New Elements

The general idea of event delegation is to bind the event handler to a
containing element and then have an action take place based on which specific
element within that containing element is targeted. Let's say we have another
unordered list: `<ul id="list2"> ... </ul>`. Instead of attaching the .click()
method to a button — $('#list2 li.special button').click(...) — we can attach
it to the entire surrounding `<ul>`. Through the magic of "bubbling," any click
on the button is also a click on the button's surrounding list item, the list
as a whole, the containing div, and all the way up to the window object. Since
the `<ul>` that gets clicked is the same one each time (we're only creating items
within the `<ul>`), the same thing will happen when clicking on all of the
buttons, regardless of when they were created.

When we use event delegation, we need to pass in the `event` argument. So, in
our case, instead of `.click()`, we'll have `.click(event)`. We don't have to name
this argument event. We can call it `e` or `evt` or `gummy` or whatever we want. I
just like to use labels that are as obvious as possible because I have a hard
time keeping track of things. Here is what we have so far:

```
    $(document).ready(function() {
      $('#list2').click(function(event) {
        var $newLi = $('<li class="special">special and new <button>I am new</button></li>');
      });
    });
```

So far, the code is very similar to our first attempt, except for the selector
we're starting with (#list2) and the addition of the event argument. Now we
need to determine whether what is being clicked inside the `<ul>` is a
"special" button or not. If it is, we can add a new `<li class="special">`.
We check the clicked element by using the "target" property of the event
argument:

```
    $(document).ready(function() {
      $('#list2').click(function(event) {
        var $newLi = $('<li class="special">special and new <button>I am new</button></li>');
        var $tgt = $(event.target);
        if ($tgt.is('button')) {
          $tgt.parent().after($newLi);
        }

        // next 2 lines show that you've clicked on the ul
        var bgc = $(this).css('backgroundColor');
        $(this).css({backgroundColor: bgc == '#ffcccc' || bgc == 'rgb(255, 204, 204)' ? '#ccccff' : '#ffcccc'});
      });
    });
```

Line 4 above puts the target element in a jQuery wrapper and stores it in the
$tgt variable. Line 5 checks whether the click's target is a button. If it is,
the new list item is inserted after the parent of the clicked button.

I put an additional two lines at the end to demonstrate that a click on one of
the buttons is still considered a click on the `<ul>` You'll see that
clicking anywhere within the` <ul>` toggles its background between pink and
blue.

It's probably worth noting that jQuery makes working with the event argument
cross-browser friendly. If you do this sort of thing with plain JavaScript and
DOM nodes, you'd have to do something like this:

```
var list2 = document.getElementById('list2');
list2.onclick = function(e) {
  var e = e || window.event;
  var tgt = e.target || e.srcElement;
  if (tgt.nodeName.toLowerCase() == 'button') {
    // do something
  }
};
```

As you can see, it's a bit of a hassle.

##Another Huge Benefit of Event Delegation

Event delegation is also a great way to avoid crippling the user's browser when
you're working with a huge document. For example, if you have a table with
thousands of cells, and you want something to happen when the user clicks on
one, you won't want to attach a click handler to every single one of them
(believe me, it can get ugly). Instead, you can attach the click handler to a
single table element and use event.target to pinpoint the cell that is being
clicked:

```
    $(document).ready(function() {
      $('table').click(function(event) {
        var $thisCell, $tgt = $(event.target);
        if ($tgt.is('td')) {
          $thisCell = $tgt;
        } else if ($tgt.parents('td').length) {
          $thisCell = $tgt.parents('td:first');
        }
        // now do something with $thisCell
      });
    });
```

<div class="note" markdown="1"> I had to account for the possibility of
clicking in a child/descendant of a table cell, but this seems a small
inconvenience for the great performance increase that event delegation affords.
</div>
