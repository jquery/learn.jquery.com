---
title:        Cache Length During Loops
level:        intermediate
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

In a for loop, don't access the length property of an array every time; cache
it beforehand.

Don't do this
```
for ( var i = 0; i < myArray.length; i++ ) {

 // do stuff
}
```
Do this 
```
var myLength = myArray.length;

for ( var i = 0; i < myLength; i++ ) {

  // do stuff

}
```
