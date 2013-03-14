---
title:        Don't Act on Absent Elements
level:        intermediate
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

jQuery won't tell you if you're trying to run a whole lot of code on an empty
selection — it will proceed as though nothing's wrong. It's up to you to verify
that your selection contains some elements.

```
// BAD: this runs three functions
// before it realizes there's nothing
// in the selection
$("#nosuchthing").slideUp();

// Better
var $mySelection = $("#nosuchthing");

if ( $mySelection.length ) {

  $mySelection.slideUp();

}

// BEST: add a doOnce plugin
jQuery.fn.doOnce = function( func ){

  this.length && func.apply( this );

  return this;

}

$("li.cartitems").doOnce(function() { 

  // make it ajax! \o/ 

});
```

This guidance is especially applicable for jQuery UI widgets, which have a lot
of overhead even when the selection doesn't contain elements.
