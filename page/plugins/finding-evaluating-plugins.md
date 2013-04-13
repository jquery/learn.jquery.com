---
title   : Finding & Evaluating Plugins
level:        intermediate
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

One of the most celebrated aspects of jQuery is its extensive plugin ecosystem. From table sorting to form validation to autocompletion – if there's a need for it, chances are good that someone has written a plugin for it.

The quality of jQuery plugins varies widely. Many plugins are extensively tested and well-maintained, but others are hastily created and then ignored. More than a few fail to follow best practices. Some plugins, mainly [jQuery UI](http://jqueryui.com/), are maintained by the jQuery team. The quality of these plugins is as good as jQuery itself.

Google is your best initial resource for locating plugins, though the jQuery team is working on an improved plugin repository. Once you've identified some options via a Google search, you may want to consult the jQuery mailing list or the `#jquery` IRC channel to get input from others.

When looking for a plugin to fill a need, do your homework. Ensure that the plugin is well-documented, and look for the author to provide lots of examples of its use. Be wary of plugins that do far more than you need; they can end up adding substantial overhead to your page. For more tips on spotting a sub-par plugin, read [Signs of a poorly written jQuery plugin](http://remysharp.com/2010/06/03/signs-of-a-poorly-written-jquery-plugin/) by Remy Sharp.

Once you choose a plugin, you'll need to add it to your page. Download the plugin, unzip it if necessary, place it your application's directory structure, then include the plugin in your page using a script tag (after you include jQuery).
