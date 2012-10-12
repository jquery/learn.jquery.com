---
title   : Traversing
level: beginner
---
## Traversing

Once you have made an initial selection with jQuery, you may want to traverse
deeper into what was just selected. Traversing can be broken down into three
basic parts: parents, children and siblings. jQuery has an abundance of easy
to use methods for all these parts. You will notice that each of these methods
can optionaly be passed string selector and some can also take another jQuery
object in order to filter your selection down. Be sure to pay attention and
refer to the API docs to know what all variation of arguments you have
available.


### Parents

The methods for finding the parents from a selection: `$.fn.parent`, `$.fn.parents`, `$.fn.parentsUntil` and `$.fn.closest`. 

<javascript>

    <div class="grandparent">
      <div class="parent">
    		<div class="child">
    			<span class="subchild"></span>
    		</div>
    	</div>
      <div class="surrogateParent1"></div>
      <div class="surrogateParent2"></div>
    </div>
    
    //Selecting an element's direct parent    
    $('span.subchild').parent(); // returns [div.child] 
    
    //Selecting all the parents of an element that match a given selector
    $('span.subchild').parents('div.parent'); // returns [div.parent]
    $('span.subchild').parents();             // returns [div.child, div.parent, div.grandparent]
    
    //Selecting all the parents of an element up to, but *not including* the selector
    $("span.subchild").parentsUntil("div.grandparent"); // returns [div.child, div.parent]
    
    //Selecting the closest parent, note that only one parent will be selected 
    //and that the initial element itself is included in the search
    $('span.subchild').closest('div');  // returns [div.child]
    $('div.child').closest('div');      // returns [div.child] as the selector is also included in the search
  
</javascript>

### Children

The methods for finding child elements from a selection: `$.fn.children` and
`$.fn.find`. The difference between these methods lies in how far into the
child structure the selection is made. `$.fn.children` only operates on direct
child nodes, while `$.fn.find` can traverse recursively into children, and
children of those children, etc.

<javascript caption="Selecting an element's direct children">

    //Selecting an element's direct children
    $('div.grandparent').children('div'); // returns [div.parent, div.surrogateParent1, div.surrogateParent2]
    
    //Finding all elements within a selection that match the selector
    $('div.grandparent').find('div'); // returns [div.child, div.parent, div.surrogateParent1, div.surrogateParent2]
    
</javascript>

### Siblings

The rest of the traversal methods within jQuery all deal with finding sibling
selections. There are a few basic methods as far as direction is concerned. You
can find previous elements with `$.fn.prev`, next elements with `$.fn.next` and
both with `$.fn.siblings`. There are also a few other methods that build onto
these basic methods, similar to how `$.fn.parentsUntil` works; `$.fn.nextAll`,
`$.fn.nextUntil`, `$.fn.prevAll` and `$.fn.prevUntil`.

<javascript caption="Selecting an element's next sibling, filtering it by a selector">

    // Selecing a next sibling of the selectors
    $("div.parent").next(); // returns [div.surrogateParent1]
    
    // Selecing a prev sibling of the selectors
    $("div.parent").prev(); // returns [] as No sibling exists before div.parent
    
    //Selecting all the next siblings of the selector 
    $("div.parent").nextAll();          // returns [div.surrogateParent1, div.surrogateParent2]
    $("div.parent").nextAll().first();  // returns [div.surrogateParent1]
    $("div.parent").nextAll().last();   // returns [div.surrogateParent2]
    
    //Selecting all the prev siblings of the selector 
    $("div.pasurrogateParent2rent").prevAll();    // returns [div.surrogateParent1, div.parent]
    $("div.surrogateParent2").prevAll().first();  // returns [div.surrogateParent1]
    $("div.surrogateParent2").prevAll().last();   // returns [div.parent]
    
</javascript>

If you want to select all the siblings then `$.fn.siblings` comes handy. 

<javascript caption="Selecting an element's siblings in both directions that matches the given selector">
    
    $("div.parent").siblings();           // returns [div.surrogateParent1, div.surrogateParent2]
    $("div.surrogateParent1").siblings(); // returns [div.parent, div.surrogateParent2]
    
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
