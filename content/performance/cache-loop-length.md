---
title:        Cache Length During Loops
attribution:  jQuery Fundamentals
tags:         performance
---

In a for loop, don't access the length property of an array every time; cache
it beforehand.
<javascript>
var myLength = myArray.length;

for (var i = 0; i < myLength; i++) {
  // do stuff
}
</javascript>
