---
chapter : jquery-basics
section : 5
title   : Traversing
---
## Traversing

Once you have made an intial selection with jQuery, you may want to traverse
deeper into what was just selected. Traversing can be broken down into three
basic parts: parents, children and siblings. jQuery has an abundance of easy
to use methods for all these parts. You will notice that each of these methods
can optionaly be passed string selector and some can also take another jQuery
object in order to filter your selection down. Be sure to pay attention and
refer to the API docs to know what all variation of arguments you have
available.


### Parents

The methods for finding the parents from a selection: `$.fn.parent`, `$.fn.parents`, `$.fn.parentsUntil` and `$.fn.closest`. 

<javascript caption="Selecting an element's direct parent">
$('#myList').parent();
</javascript>

<javascript caption="Selecting all the parents of an element that match a given selector">
$('#myList').parents('div.section');
</javascript>

<javascript caption="Selecting all the parents of an element up to, but *not including* the selector">
var section = $('div.section');
$('#myList').parentsUntil(section);
</javascript>
<javascript caption="Selecting the closest parent, note that only one parent will be selected and that the initial element itself is included in the search">
  $('#myList').closest('#navigation');
</javascript>

### Children

The methods for finding child elements from a selection: `$.fn.children` and
`$.fn.find`. The difference between these methods lies in how far into the
child structure the selection is made. `$.fn.children` only operates on direct
child nodes, while `$.fn.find` can traverse recursively into children, and
children of those children, etc.

<javascript caption="Selecting an element's direct children">
$('#myList').children('li');
</javascript>

<javascript caption="Finding all the links within a selection that match the selector">
$('#myList').find('a.external');
</javascript>

### Siblings

The rest of the traversal methods within jQuery all deal with finding sibling
selections. There are a few basic methods as far as direction is concerned. You
can find previous elements with `$.fn.prev`, next elements with `$.fn.next` and
both with `$.fn.siblings`. There are also a few other methods that build onto
these basic methods, similar to how `$.fn.parentsUntil` works; `$.fn.nextAll`,
`$.fn.nextUntil`, `$.fn.prevAll` and `$.fn.prevUntil`.

<javascript caption="Selecting an element's next sibling, filtering it by a selector">
// Note that this does not match the first next sibling with the class 'section'
// jQuery gets the next sibling and returns it only if it matches the selector
$('#myList').next('.section');
</javascript>

<javascript caption="Selecting an element's next sibling that matches a selector">
$('#myList').nextAll('.section').first();
</javascript>

<javascript caption="Selecting an element's previous sibling, filtering it by a selector">
// Note that this does not match the first previous sibling with the class 'section'
// jQuery gets the previous sibling and returns it only if it matches the selector
$('#myList').prev('.section');
</javascript>

<javascript caption="Selecting an element's previous sibling that matches the given selector">
$('#myList').prev('.section');
</javascript>

<javascript caption="Selecting an element's siblings in both directions that matches the given selector">
    $('#myList').siblings('div.section');
</javascript>

You can see all these methods metioned and more at the
[Traversal documentation on api.jquery.com](http://api.jquery.com/category/traversing/tree-traversal/)

<div class="note" markdown="1">
Be cautious with traversing long distances in
your documents — complex traversal makes it imperative that your document's
structure remain the same, something that's difficult to guarantee even if
you're the one creating the whole application from server to client. One- or
two-step traversal is fine, but you generally want to avoid traversals that
take you from one container to another.
</div>
