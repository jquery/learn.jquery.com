### What is feature detection?

Feature detection is the concept of detecting if a specific feature is available, instead of developing against a specific browser. This way, developers can write their code for two cases: the browser **does** support said feature, or the browser **does not** support said feature.

Developing against specific features, instead of developing against a specific browser, not only clears up the peripheral logic of your application, but also makes your job easier as a developer, for several reasons.

### User-agent testing

Without getting into too many specifics, there are two reasons why User-Agent testing (developing against a specific browser) is looked down upon, instead of checking to see if a specific feature is supported: they are inconvenient and unreliable.

First, let's take a look at a User-Agent string (you can see yours by running `navigator.userAgent` in a JavaScript console). This is Chrome 18's User-Agent string on Mac OS X Lion:

	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.142 Safari/535.19

I think it goes without saying that User-Agent strings don't look very easy to work with. On top of that, if we were to use the User-Agent as the base case for our code, we would most likely have to double-check the functionality, or refactor our code when there was a browser update or a new browser. This is especially true now that Chrome and Firefox have a rapid release schedule.

The second (and more important) reason we recommend you not to use User-Agent testing is becuase it can be easily modified by the client, and it is **not very reliable at all**. This unreliability is due to historical reasons: as more early browsers were created, their authors would dishonestly identify their new browser by returning an incorrect User-Agent string when executing `navigator.userAgent`. It's also user-configurable, so we really cannot trust this.

### How to go about feature detection

There are several ways to go about feature detection. Let's take a look at how to check whether or not a `<canvas>` element exists in a specific browser, without using a helper library:


```js
// code taken from Michael Mahemoff's article on feature detection
// on HTML5Rocks: http://www.html5rocks.com/en/tutorials/detection/index.html

// we can create this helper to detect whether the <canvas> tag is available or not

function hasCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
};

// now we can use that knowledge within our application

hasCanvas() ? showGraphWithCanvas() : showTable();
```

Now, let's walk through this chunk of code piece by piece.

```js
function hasCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
 };
```

Here, we're creating a helper called `detectCanvas` that returns `true` or `false`, depending if the browser is able to perform a `getContext` on a `canvas` we create. This second line is imperative, because browsers let us create DOM elements it doesn't quite recognize. It's our job to make sure it knows what to do with them, and that's why we use the `getContext` method on the canvas to return true or false.

```js
hasCanvas() ? showGraphWithCanvas() : showTable();
```

This line of code will execute the function `detectCanvas`, and depending on if that returns a `true` or `false`, it will execute `showGraphWithCanvas` and `showTable`, respectively.

As you can tell, this is a very simple way to provide conditional experiences, depending on the features present in the user's browser.

While writing our own feature detection tests is great, it can be time consuming and error prone. Thankfully, there are some great helper libraries (like [Modernizr](http://modernizr.com)) that provide a simple, high-level API for determining if a browser has a specific feature available or not.

For example, utilizing Modernizr, we are able to do the same canvas detection test with this line of code:

```js
Modernizr.canvas ? showGraphWithCanvas() : showTable();
```

So, while that syntax is great, there are a few problems with this approach. First, it can end up being quite cumbersome to have several conditionals. Secondly, we're sending extra data over, regardless if we'll need it or not.

The Modernizr object exposes a `load()` method that many prefer over the syntax mentioned previously. This is due to the awesomeness of [yepnope](http://yepnopejs.com/), and actually utilizes yepnope internally. Testing for canvas now becomes something like this:

```js
Modernizr.load({
  test: Modernizr.canvas,
  yep : 'canvas.js',
  nope: 'canvas-polyfill.js'
});
```

Using the `load` method allows us to send only the required polyfills and code over the wire. I think it is extremely useful because developers can pass an array of objects as an argument to `.load()`, and it will serve the correct files to the correct audience.

### Tools commonly used to aid in feature detection

Below is a list of commonly used tools that aid in the feature detection process.

- [modernizr](http://modernizr.com/) - conditionally check to see if a specific feature is available in a browser
- [yepnope](http://yepnopejs.com/) - conditional polyfill loader
- [html5please](http://html5please.com/) - use the new and shiny responsibly
- [html5please api](http://api.html5please.com/) - an API you can query to see how good (or bad) support for a specific feature is.
- [caniuse](http://caniuse.com/) - browser compatibility tables for HTML5, CSS3, SVG, etc…

### Feature detection & jQuery

jQuery exposes two objects that help developers know about the user's environment (although one has been deprecated): `$.support` and `$.browser` (which has been deprecated). Many developers mistakenly believe using `$.support` is sufficient for detecting the support of a specific feature. Actually, jQuery uses `$.support` only for support tests **jQuery** needs to function properly (for example, the box model).

With that being said, it is recommended that you utilize a proven method of feature detection, such as [Modernizr](http://modernizr.com).

### Other resources to check out re: feature detection

- [polyfilling the html5 gap](http://addyosmani.com/polyfillthehtml5gaps/slides/#1) by Addy Osmani
- [feature, browser, and form factor detection](http://addyosmani.com/polyfillthehtml5gaps/slides/#1) by Michael Mahemoff
