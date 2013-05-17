---
title   : Attributes
level   : beginner
---
An element's attributes can contain useful information for your application, so it's important to be able to get and set them.

## `.attr()`

The `.attr()` method acts as both a getter and a setter. As a setter, `.attr()` can accept either a key and a value, or an object containing one or more key/value pairs.

`.attr()` as a setter:

```
// Setting attributes
$("a").attr( "href", "allMyHrefsAreTheSameNow.html" );

$("a").attr({
  title: "all titles are the same too!",
  href: "somethingNew.html"
});
```

`.attr()` as a getter:

```
// Getting attributes
$("a").attr("href");  // returns the href for the first a element in the document
```
