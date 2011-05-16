---
title:        A Plugin Development Pattern
attribution:  Mike Alsup 
status:       needswork
editrequired: 2
source:       http://www.learningjquery.com/2007/10/a-plugin-development-pattern
---

I've been developing jQuery plugins for quite a while now, and I've become rather comfortable with a particular style of plugin development for my scripts. This article is meant to share the pattern that I've found especially useful for plugin authoring. It assumes you already have an understanding of plugin development for jQuery; if you're a novice plugin author, please review the [jQuery Authoring Guidelines](http://docs.jquery.com/Plugins/Authoring) first.

There are a few requirements that I feel this pattern handles nicely:

- Claim only a single name in the jQuery namespace
- Accept an options argument to control plugin behavior
- Provide public access to default plugin settings
- Provide public access to secondary functions (as applicable)
- Keep private functions private
- Support the Metadata Plugin

I'll cover these requirements one by one, and as we work through them we'll build a simple plugin which highlights text.

###Claim only a single name in the jQuery namespace

This implies a single-plugin script. If your script contains multiple plugins, or complementary plugins (like $.fn.doSomething() and $.fn.undoSomething()) then you'll claim multiple names are required. But in general when authoring a plugin, strive to use only a single name to hold all of its implementation details.

In our example plugin we will claim the name "hilight".

<div class="example" markdown="1">
    // plugin definition
    $.fn.hilight = function() {
      // Our plugin implementation code goes here.
    };
</div>

And our plugin can be invoked like this:

<div class="example" markdown="1">
    $('#myDiv').hilight();
</div>

But what if we need to break up our implementation into more than one function? There are many reasons to do so: the design may require it; it may result in a simpler or more readable implementation; and it may yield better OO semantics.

It's really quite trivial to break up the implementation into multiple functions without adding noise to the namespace. We do this by recognizing, and taking advantage of, the fact that functions are first-class objects in JavaScript. Like any other object, functions can be assigned properties. Since we have already claimed the "hilight" name in the jQuery prototype object, any other properties or functions that we need to expose can be declared as properties on our "hilight" function. More on this later.

###Accept an options argument to control plugin behavior

Let's add support to our hilight plugin for specifying the foreground and background colors to use. We should allow options like these to be passed as an options object to the plugin function. For example:

<div class="example" markdown="1">
    // plugin definition
    $.fn.hilight = function(options) {
      var defaults = {
        foreground: 'red',
        background: 'yellow'
      };
      // Extend our default options with those provided.
      var opts = $.extend(defaults, options);
      // Our plugin implementation code goes here.
    };
</div>

Now our plugin can be invoked like this:

<div class="example" markdown="1">
    $('#myDiv').hilight({
      foreground: 'blue'
    });
</div>

###Provide public access to default plugin settings

An improvement we can, and should, make to the code above is to expose the default plugin settings. This is important because it makes it very easy for plugin users to override/customize the plugin with minimal code. And this is where we begin to take advantage of the function object.

<div class="example" markdown="1">
    // plugin definition
    $.fn.hilight = function(options) {
      // Extend our default options with those provided.
      // Note that the first arg to extend is an empty object -
      // this is to keep from overriding our "defaults" object.
      var opts = $.extend({}, $.fn.hilight.defaults, options);
      // Our plugin implementation code goes here.
    };
    // plugin defaults - added as a property on our plugin function
    $.fn.hilight.defaults = {
      foreground: 'red',
      background: 'yellow'
    };
</div>

Now users can include a line like this in their scripts:

<div class="example" markdown="1">
    // this need only be called once and does not
    // have to be called from within a 'ready' block
    $.fn.hilight.defaults.foreground = 'blue';
</div>

And now we can call the plugin method like this and it will use a blue foreground color:

<div class="example" markdown="1">
    $('#myDiv').hilight();
</div>

As you can see, we've allowed the user to write a single line of code to alter the default foreground color of the plugin. And users can still selectively override this new default value when they want:

<div class="example" markdown="1">
    // override plugin default foreground color
    $.fn.hilight.defaults.foreground = 'blue';
    // ...
    // invoke plugin using new defaults
    $('.hilightDiv').hilight();
    // ...
    // override default by passing options to plugin method
    $('#green').hilight({
      foreground: 'green'
    });
</div>

###Provide public access to secondary functions as applicable

This item goes hand-in-hand with the previous item and is an interesting way to extend your plugin (and to let others extend your plugin). For example, the implementation of our plugin may define a function called "format" which formats the hilight text. Our plugin may now look like this, with the default implementation of the format method defined below the hilight function.

<div class="example" markdown="1">
    // plugin definition
    $.fn.hilight = function(options) {
      // iterate and reformat each matched element
      return this.each(function() {
        var $this = $(this);
        // ...
        var markup = $this.html();
        // call our format function
        markup = $.fn.hilight.format(markup);
        $this.html(markup);
      });
    };
    // define our format function
    $.fn.hilight.format = function(txt) {'
     return '<strong>' + txt + '</strong>';
    };
</div>

We could have just as easily supported another property on the options object that allowed a callback function to be provided to override the default formatting. That's another excellent way to support customization of your plugin. The technique shown here takes this a step further by actually exposing the format function so that it can be redefined. With this technique it would be possible for others to ship their own custom overrides of your plugin נin other words, it means others can write plugins for your plugin.

Considering the trivial example plugin we're building in this article, you may be wondering when this would ever be useful. One real-world example is the [Cycle Plugin](http://malsup.com/jquery/cycle/). The Cycle Plugin is a slideshow plugin which supports a number of built-in transition effects נscroll, slide, fade, etc. But realistically, there is no way to define every single type of effect that one might wish to apply to a slide transition. And that's where this type of extensibility is useful. The Cycle Plugin exposes a "transitions" object to which users can add their own custom transition definitions. It's defined in the plugin like this:

<div class="example" markdown="1">
    $.fn.cycle.transitions = {
     // ...
    };
</div>

This technique makes it possible for others to define and ship transition definitions that plug-in to the Cycle Plugin.

###Keep private functions private

The technique of exposing part of your plugin to be overridden can be very powerful. But you need to think carefully about what parts of your implementation to expose. Once it's exposed, you need to keep in mind that any changes to the calling arguments or semantics may break backward compatibility. As a general rule, if you're not sure whether to expose a particular function, then you probably shouldn't.

So how then do we define more functions without cluttering the namespace and without exposing the implementation? This is a job for closures. To demonstrate, we'll add another function to our plugin called "debug". The debug function will log the number of selected elements to the Firebug console. To create a closure, we wrap the entire plugin definition in a function (as detailed in the jQuery Authoring Guidelines).

<div class="example" markdown="1">
    // create closure
    (function($) {
      // plugin definition
      $.fn.hilight = function(options) {
        debug(this);
        // ...
      };
      // private function for debugging
      function debug($obj) {
        if (window.console && window.console.log)
          window.console.log('hilight selection count: ' + $obj.size());
      };
     //  ...
    // end of closure
    })(jQuery);
</div>

Our "debug" method cannot be accessed from outside of the closure and thus is private to our implementation.

###Support the Metadata Plugin

Depending on the type of plugin you're writing, adding support for the [Metadata Plugin](http://docs.jquery.com/Plugins/Metadata/metadata) can make it even more powerful. Personally, I love the Metadata Plugin because it lets you use unobtrusive markup to override plugin options (which is particularly useful when creating demos and examples). And supporting it is very simple!

Update: This bit was optimized per suggestion in the comments.

<div class="example" markdown="1">
    // plugin definition
    $.fn.hilight = function(options) {
      // ...
      // build main options before element iteration
      var opts = $.extend({}, $.fn.hilight.defaults, options);
      return this.each(function() {
        var $this = $(this);
        // build element specific options
        var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
        //...
</div>

This changed line does a couple of things:

    it tests to see if the Metadata Plugin is installed
    if it is installed, it extends our options object with the extracted metadata.

This line is added as the last argument to *jQuery.extend* so it will override any other option settings. Now we can drive behavior from the markup if we choose:

<div class="example" markdown="1">
<!--  markup  -->
&lt;div class="hilight { background: 'red', foreground: 'white' }"&gt;
  Have a nice day!
&lt;/div&gt;
&lt;div class="hilight { foreground: 'orange' }"&gt;
  Have a nice day!
&lt;/div&gt;
&lt;div class="hilight { background: 'green' }"&gt;
  Have a nice day!
&lt;/div&gt;
</div>

And now we can hilight each of these divs uniquely using a single line of script:

<div class="example" markdown="1">
    $('.hilight').hilight();
</div>

###Putting it All Together

Below is the completed code for our example:

<div class="example" markdown="1">
    //
    // create closure
    //
    (function($) {
      //
      // plugin definition
      //
      $.fn.hilight = function(options) {
        debug(this);
        // build main options before element iteration
        var opts = $.extend({}, $.fn.hilight.defaults, options);
        // iterate and reformat each matched element
        return this.each(function() {
          $this = $(this);
          // build element specific options
          var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
          // update element styles
          $this.css({
            backgroundColor: o.background,
            color: o.foreground
          });
          var markup = $this.html();
          // call our format function
          markup = $.fn.hilight.format(markup);
          $this.html(markup);
        });
      };
      //
      // private function for debugging
      //
      function debug($obj) {
        if (window.console && window.console.log)
          window.console.log('hilight selection count: ' + $obj.size());
      };
      //
      // define and expose our format function
      //
      $.fn.hilight.format = function(txt) {
        return '&lt;strong&gt;' + txt + '&lt;/strong&gt;';
      };
      //
      // plugin defaults
      //
      $.fn.hilight.defaults = {
        foreground: 'red',
        background: 'yellow'
      };
    //
    // end of closure
    //
    })(jQuery);
</div>

This design pattern has enabled me to create powerful, consistently crafted plugins. I hope it helps you to do the same.