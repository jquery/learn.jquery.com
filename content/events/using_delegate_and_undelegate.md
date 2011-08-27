---
title:        Using Delegate and Undelegate in jQuery
attribution:  Jordan Boesch 
status:       needswork
editrequired: 2
source:       http://www.learningjquery.com/2010/03/using-delegate-and-undelegate-in-jquery-1-4-2
---

As some of you have heard, there have been two new methods added in jQuery 1.4.2, [.delegate()](http://api.jquery.com/delegate/) and [.undelegate()](http://api.jquery.com/undelegate/). These methods achieve the same thing as the [.live()](http://api.jquery.com/live/) and [.die()](http://api.jquery.com/die/) methods, they just use a different syntax. For those new to *.live()*, it's a method in jQuery that allows you to attach events to elements that appear in the document as well as elements that will appear in the future. An example would be if you attached a click event via *.live()*:

<div class="example" markdown="1">
    $('img.photo').live('click', function(){
      lightboxify(this);
    });
</div>

Then appended some photos via ajax later on:

<div class="example" markdown="1">
    // append an image
    $('body').append('<img src="face.jpg" alt="silly face" class="photo"/>');
</div>

The click event would still apply to that new image without having to re-bind the event. Handy, isn't it?

Not too long ago, the *.live()* method was brought up for discussion for a [few](http://forum.jquery.com/topic/jquery-live-jquery-fn-live-discussion) [reasons](http://paulirish.com/2010/on-jquery-live/). One problem discussed is that *.live()* fails when you try to use it alongside traversals like:

<div class="example" markdown="1">
    // FAILS
    $('ul').find('li').next().live('click', function(){});
    // FAILS
    $('ul').parent().nextAll().live('click', function(){});
</div>

and also when you pass any native DOM elements like:

<div class="example" markdown="1">
    // FAILS
    $(document.body).live('click', function(){});
</div>

Unfortunately, when you use *.live()*, it has to be at the top of the chain like so:

<div class="example" markdown="1">
    $('ul li').live('click', function(){})
</div>

Because this can be frustrating and confusing for many users who are used to the traversing and chainability that jQuery offers, it sparked a discussion about the syntax for *.live()*. Why does it look like all the other methods, yet does not behave the same? Since changing the syntax would result in a whirlwind of code breakage, the jQuery team decided to introduce *.delegate()* and *.undelegate()* to complement *.live()* and *.die()*. Here's an example of how you would normally use *.live()* and *.die()* and how you can now use *.delegate()* and *.undelegate()*:

Old way

<div class="example" markdown="1">
    // Using .live()
    $("table").each(function(){
      $("td", this).live("hover", function(){
        $(this).toggleClass("hover");
      });
    });
     
    // Using .die()
    $("table").each(function(){
      $("td", this).die("hover");
    });
</div>

New way

<div class="example" markdown="1">
    // Using .delegate()
    $("table").delegate("td", "hover", function(){
      $(this).toggleClass("hover");
    });
     
    // Using .undelegate()
    $("table").undelegate("td", "hover");
</div>

The benefit of *delegate()* is that it allows you to specify its context. This way, it ensures that we do not bubble all the way up the DOM tree to capture the target of the element. With the .live() method, it bubbles all the way up the DOM each time unless you set context like so: *$('td', $('table')[0]).live('hover', function(){})*. That just looks ugly.

Some often like to think of *delegate()* like a *bind()* call. The syntax is a little different as you can see below.

<div class="example" markdown="1">
    // .bind() way
    $('ul li').bind('click', function(e){
      // Do something with bind
    });
     
    // .delegate() way
    $('ul').delegate('li', 'click', function(e){
      // Do something with delegate
    });
</div>


In short, the difference between *.bind()* and *.delegate()* is that *.bind()* will only add events to the elements that are on the page when you call it. .delegate() is listening for new elements and then adding events to them when they appear on the page.
The gotchas of delegate

While it does behave like *.bind()*, it does not allow you to pass an object map of events like *.bind()* does. Take this *.bind()* method for example:

<div class="example" markdown="1">
    // This works wonderfully
    $('ul li').bind({
      click: function(e){
        // Something on click
      },
      mouseover: function(e){
        // Something on mouse over
      }
    });
</div>

An error will be thrown when you try to do:

<div class="example" markdown="1">
    // FAILS!
    $('ul').delegate('li', {
      click: function(e){
        // Something on click
      },
      mouseover: function(e){
        // Something on mouse over
      }
    });
</div>

I'm not sure the reasoning behind not implementing this, but I guess I'm not the only one pondering it.

Granted, *.bind()* didn't have this feature until jQuery 1.4. But if you'd like this same feature in *.live()* and *.delegate()*, Robert Katic wrote a small piece of code that you can include. [Grab the gist here](http://gist.github.com/310747).

I recommend using Robert Katic's patch above, but of course there are other approaches people can take. For example, you can rig up your own custom object map:

<div class="example" markdown="1">
    var customObjMap = {
      click : function(e){
        // Something on click
      },
      mouseover : function(e){
        // Something on mouse over
      }
    };
     
    $('ol').delegate('li', 'click mouseover', function(e){
      if($.isFunction(customObjMap[e.type])){
        customObjMap[e.type].call(this, e);
      }
    });
</div>

Another "gotcha" with both *.delegate()* and *.live()* is that when you add the events *mouseenter* and *mouseleave* to an element, and then check the event type (e.type) in the callback function, it incorrectly displays as *mouseover* and *mouseout*. Using .bind(), on the other hand, it displays as *mouseenter* and *mouseleave* as expected. Here is an example:

<div class="example" markdown="1">
    $('ol').delegate('li', 'mouseenter', function(e){
      alert(e.type); // outputs mouseover
    });
     
    $('ol li').bind('mouseenter', function(e){
      alert(e.type); // outputs mouseenter
    });
</div>


Overall, the "gothcas" are no match for the benefits that *.delegate()* and *.undelegate()* provide. Truly great additions to the jQuery core.