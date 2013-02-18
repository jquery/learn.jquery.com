---
title   : Properties
level   : beginner
---
An element's attributes can contain useful information for your application, so it's important to be able to get and set them.

## `$.fn.prop`

The `$.fn.prop` method acts as both a getter and a setter. As a setter, `$.fn.prop` can accept either a key and a value, or an object containing one or more key/value pairs.

`$.fn.prop` as a setter:

```
// Setting attributes
$("a").prop( "href", "allMyHrefsAreTheSameNow.html" );

$("a").prop({
  title: "all titles are the same too!",
  href: "somethingNew.html"
});
```

`$.fn.prop` as a getter:

```
// Getting attributes
$("a").prop("href");  // returns the href for the first a element in the document
```

`$.fn.attr` is similar `$.fn.prop` to but is rarely needed. The first is supposed to be used with the original (source code) attributes while the second manipulates the computed DOM tree properties.
