---
title   : using jQuery's index() function
level: intermediate
---
## .index() 

`index()` is a method on jQuery objects that is generally used to search for a given element within the jQuery object that it is called on. This method has four different signatures with different semantics that can potentially cause confusion. This chapter will describe the details for how to understand how `.index()` works with each signature. 

### `index()` with no arguments

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
var $foo = $('#foo1');
console.log('Index: ' + $foo.index()); // 1

var $listItem = $('li');
// this implicitly calls .last()
console.log('Index: ' + $listItem.index()); // 3
console.log('Index: ' + $listItem.last().index()); // 3

var $div = $('div');

// this implicitly calls .last()
console.log('Index: ' + $div.index());  // 4
console.log('Index: ' + $div.last().index()); // 4
```
[jsFiddle demo](http://jsfiddle.net/johnkpaul/SrHDh)

In the first example, `index()` gives the zero-based index of `#foo1` within it's parent. since `#foo1` is the second child of it's parent, `index()` returns 1. 

The first potential confusion comes from the other examples in this fiddle.  When `index()` is called on a jquery object that contains more than one element, it does not calculate the index of the first element, as I would have expected, but rather calculates the index of the last element. This is equivalent to always calling `$jqObject.last().index();`

### `index()` with a string argument

```
<ul>
<div class="test"></div>
<li id="foo1">foo</li>
<li id="bar1" class="test">bar</li>
<li id="baz1">baz</li>
<div class="test"></div>
</ul>
<div id="last"></div>

var $foo = $('li');

// this implicitly calls .first()
console.log('Index: ' + $foo.index("li")); // 0
console.log('Index: ' + $foo.first().index("li")); // 0

var $baz = $('#baz1');
console.log('Index: ' + $baz.index("li")); // 2

var $listItem = $('#bar1');
console.log('Index: ' + $listItem.index(".test")); // 1

var $div = $('#last');
console.log('Index: ' + $div.index("div")); // 2
```

[jsFiddle demo](http://jsfiddle.net/johnkpaul/D29cZ/)

When `index()` is called with a string argument, there are two things to consider. The first is that jQuery will implicitly call `.first()` on the original jQuery object. It will be finding the index of the first element, not the last element in this case. This inconsistency always makes me stop and think, so be careful with this one. 

The second point is that jQuery is querying the entire dom using the passed in string selector and checking the index within that newly queried jQuery object. For example, when using `.index("div")` in the last example, jQuery is selecting all of the divs in the document, and then searching for the index that contains the first element in the jquery object that `.index()` is called on. 

### `index()` with a jQuery object argument

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
var $foo = $('li');
var $baz = $('#baz1');

console.log('Index: ' + $foo.index($baz)); // 2

var $tests = $(".test");
var $bar = $("#bar1");

// implicitly calls .first() on the argument
console.log('Index: ' + $tests.index($bar)); // 1

console.log('Index: ' + $tests.index($bar.first())); // 1
```

[jsFiddle demo](http://jsfiddle.net/johnkpaul/QZv7y/)


In this case, the first element of the jQuery object that is passed into `.index()` is being checked against all of the elements in the original jQuery object.  The original jQuery object, on the left side of `.index()`, is array-like and is searched from index 0 through `length - 1` for the first element of the argument jQuery object.

### `index()` with a DOM element argument

In this case, the DOM element that is passed into `.index()` is being checked against all of the elements in the original jQuery object. Once all of the other cases are understood, this should be the simplest case. It is very similar to the previous case, except since the DOM element is passed directly, it is not taken from a jQuery object container.
