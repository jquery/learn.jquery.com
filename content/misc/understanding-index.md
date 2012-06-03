---
title   : using jQuery's index() function
github: johnkpaul
level: intermediate
attribution:  John K. Paul
---
## .index() 

<code>index()</code> is a method on jQuery objects that is generally used to search for a given element within the jQuery object that it is called on. This method has four different signatures with different semantics that can potentially cause confusion. This chapter will describe the details for how to understand how <code>.index()</code> works with each signature. 

### <code>index()</code> with no arguments

    <ul>
      <div></div>
      <li id="foo1">foo</li>
      <li id="bar1">bar</li>
      <li id="baz1">baz</li>
      <div></div>
    </ul>

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

[jsFiddle demo](http://jsfiddle.net/johnkpaul/SrHDh)

In the first example, <code>index()</code> gives the zero-based index of <code>#foo1</code> within it's parent. since <code>#foo1</code> is the second child of it's parent, <code>index()</code> returns 1. 

The first potential confusion comes from the other examples in this fiddle.  When <code>index()</code> is called on a jquery object that contains more than one element, it does not calculate the index of the first element, as I would have expected, but rather calculates the index of the last element. This is equivalent to always calling <code>$jqObject.last().index();</code>

### <code>index()</code> with a string argument

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

[jsFiddle demo](http://jsfiddle.net/johnkpaul/D29cZ/)

When <code>index()</code> is called with a string argument, there are two things to consider. The first is that jQuery will implicitly call <code>.first()</code> on the original jQuery object. It will be finding the index of the first element, not the last element in this case. This inconsistency always makes me stop and think, so be careful with this one. 

The second point is that jQuery is querying the entire dom using the passed in string selector and checking the index within that newly queried jQuery object. For example, when using <code>.index("div")</code> in the last example, jQuery is selecting all of the divs in the document, and then searching for the index that contains the first element in the jquery object that <code>.index()</code> is called on. 

### <code>index()</code> with a jQuery object argument

    <ul>
      <div class="test"></div>
      <li id="foo1">foo</li>
      <li id="bar1" class="test">bar</li>
      <li id="baz1">baz</li>
      <div class="test"></div>
    </ul>
    <div id="last"></div>

    var $foo = $('li');
    var $baz = $('#baz1');

    console.log('Index: ' + $foo.index($baz)); // 2

    var $tests = $(".test");
    var $bar = $("#bar1");

    // implicitly calls .first() on the argument
    console.log('Index: ' + $tests.index($bar)); // 1

    console.log('Index: ' + $tests.index($bar.first())); // 1

[jsFiddle demo](http://jsfiddle.net/johnkpaul/QZv7y/)


In this case, the first element of the jQuery object that is passed into <code>.index()</code> is being checked against all of the elements in the original jQuery object.  The original jQuery object, on the left side of <code>.index()</code>, is array-like and is searched from index 0 through <code>length - 1</code> for the first element of the argument jQuery object.

### <code>index()</code> with a DOM element argument

In this case, the DOM element that is passed into <code>.index()</code> is being checked against all of the elements in the original jQuery object. Once all of the other cases are understood, this should be the simplest case. It is very similar to the previous case, except since the DOM element is passed directly, it is not taken from a jQuery object container.
