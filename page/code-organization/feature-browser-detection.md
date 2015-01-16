<script>{
	"title": "Feature & Browser Detection",
	"level": "beginner"
}</script>

### Can I Use This Browser Feature?

There are a couple of common ways to check whether or not a particular feature is supported by a user's browser:

* Browser Detection
* Specific Feature Detection

In general, we recommend specific feature detection. Let's look at why.

### Browser Detection

Browser detection is a method where the browser's User Agent (UA) string is checked for a particular pattern unique to a browser family or version. For example, this is Chrome 39's UA string on Mac OS X Yosemite:

```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36
```

Browser UA detection may check this string for something like "Chrome" or "Chrome/39" or any other part the developer feels identifies the browser they intend to target.

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

This is a very simple way to provide conditional experiences, depending on the features present in the user's browser. We can extract this into a helper function for reuse, but still have to write a test for every feature we're concerned about. This can be time-consuming and error-prone. Instead you might be interested in using a helper library.

#### A Helper Library

Thankfully, there are some great helper libraries (like [Modernizr](http://modernizr.com/)) that provide a simple, high-level API for determining if a browser has a specific feature available or not.

For example, utilizing Modernizr, we are able to do the same canvas detection test with this code:

```
if ( Modernizr.canvas ) {
	showGraphWithCanvas();
} else {
	showTable();
}
```

For more in-depth information on Modernizr, feel free to check out their [documentation](http://modernizr.com/docs/).

### Performance Considerations

So, while the Modernizr syntax is great, it can end up being quite cumbersome to have several conditionals. Secondly, we're sending the code for both conditions to every browser, regardless if we'll need it or not.

If you're using Modernizr, we highly encourage you to use the [build configurator](http://modernizr.com/download/), a tool that allows you to create custom builds of the library. You can exclude checks you don't need, which will save bytes and reduce the time it takes the page to load. Running every check that Modernizr can do, even when you don't need them, can slow down the page load.

### Other Resources

#### Feature Detection Tools

* [modernizr](http://modernizr.com/) — Conditionally check to see if a specific feature is available in a browser.
* [html5please](http://html5please.com/) — Use the new and shiny responsibly.
* [html5please API](http://api.html5please.com/) — An API you can query to see how good (or bad) support for a specific feature is.
* [caniuse](http://caniuse.com/) — Browser compatibility tables for HTML5, CSS3, SVG, etc.

#### Helpful Articles

* [Browser Feature Detection](https://developer.mozilla.org/en-US/docs/Browser_Feature_Detection)
* [Using Modernizr to detect HTML5 and CSS3 browser support](http://www.adobe.com/devnet/dreamweaver/articles/using-modernizr.html)
* [Polyfilling the HTML5 gaps](http://addyosmani.com/polyfillthehtml5gaps/slides/#1) by Addy Osmani
* [Feature, Browser, and Form Factor Detection: It's Good for the Environment](http://www.html5rocks.com/en/tutorials/detection/index.html) by Michael Mahemoff
