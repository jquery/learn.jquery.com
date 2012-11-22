---
title   : Attributes
level   : beginner
---
An element's attributes can contain useful information for your application, so it's important to be able to get and set them.

## `$.fn.attr`

The `$.fn.attr` method acts as both a getter and a setter. As a setter, `$.fn.attr` can accept either a key and a value, or an object containing one or more key/value pairs.

`$.fn.attr` as a setter:

```
// Setting attributes
$("a").attr( "href", "allMyHrefsAreTheSameNow.html" );

$("a").attr({
  title: "all titles are the same too!",
  href: "somethingNew.html"
});
```

`$.fn.attr` as a getter:

```
// Getting attributes
$("a").attr("href");  // returns the href for the first a element in the document
```
