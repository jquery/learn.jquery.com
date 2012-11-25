---
title:        Enabling the back-button
level:        beginner
source:       http://jqueryfordesigners.com/enabling-the-back-button/
---

##The Problem

Using something like Remy Sharp's jQuery tabs solution, we have a tabbing system that you can click the tabs and different content loads. However, when I hit the back or forward buttons, the web page navigates completely away from the site.

We want to fix this, so that I can navigate the tabs using the browsers native back and forward buttons.

##“Cowboy” Ben Alman’s BBQ

Ben wrote a jQuery plugin called [BBQ](http://benalman.com/projects/jquery-bbq-plugin/). I knew this was supposed to add support for the back button (BBQ standing for Back Button & Query), so I would rework the existing tab demo to make use of this plugin.

Now, in retrospect, I think that I only need Ben’s hashchange plugin as that’s all I ended up using but none the less, they’re both worth checking out.

Now armed with Ben’s plugin, we’re going to refactor the tab code so that the back button works.

##Solution

The way the existing tabs work is as follows:

- Collect all the tab panels using $("div.tabs > div") and initialise to show the first tab1
- Listen for clicks on the links that form the actual tabs
- When a tab is clicked, hide all the tab panels, filter down to the one we wanted to see and show it, then update the classes on the tabs so the current link appears to be focused
- Finally, initialise by finding the first tab and triggering a click

Actually, you don’t need the subsequent lines after the hide: .filter(':first').show() as the triggerhashchange will handle that for us, but I’ve left it in place.

This process was our original code, and most of it needs to stay in place. The change in approach is this: instead of listening for clicks on the tabs, we listen for when the URL in the browser changes.

So we listen for the hashchange event, just like we might listen for a click event:

```
$( window ).bind("hashchange", function() {

  //do some magic

});
```

Now we move all of the original code from the click handler in to this new event listener. I’ve copied this code in, and marked in bold which lines we’ll need to change:

```
$( window ).bind( "hashchange", function() {

  tabContainers.hide();

  tabContainers.filter( this.hash ).show();

$("div.tabs ul.tabNavigation a").removeClass("selected");

  $( this ).addClass("selected");

  return false;

});
```

At this point all the references to this need to change, because in our original version this referred to the link that had be clicked. Now we need to determine the link based on the window URL. We can get the newly navigated URL using window.location. This is an object that represents part of the URL, and as such, gives as just the hash by itself:window.location.hash. This is good.

So this is used twice in the code above, once to find the tab panel that we want to show using this.hash. This first one is easy to change. Since the link has been clicked, the address has changed to match the hash of that link, i.e. we clicked on &lt;a href="#one"&gt;first&lt;/a&gt; so the URL is bbq.html#one. Instead of using this.hash we can use thewindow.location.hash instead - they’ll match exactly.

Next we need to address how we can target the appropriate tab to add the selected class.

Since we don’t have this to target the right tab, we need to find the element using jQuery. Since we have the hash, we can use this to find the tab link. We can use the “hash” attribute selector like this:

```
$("a[hash = #first]")
```

Therefore we can substitute our hash variable in to the ‘#first’ part of the selector above, and now we’ll have the right element to add the selected class.

Finally in this code, we just have to remove the return false as it’s not required at all.

Then one last change to make to our code - we need to trigger the hashchange event, which will cause our code to run.

###jQuery

Our final code looks like this:

```
$(function() {

  var tabContainers = $("div.tabs > div");

  tabContainers.hide().filter(":first").show();

  $( window ).bind( "hashchange", function() {

    var hash = window.location.hash || "#first";

    tabContainers.hide();

    tabContainers.filter( hash ).show();

    $("div.tabs ul.tabNavigation a").removeClass("selected");

    $( "a[hash = " + hash + "]" ).addClass("selected");

  });

  $( window ).trigger("hashchange");

});
```

Once last note: if we trigger the hashchange event, and there’s no hash on the URL, then we need to give it a default. In this case I’ve given it #first as a default so that it always lands on the first tab if there’s nothing pre-selected.
