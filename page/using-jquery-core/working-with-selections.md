---
title   : Working with Selections
level: beginner
---
Once you have a selection, you can call methods on the selection.
Methods generally come in two different flavors: getters and setters.
Getters return a property of the first selected element; setters set a property on all selected elements.

### Chaining

If you call a method on a selection and that method returns a jQuery object,
you can continue to call jQuery methods on the object without pausing for a semicolon.

```
// Chaining
$("#content").find("h3").eq( 2 ).html("new text for the third h3!");
```

If you are writing a chain that includes several steps, you (and the person who
comes after you) may find your code more readable if you break the chain over
several lines.

```
// Formatting chained code
$("#content")
  .find("h3")
  .eq( 2 )
  .html("new text for the third h3!");
```

If you change your selection in the midst of a chain, jQuery provides the
$.fn.end method to get you back to your original selection.

```
Restoring your original selection using $.fn.end
$("#content")
  .find("h3")
  .eq( 2 )
    .html("new text for the third h3!")
    .end() // restores the selection to all h3s in #content
  .eq( 0 )
    .html("new text for the first h3!");
```

<div class="note">
Chaining is extraordinarily powerful, and it's
a feature that many libraries have adapted since it was made popular by jQuery.
However, it must be used with care. Extensive chaining can make code extremely
difficult to modify or debug.  There is no hard-and-fast rule to how long a
chain should be — just know that it is easy to get carried away.
</div>

### Getters & Setters

jQuery “overloads” its methods, so the method used to set a value generally has the same name as the method used to get a value.
When a method is used to set a value, it is called a setter.
When a method is used to get (or read) a value, it is called a getter.
Setters affect all elements in a selection; getters get the requested value only for the first element in the selection.

```
//The $.fn.html method used as a setter
$("h1").html("hello world");
```

```
// The html method used as a getter
$("h1").html();
```

Setters return a jQuery object, allowing you to continue to call jQuery methods on your selection;
getters return whatever they were asked to get, meaning you cannot continue to call jQuery methods on the value returned by the getter.

```
// Attempting to call a jQuery method after calling a getter
// This will NOT work
$("h1").html().addClass("test")
```
