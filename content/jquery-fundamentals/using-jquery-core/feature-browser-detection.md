---
chapter : jquery-core
section : 5
title   : Feature &amp; Browser Detection
attribution:  jQuery Fundamentals
---
## Feature &amp; Browser Detection

Although jQuery eliminates most JavaScript browser quirks, there are still
occasions when your code needs to know about the browser environment.

jQuery offers the `$.support` object, as well as the deprecated $.browser
object, for this purpose.  For complete documentation on these objects, visit
[http://api.jquery.com/jQuery.support/](http://api.jquery.com/jQuery.support/
"$.support documentation on api.jquery.com") and
[http://api.jquery.com/jQuery.browser/](http://api.jquery.com/jQuery.browser/
"$.browser support on api.jquery.com").

The `$.support` object is dedicated to determining what features a browser
supports; it is recommended as a more “future-proof” method of customizing your
JavaScript for different browser environments.

The `$.browser` object was deprecated in favor of the `$.support` object, but
it will not be removed from jQuery anytime soon. It provides direct detection
of the browser brand and version.
