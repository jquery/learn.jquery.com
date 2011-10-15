---
chapter :     performance
section:      0
title:        Append Outside of Loops
attribution:  jQuery Fundamentals
tags:         performance
---

Touching the DOM comes at a cost; if you're appending a lot of elements to the
DOM, you will want to append them all at once, rather then one at a time. This is common problem when appending elements within a loop.

<div class="example" markdown="1">
    $.each(myArray, function(i, item) {
        var newListItem = '<li>' + item + '</li>';
        $('#ballers').append(newListItem);
    });
</div>

One common technique is to leverage a document fragment. During each iteration of the loop, you append the element to the fragment rather than the DOM element. After the loop, just append the fragment to the DOM element.

<div class="example" markdown="1">
    var frag = document.createDocumentFragment();

    $.each(myArray, function (i, item) {
        var newListItem = document.createElement("li");
        var itemText = document.createTextNode(item);
        newListItem.appendChild(itemText);
        frag.appendChild(newListItem);
    });

    $('#ballers')[0].appendChild(frag);
</div>

Another technique, which is quite simple, is to build up a string during each iteration of the loop. After the loop, just set the html of the DOM element to that string.

<div class="example" markdown="1">
    var myHtml = '';

    $.each(myArray, function(i, item) {
        myHtml += '<li>' + item + '</li>';
    });

    $('#ballers').html(myHtml);
</div>

There are of course other techniques you could certainly test out; a great way to test the performance of these is through a site called [jsperf](http://jsperf.com). This site allows you to benchmark each technique and visually see how it performs across all the browsers.

