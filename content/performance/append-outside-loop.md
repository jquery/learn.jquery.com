---
chapter :     performance
section:      0
title:        Cache Length During Loops
attribution:  jQuery Fundamentals
tags:         performance
---

Touching the DOM comes at a cost; if you're adding a lot of elements to the
DOM, do it all at once, not one at a time.

    // this is bad
    $.each(myArray, function(i, item) {
      var newListItem = '<li>' + item + '</li>';
      $('#ballers').append(newListItem);
    });

    // better: do this
    var frag = document.createDocumentFragment();

    $.each(myArray, function(i, item) {
      var newListItem = '<li>' + item + '</li>';
      frag.appendChild(newListItem);
    });
    $('#ballers')[0].appendChild(frag);

    // or do this
    var myHtml = '';

    $.each(myArray, function(i, item) {
      html += '<li>' + item + '</li>';
    });
    $('#ballers').html(myHtml);

