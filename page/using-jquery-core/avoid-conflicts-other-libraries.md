---
title   : Avoiding Conflicts with Other Libraries
level: beginner
source: http://jqfundamentals.com/legacy
attribution: 
  - jQuery Fundamentals
---
If you're using another JavaScript library that uses the `$` variable, you might run into conflicts with jQuery.  In order to avoid these conflicts, you need to put jQuery in no-conflict mode immediately after it is loaded onto the page and before you attempt to use jQuery in your page.

You have the option of assigning a variable name to replace `$` in no-conflict mode:

```
<!-- Putting jQuery into no-conflict mode -->
<script src="prototype.js"></script>
<script src="jquery.js"></script>
<script>

  var $j = jQuery.noConflict();

</script>
```

You can continue to use the standard `$` by wrapping your code in a self-executing anonymous function. This is a standard pattern for plugin authoring, where the author cannot know whether another library will have taken over the `$`. See the [Plugins](/plugins) section for more information about writing plugins.

```
<!-- Using the $ inside an immediately-invoked function expression -->
<script src="prototype.js"></script>
<script src="jquery.js"></script>
<script>

jQuery.noConflict();

(function($) {

   // your code here, using the $

})( jQuery );
</script>
```