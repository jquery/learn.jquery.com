---
title:        Detach Elements to Work with Them
attribution:  jQuery Fundamentals
tags:         performance
---

The DOM is slow; you want to avoid manipulating it as much as possible. jQuery
introduced `$.fn.detach` in version 1.4 to help address this issue, allowing you
to remove an element from the DOM while you work with it.

<javascript>
var $table = $('#myTable');
var $parent = $table.parent();

$table.detach();
// ... add lots and lots of rows to table
$parent.append(table);
</javascript>
