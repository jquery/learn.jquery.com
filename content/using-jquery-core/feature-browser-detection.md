---
title   : Feature & Browser Detection
level: intermediate
attribution:  jQuery Fundamentals
---
## Feature & Browser Detection

Although jQuery eliminates most JavaScript browser quirks, there are still
occasions when your code needs to know about the browser environment.

jQuery offers two objects to help developers know about the user's resources (albeit one is deprecated): `$.support` and `$.browser` (deprecated). For complete documentation on these objects, visit
[$.support documentation on api.jquery.com](http://api.jquery.com/jQuery.support/) and
[$.browser support on api.jquery.com](http://api.jquery.com/jQuery.browser/).

### $.support

The `$.support` object is dedicated to determining what features a browser supports; it is recommended as a more “future-proof” method of customizing your JavaScript for different browser environments.

With that being said, please note that `$.support` **only contains support tests that jQuery needs to function properly**. We highly recommend that you utilize a great tool like [Modernizr](http://modernizr.com/) if you need to detect features outside of those that jQuery tests already.

### $.browser

The `$.browser` object was **deprecated** in favor of the `$.support` object, but it will not be removed from jQuery anytime soon. It provides direct detection
of the browser brand and version.

Again - please note that we recommend writing your code against features, not browsers. Think of the dozens of browsers (and their differing versions) that are in use: that means you'd have to craft your code around an extremely large amount of conditionals.

Thus, `$.support` or a feature detection tool like [Modernizr](http://modernizr.com) is recommended.

### Other feature detection resources

Here are some great resources for learning more about feature detection: 

- [HTML5 Rocks: Feature, Browser, and Form Factor Detection](http://www.html5rocks.com/en/tutorials/detection/index.html) is a great article by Michael Mahemoff on the pros and cons of Feature, Browser, and Form factor detection.
- [Mozilla Browser Feature Detection](https://developer.mozilla.org/en/Browser_Feature_Detection) is mostly a documentation resource on what to use when detecting features in browsers.
- [Boagworld: Explaining Modernizr](http://forum.boagworld.com/discussion/6656/modernizr-can-someone-explain-it-to-me) - a simple explanation of why Modernizr does what it does, and also how to use it.
- [Taking Advantage of HTML5 and CSS3 with Modernizr](http://www.alistapart.com/articles/taking-advantage-of-html5-and-css3-with-modernizr/) is an article by the project lead of Modernizr, Faruk Ateş, explaining how to get started using it.
