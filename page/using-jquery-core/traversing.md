<script>{
	"title": "Traversing",
	"level": "beginner"
}</script>

Once you've made an initial selection with jQuery, you can traverse deeper into what was just selected. Traversing can be broken down into three basic parts: parents, children, and siblings. jQuery has an abundance of easy-to-use methods for all these parts. Notice that each of these methods can optionally be passed string selectors, and some can also take another jQuery object in order to filter your selection down. Pay attention and refer to the [API documentation on traversing](http://api.jquery.com/category/traversing/) to know what variation of arguments you have available.

## Parents

The methods for finding the parents from a selection include `.parent()`, `.parents()`, `.parentsUntil()`, and `.closest()`.

```
<div class="grandparent">
	<div class="parent">
		<div class="child">
			<span class="subchild"></span>
		</div>
	</div>
	<div class="surrogateParent1"></div>
	<div class="surrogateParent2"></div>
</div>
```

```
// Selecting an element's direct parent:

// returns [ div.child ]
$( "span.subchild" ).parent();

// Selecting all the parents of an element that match a given selector:

// returns [ div.parent ]
$( "span.subchild" ).parents( "div.parent" );

// returns [ div.child, div.parent, div.grandparent ]
$( "span.subchild" ).parents();

// Selecting all the parents of an element up to, but *not including* the selector:

// returns [ div.child, div.parent ]
$( "span.subchild" ).parentsUntil( "div.grandparent" );

// Selecting the closest parent, note that only one parent will be selected
// and that the initial element itself is included in the search:

// returns [ div.child ]
$( "span.subchild" ).closest( "div" );

// returns [ div.child ] as the selector is also included in the search:
$( "div.child" ).closest( "div" );
```

## Children

The methods for finding child elements from a selection include `.children()` and `.find()`. The difference between these methods lies in how far into the child structure the selection is made. `.children()` only operates on direct child nodes, while `.find()` can traverse recursively into children, children of those children, and so on.

```
// Selecting an element's direct children:

// returns [ div.parent, div.surrogateParent1, div.surrogateParent2 ]
$( "div.grandparent" ).children( "div" );

// Finding all elements within a selection that match the selector:

// returns [ div.child, div.parent, div.surrogateParent1, div.surrogateParent2 ]
$( "div.grandparent" ).find( "div" );
```

## Siblings

The rest of the traversal methods within jQuery all deal with finding sibling selections. There are a few basic methods as far as the direction of traversal is concerned. You can find previous elements with `.prev()`, next elements with `.next()`, and both with `.siblings()`. There are also a few other methods that build onto these basic methods: `.nextAll()`, `.nextUntil()`, `.prevAll()` and `.prevUntil()`.

```
// Selecting a next sibling of the selectors:

// returns [ div.surrogateParent1 ]
$( "div.parent" ).next();

// Selecting a prev sibling of the selectors:

// returns [] as No sibling exists before div.parent
$( "div.parent" ).prev();

// Selecting all the next siblings of the selector:

// returns [ div.surrogateParent1, div.surrogateParent2 ]
$( "div.parent" ).nextAll();

// returns [ div.surrogateParent1 ]
$( "div.parent" ).nextAll().first();

// returns [ div.surrogateParent2 ]
$( "div.parent" ).nextAll().last();

// Selecting all the previous siblings of the selector:

// returns [ div.surrogateParent1, div.parent ]
$( "div.surrogateParent2" ).prevAll();

// returns [ div.surrogateParent1 ]
$( "div.surrogateParent2" ).prevAll().first();

// returns [ div.parent ]
$( "div.surrogateParent2" ).prevAll().last();
```

Use `.siblings()` to select all siblings:

```
// Selecting an element's siblings in both directions that matches the given selector:

// returns [ div.surrogateParent1, div.surrogateParent2 ]
$( "div.parent" ).siblings();

// returns [ div.parent, div.surrogateParent2 ]
$( "div.surrogateParent1" ).siblings();
```

See the complete documentation for these methods and more at [Traversal documentation on api.jquery.com](http://api.jquery.com/category/traversing/tree-traversal/).

Be cautious when traversing long distances in documents – complex traversal makes it imperative that the document's structure remain the same, which is difficult to guarantee even if you're the one creating the whole application from server to client. One- or two-step traversal is fine, but it's best to avoid traversals that go from one container to another.
