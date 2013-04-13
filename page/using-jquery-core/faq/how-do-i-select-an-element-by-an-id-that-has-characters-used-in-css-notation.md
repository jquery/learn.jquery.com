---
title:        How do I select an element by an ID that has characters used in CSS notation?
source:       http://docs.jquery.com/Frequently_Asked_Questions
---

Because jQuery uses CSS syntax for selecting elements, some characters are interpreted as CSS notation. For example, ID attributes, after an initial letter (a-z or A-Z), may also use periods and colons, in addition to letters, numbers, hyphens, and underscores (see [W3C Basic HTML Data Types](http://www.w3.org/TR/html4/types.html#type-id)). The colon (":") and period (".") are problematic within the context of a jQuery selector because they indicate a pseudo-class and class, respectively.

In order to tell jQuery to treat these characters literally rather than as CSS notation, they must be "escaped" by placing two backslashes in front of them.

```
// Does not work:
$( "#some:id" )

// Works!
$( "#some\\:id" )

// Does not work:
$( "#some.id" )

// Works!
$( "#some\\.id" )
```

The following function takes care of escaping these characters and places a "#" at the beginning of the ID string:

```
function jq( myid ) {

	return "#" + myid.replace( /(:|\.|\[|\])/g, "\\$1" );

}
```

The function can be used like so:

```
$( jq( "some.id" ) )
```
