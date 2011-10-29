---
chapter : "jqfundamentals"
section : "1"
title   : "$(document).ready()"
---
You cannot safely manipulate a page until the document is “ready.” 
jQuery detects this state of readiness for you; code included inside 
`$(document).ready()` will only run once the page is ready for JavaScript code to execute.

<javascript caption="A $(document).ready() block">
$(document).ready(function() {
  console.log('ready!');
});
</javascript>

There is a shorthand for `$(document).ready()` that you will sometimes see; however, 
I recommend against using it if you are writing code that people who aren't experienced 
with jQuery may see.

<javascript caption="Shorthand for $(document).ready()">
$(function() {
  console.log('ready!');
});
</javascript>

You can also pass a named function to `$(document).ready()` instead of passing an anonymous function.

<javascript caption="Passing a named function instead of an anonymous function">
function readyFn( jQuery ) {
  // code to run when the document is ready
}

$(document).ready(readyFn);
</javascript>
