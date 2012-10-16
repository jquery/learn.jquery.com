---
title   : $(document).ready()
level: beginner
---
You cannot safely manipulate a page until the document is “ready.” 
jQuery detects this state of readiness for you; code included inside 
`$(document).ready()` will only run once the page DOM (Document Object Model) is ready for JavaScript code to execute 
whereas `$(window).load(function () {})` will run once the entire page (images or iframe) not just the DOM is ready.

``` js
// A $(document).ready() block
$(document).ready(function() {
  console.log('ready!');
});
```

There is a shorthand for `$(document).ready()` that you will sometimes see; however, 
I recommend against using it if you are writing code that people who aren't experienced 
with jQuery may see.

``` js
// Shorthand for $(document).ready()
$(function() {
  console.log('ready!');
});
```

You can also pass a named function to `$(document).ready()` instead of passing an anonymous function.

``` js
// Passing a named function instead of an anonymous function

function readyFn( jQuery ) {
  // code to run when the document is ready
}

$(document).ready(readyFn);

// OR 

$(window).load(readyFn);
```

Let's take a look at how both the events act. The below example tries to load some website url in an iframe and checks for both the events. 
``` html
<html>
  <head>
    <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
            <script>
                    $(document).ready(function () {
                            console.log('document loaded');
                    });
                    
                    $(window).load(function () {
                            console.log('window loaded');
                    });	
            </script>
    </head>
    <body>
            <iframe src='http://techcrunch.com'></iframe>
    </body>
</html>
```
