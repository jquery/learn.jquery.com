---
title   : $ vs $()
attribution:  jQuery Fundamentals
level: beginner
---
Until now, we’ve been dealing entirely with methods that are called on a jQuery
object. For example:

```
$('h1').remove();
```

Most jQuery methods are called on jQuery objects as shown above; these methods
are said to be part of the `$.fn` namespace, or the “jQuery prototype,” and are
best thought of as jQuery object methods.

However, there are several methods that do not act on a selection; these
methods are said to be part of the jQuery namespace, and are best thought of as
core jQuery methods.

This distinction can be incredibly confusing to new jQuery users. Here’s what
you need to remember:

*	Methods called on jQuery selections are in the `$.fn` namespace, and
  automatically receive and return the selection as this.
*	Methods in the $ namespace are generally utility-type methods, and do not
  work with selections; they are not automatically passed any arguments, and
  their return value will vary.

There are a few cases where object methods and core methods have the same
names, such as `$.each` and `$.fn.each`. In these cases, be extremely careful
when reading the documentation that you are exploring the correct method.
