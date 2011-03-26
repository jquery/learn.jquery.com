---
chapter : jquery-core
section : 6
title   : Avoiding Conflicts with Other Libraries
attribution:  jQuery Fundamentals
---
## Avoiding Conflicts with Other Libraries

If you are using another JavaScript library that uses the `$` variable, you can
run into conflicts with jQuery.  In order to avoid these conflicts, you need to
put jQuery in no-conflict mode immediately after it is loaded onto the page and
before you attempt to use jQuery in your page.

When you put jQuery into no-conflict mode, you have the option of assigning a
variable name to replace `$`.

<div class="example" markdown="1">
Putting jQuery into no-conflict mode

    &lt;script src="prototype.js">&lt;/script>
    &lt;script src="jquery.js">&lt;/script>
    &lt;script>var $j = jQuery.noConflict();&lt;/script>
</div>

You can continue to use the standard $ by wrapping your code in a
self-executing anonymous function; this is a standard pattern for plugin
authoring, where the author cannot know whether another library will have taken
over the `$`.

<div class="example" markdown="1">
Using the $ inside a self-executing anonymous function

    &lt;script src="prototype.js">&lt;/script>
    &lt;script src="jquery.js">&lt;/script>
    &lt;script>
    jQuery.noConflict();

    (function($) {
       // your code here, using the $
    })(jQuery);
    &lt;/script>
</div>
