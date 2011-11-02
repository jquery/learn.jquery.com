---
chapter : plugins
section : 3
title   : Finding & Evaluating Plugins
attribution:  jQuery Fundamentals
---
## Finding &amp; Evaluating Plugins

Plugins extend the basic jQuery functionality, and one of the most celebrated
aspects of the library is its extensive plugin ecosystem.  From table sorting
to form validation to autocompletion ... if there’s a need for it, chances are
good that someone has written a plugin for it.

The quality of jQuery plugins varies widely.  Many plugins are extensively
tested and well-maintained, but others are hastily created and then ignored.
More than a few fail to follow best practices.

Google is your best initial resource for locating plugins, though the jQuery
team is working on an improved plugin repository.  Once you’ve identified some
options via a Google search, you may want to consult the jQuery mailing list or
the `#jquery` IRC channel to get input from others.

When looking for a plugin to fill a need, do your homework.  Ensure that the
plugin is well-documented, and look for the author to provide lots of examples
of its use. Be wary of plugins that do far more than you need; they can end up
adding substantial overhead to your page.  For more tips on spotting a subpar
plugin, read [Signs of a poorly written jQuery
plugin](http://remysharp.com/2010/06/03/signs-of-a-poorly-written-jquery-plugin/)
by Remy Sharp.

Once you choose a plugin, you’ll need to add it to your page.  Download the
plugin, unzip it if necessary, place it your application’s directory structure,
then include the plugin in your page using a script tag (after you include
jQuery).
