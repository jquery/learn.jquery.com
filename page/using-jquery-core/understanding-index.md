---
title   : Using jQuery's .index() Function
level: intermediate
attribution:
  - John Paul <john@johnkpaul.com>
---
`.index()` is a method on jQuery objects that's generally used to search for a given element within the jQuery object that it's called on. This method has four different signatures with different semantics that can be confusing. This article covers details about how to understand the way `.index()` works with each signature.

## `.index()` with No Arguments

```
<ul>
<div></div>
<li id="foo1">foo</li>
<li id="bar1">bar</li>
<li id="baz1">baz</li>
<div></div>
</ul>
```

```
var $foo = $("#foo1");

console.log( "Index: " + $foo.index() ); // 1

var $listItem = $("li");

// this implicitly calls .last()
console.log( "Index: " + $listItem.index() ); // 3
console.log( "Index: " + $listItem.last().index() ); // 3

var $div = $("div");

// this implicitly calls .last()
console.log( "Index: " + $div.index() ); // 4
console.log( "Index: " + $div.last().index() ); // 4
```
In the first example, `.index()` gives the zero-based index of `#foo1` within its parent. Since `#foo1` is the second child of its parent, `index()` returns 1.

Potential confusion comes from the other examples of `.index()` in the above code.  When `.index()` is called on a jQuery object that contains more than one element, it does not calculate the index of the first element as might be expected, but instead calculates the index of the last element. This is equivalent to always calling `$jqObject.last().index();`.

## `.index()` with a String Argument

```
<ul>
<div class="test"></div>
<li id="foo1">foo</li>
<li id="bar1" class="test">bar</li>
<li id="baz1">baz</li>
<div class="test"></div>
</ul>
<div id="last"></div>
```

```
var $foo = $("li");

// this implicitly calls .first()
console.log( "Index: " + $foo.index("li") ); // 0
console.log( "Index: " + $foo.first().index("li") ); // 0

var $baz = $("#baz1");
console.log( "Index: " + $baz.index("li")); // 2

var $listItem = $("#bar1");
console.log( "Index: " + $listItem.index(".test") ); // 1

var $div = $("#last");
console.log( "Index: " + $div.index("div") ); // 2
```

When `.index()` is called with a string argument, there are two things to consider. First, jQuery will implicitly call `.first()` on the original jQuery object. It will be find the index of the first element, not the last element in this case. This is inconsistent, so be careful here.

The second point to consider is that jQuery is querying the entire DOM using the passed in string selector and checking the index within that newly queried jQuery object. For example, when using `.index("div")` in the last example above, jQuery is selecting all of the `<divs>` in the document, then searching for the index that contains the first element in the jQuery object `.index()` is called on.

## `.index()` with a jQuery Object Argument

```
<ul>
<div class="test"></div>
<li id="foo1">foo</li>
<li id="bar1" class="test">bar</li>
<li id="baz1">baz</li>
<div class="test"></div>
</ul>
<div id="last"></div>
```

```
var $foo = $("li");
var $baz = $("#baz1");

console.log( "Index: " + $foo.index( $baz ) ); // 2

var $tests = $(".test");
var $bar = $("#bar1");

// implicitly calls .first() on the argument
console.log( "Index: " + $tests.index( $bar ) ); // 1

console.log( "Index: " + $tests.index( $bar.first() ) ); // 1
```

In this case, the first element of the jQuery object that is passed into `.index()` is being checked against all of the elements in the original jQuery object.  The original jQuery object, on the left side of `.index()`, is array-like and is searched from index 0 through `length - 1` for the first element of the argument jQuery object.

## `.index()` with a DOM Element Argument

In this case, the DOM element that's passed into `.index()` is being checked against all of the elements in the original jQuery object. Once all other cases are understood, this should be the simplest case. It is very similar to the previous case, except since the DOM element is passed directly, it is not taken from a jQuery object container.
