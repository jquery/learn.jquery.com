---
title: Feature & Browser Detection
level: beginner
---

### Can I Use This Browser Feature?

There are a couple of common ways to check whether or not a particular feature is supported by a user's browser:

* Browser Detection
* Specific Feature Detection

In general, we recommend specific feature detection. Let's look at why.

### Browser Detection

Browser detection is a method where the browser's User Agent (UA) string is checked for a particular pattern unique to a browser family or version. For example, this is Chrome 18's UA string on Mac OS X Lion:

```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.142 Safari/535.19
```

Browser UA detection may check this string for something like "Chrome" or "Chrome/18" or any other part the developer feels identifies the browser they intend to target.

While this seems to be an easy solution, there are several problems:

#### Other browsers other than your target may have the same issue.

If we target a specific browser for different functionality, we implicitly exclude any browser we did not account for. This is also not future-proof. If the browser we target receives a bug fix or change, we may not be able to discern between a "working" and "non-working" UA string. We may also need to update our test for each new release. This isn't a maintainable solution.

#### User Agents are unreliable.

User Agents are set by the client browser. In the early days of the web, browsers would mimic each others' UA strings in order to bypass exactly this type of detection. It is still possible that a browser with very different capabilities may mimic just the portion of the UA string you're targeting.

The UA string is also user-configurable. While the user may change this string, the browser's feature support remains the same.

In general, we do not recommend UA string-based feature detection.

### Specific Feature Detection

Specific feature detection checks if a specific feature is available, instead of developing against a specific browser. This way, developers can write their code for two cases: the browser **does** support said feature, or the browser **does not** support said feature.

Developing against specific features, instead of developing against a specific browser, not only clears up the peripheral logic of your application, but also makes your job easier as a developer.

We recommend specific feature detection over UA string detection.

Now how would you go about doing that?

### How to go about feature detection

There are several ways to go about feature detection:

* Straight JavaScript
* `$.support`
* A Helper Library

#### Straight JavaScript

Let's take a look at how to check whether or not a `<canvas>` element exists in a specific browser, without using a helper library. We do this by specifically querying whether the method or property exists:

```
// We want to show a graph in browsers that support canvas,
// but a data table in browsers that don't.
var elem = document.createElement( "canvas" );

if ( elem.getContext && elem.getContext( "2d" ) ) {
	showGraph();
} else {
	showTable();
}
```

This is a very simple way to provide conditional experiences, depending on the features present in the user's browser. We can extract this into a helper function for reuse, but still have to write a test for every feature we're concerned about. This can be time-consuming and error-prone.

What if someone else wrote all of that for us?

#### $.support

jQuery performs many tests to determine feature support to allow cross-browser use of many of the features we've come to love. jQuery's internal feature detection can be accessed through [jQuery.support](http://api.jquery.com/jQuery.support/).

However, we do not recommend this for general use. As the API page says:

> Since jQuery requires these tests internally, they must be performed on every page load. Although some of these properties are documented below, they are not subject to a long deprecation/removal cycle and may be removed once internal jQuery code no longer needs them.

This detection may be removed from jQuery without notice. That's reason enough not to use it. What other options do we have?

#### A Helper Library

Thankfully, there are some great helper libraries (like [Modernizr](http://modernizr.com)) that provide a simple, high-level API for determining if a browser has a specific feature available or not.

For example, utilizing Modernizr, we are able to do the same canvas detection test with this code:

```
if ( Modernizr.canvas ) {
	showGraphWithCanvas();
} else {
	showTable();
}
```

That's it. Easy.

### Performance Considerations

So, while the Modernizr syntax is great, it can end up being quite cumbersome to have several conditionals. Secondly, we're sending the code for both conditions to every browser, regardless if we'll need it or not.

The `Modernizr` object exposes a `load()` method that many prefer over the syntax mentioned previously. This is due to another library that Modernizr now uses internally: [yepnope](http://yepnopejs.com/). Testing for canvas can now become something like this:

```
Modernizr.load({
	test: Modernizr.canvas,
	yep: "canvas.js",
	nope: "canvas-polyfill.js"
});
```

Using the `load` method allows us to send only the required polyfills and code over the wire. You can also pass an array of objects as an argument to `.load()`, and it will serve the correct files to the correct audience.

Additionally, Modernizr has a [production build configurator](http://modernizr.com/download/) that allows you to specify exactly what parts of Modernizr you want to include and exclude the parts you don't.

### Other Resources

#### Feature Detection Tools

- [modernizr](http://modernizr.com/) — Conditionally check to see if a specific feature is available in a browser.
- [html5please](http://html5please.com/) — Use the new and shiny responsibly.
- [html5please api](http://api.html5please.com/) — An API you can query to see how good (or bad) support for a specific feature is.
- [caniuse](http://caniuse.com/) — Browser compatibility tables for HTML5, CSS3, SVG, etc.
- [yepnope](http://yepnopejs.com/) — Conditional polyfill loader.

#### Helpful Articles

- [Browser Feature Detection](https://developer.mozilla.org/en-US/docs/Browser_Feature_Detection)
- [Using Modernizr to detect HTML5 and CSS3 browser support](http://www.adobe.com/devnet/dreamweaver/articles/using-modernizr.html)
- [polyfilling the html5 gap](http://addyosmani.com/polyfillthehtml5gaps/slides/#1) by Addy Osmani
- [Feature, Browser, and Form Factor Detection: It's Good for the Environment](http://www.html5rocks.com/en/tutorials/detection/index.html) by Michael Mahemoff
