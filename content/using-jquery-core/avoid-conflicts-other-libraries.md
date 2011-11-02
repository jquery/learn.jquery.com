---
chapter : jquery-core
section : 6
title   : Avoiding Conflicts with Other Libraries
attribution:  jQuery Fundamentals
---
If you are using another JavaScript library that uses the `$` variable, you can
run into conflicts with jQuery.  In order to avoid these conflicts, you need to
put jQuery in no-conflict mode immediately after it is loaded onto the page and
before you attempt to use jQuery in your page.

When you put jQuery into no-conflict mode, you have the option of assigning a
variable name to replace `$`.

<markup caption="Putting jQuery into no-conflict mode">
    <script src="prototype.js"></script>
    <script src="jquery.js"></script>
    <script>var $j = jQuery.noConflict();</script>
</markup>

You can continue to use the standard $ by wrapping your code in a
self-executing anonymous function; this is a standard pattern for plugin
authoring, where the author cannot know whether another library will have taken
over the `$`.

<markup caption="Using the $ inside an immediately-invoked function expression">
<script src="prototype.js"></script>
<script src="jquery.js"></script>
<script>
jQuery.noConflict();

(function($) {
   // your code here, using the $
})(jQuery);
</script>
</markup>
