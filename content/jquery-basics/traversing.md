---
chapter : "jqfundamentals"
section : "5"
title   : "Traversing"
---
## Traversing

Once you have made an intial selection with jQuery, you may want to traverse a little deeper into what you just selected. Traversing can be broken down into three basic parts: parents, children and sibilings. jQuery has an abundance of easy to use methods for all these parts. You will notice that each of these methods can optionaly be passed string selector and some can also take another jQuery object in order to filter your selection down. Be sure to pay attention and refer to the API docs to know what all variation of arguments you have available.


### Parents

There are four methods for finding the parents from a selection: `$.fn.parent`, `$.fn.parents`, `$.fn.parentsUntil` and `$.fn.closest`. 

<div class="example" markdown="1">
Selecting an element's direct parent

	$('#myList').parent();
</div>
<div class="example" markdown="1">
Selecting all the parents of an element that match a given selector

	$('#myList').parents('div.section');
</div>
<div class="example" markdown="1">
Selecting all the parents of an element up to, but *not including* the selector

	var section = $('div.section');
	$('#myList').parentsUntil(section);
</div>
<div class="example" markdown="1">
Selecting the closest parent, note that only one parent will be selected.

	$('#myList').closest('#navigation');
</div>
### Children

There are only 2 methods for finding child elements from a selection: `$.fn.children` and `$.fn.find`. The difference between these methods lies in how far into the child structure the selection is made. `$.fn.children` only operates on direct child nodes, while `$.fn.find` can traverse recursively into children, and children of those children, etc.

<div class="example" markdown="1">
Selecting an element's direct children

	$('#myList').children('li');
</div>
<div class="example" markdown="1">
Finding all the links within a selection that match the selector

	$('#myList').find('a.external');
</div>

### Sibilings

The rest of the traversal methods within jQuery all deal with finding sibiling selections. There are a few basic methods as far as direction is concerned. You can find previous elements with `$.fn.prev`, next elements with `$.fn.next` and both with `$.fn.sibilings`. There are also a few other methods that build onto these methods, similar to how `$.fn.parentsUntil` works; `$.fn.nextAll`, `$.fn.nextUntil`, `$.fn.prevAll` and `$.fn.prevUntil`.

<div class="example" markdown="1">
Selecting an element's next sibiling that matches the given selector

	$('#myList').next('div.section');
</div>
<div class="example" markdown="1">
Selecting an element's previous sibiling that matches the given selector

	$('#myList').prev('div.section');
</div>
<div class="example" markdown="1">
Selecting an element's sibilings in both directions that matches the given selector

	$('#myList').sibilings('div.section');
</div>

You can see all these methods metioned and more at the docs [http://api.jquery.com/category/traversing/tree-traversal/](http://api.jquery.com/category/traversing/tree-traversal/ "Traversal documentation on api.jquery.com")

<div class="note" markdown="1">
### Note

Be cautious with traversing long distances in your documents — complex traversal makes it imperative that your document's structure remain the same, something that's difficult to guarantee even if you're the one creating the whole application from server to client. One- or two-step traversal is fine, but you generally want to avoid traversals that take you from one container to another.
</div>