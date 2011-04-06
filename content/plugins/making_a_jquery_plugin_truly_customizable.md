---
title:        Making a jQuery Plugin Truly Customizable
attribution:  James Padolsey 
status:       needswork
editrequired: 2
source:       http://www.learningjquery.com/2009/03/making-a-jquery-plugin-truly-customizable
---

Most if not all of the jQuery plugins out there have some level of customization. But very few of the plugin authors have mastered the very particular art involved.

Achieving the "optimum level" of customization is a bit of a balancing act… go too far either way and you've got an unusable plugin!

###Bob and Sue

Let's say Bob has created a wicked new gallery plugin (called "superGallery") which takes a list of images and makes them navigable. Bob's thrown in some animation to make it more interesting. He's tried to make the plugin as customizable as possible, and has ended up with something like this:

<div class="example" markdown="1">
jQuery.fn.superGallery = function(options) {
// Bob's default settings:
var defaults = {
textColor : '#000',
backgroundColor : '#FFF',
fontSize : '1em',
delay : 'quite long',
getTextFromTitle : true,
getTextFromRel : false,
getTextFromAlt : false,
animateWidth : true,
animateOpacity : true,
animateHeight : true,
animationDuration : 500,
clickImgToGoToNext : true,
clickImgToGoToLast : false,
nextButtonText : 'next',
previousButtonText : 'previous',
nextButtonTextColor : 'red',
previousButtonTextColor : 'red'
};

var settings = $.extend({}, defaults, options);

return this.each(function(){
// ----------------------------
// Plugin code would go here...
// ----------------------------
});
};
</div>

The first thing that probably comes to your mind (ok, maybe not the first) is the prospect of how huge this plugin must be to accommodate such a level of customization. The plugin, if it weren't fictional, would probably be a lot larger than necessary. There are only so many kilobytes people will be willing to spend!

Now, our friend Bob thinks this is all fine; in fact, he's quite impressed with the plugin and its level of customization. He believes that all the options make for a more versatile solution, one which can be used in many different situations.

Sue, another friend of ours, has decided to use this new plugin. She has set up all of the options required and now has a working solution sitting in front of her. It's only five minutes later, after playing with the plugin, that she realizes the gallery would look much nicer if each image's width were animated at a slower speed. She hastily searches through Bob's documentation but finds no *animateWidthDuration* option!

###Do you see the problem?

It's not really about how many options your plugin has; but what options it has!

Bob has gone a little over the top. The level of customization he's offering, while it may seem high, is actually quite low, especially considering all the possible things one might want to control when using this plugin. Bob has made the mistake of offering a lot of ridiculously specific options, rendering his plugin much more difficult to customize!

###A better model

So it's pretty obvious: Bob needs a new customization model, one which does not relinquish control or abstract away the necessary details.

The reason Bob is so drawn to this high-level simplicity is that the jQuery framework very much lends itself to this mindset. Offering a *previousButtonTextColor* option is nice and simple, but let's face it, the vast majority of plugin users are going to want way more control!

Here are a few tips which should help you create a better set of customizable options for your plugins:

###Don't create plugin-specific syntax

Developers who use your plugin shouldn't have to learn a new language or terminology just to get the job done.

Bob thought he was offering maximum customization with his *delay* option (look above). He made it so that with his plugin you can specify four different delays, "quite short," "very short," "quite long," or "very long":

<div class="example" markdown="1">
var delayDuration = 0;
switch (settings.delay) {
	case 'very short' : delayDuration = 100;
	break;
	case 'quite short' : delayDuration = 200;
	break;
	case 'quite long' : delayDuration = 300;
	break;
	case 'very long' : delayDuration = 400;
	break;
	default : delayDuration = 200
}
</div>

Not only does this limit the level of control people have, but it takes up quite a bit of space. Twelve lines of code just to define the delaying time is a bit much, don't you think? A better way to construct this option would be to let plugin users specify the amount of time (in milliseconds) as a number, so that no processing of the option needs to take place.

The key here is not to diminish the level of control through your abstraction. Your abstraction, whatever it is, can be as simplistic as you want, but make sure that people who use your plugin will still have that much-sought-after low-level control! (By low-level I mean non-abstracted)

###Give full control of elements

If your plugin creates elements to be used within the DOM, then it's a good idea to offer plugin users some way to access those elements. Sometimes this means giving certain elements IDs or classes. But note that your plugin shouldn't rely on these hooks internally:

A bad implementation:

<div class="example" markdown="1">
// Plugin code
$('&lt;div id="the_gallery_Wrapper" /&gt;').appendTo('body');
$('#the_gallery_wrapper').append('...');
</div>

<div class="example" markdown="1">
// Retain an internal reference:
var $wrapper = $('&lt;div /&gt;')
                 .attr(settings.wrapperAttrs)
                 .appendTo(settings.container);
$wrapper.append('...'); // Easy to reference later...
</div>

Notice that we've created a reference to the injected wrapper and we're also calling the 'attr' method to add any specified attributes to the element. So, in our settings it might be handled like this:

<div class="example" markdown="1">
    var defaults = {
     
        wrapperAttrs : {
            id : 'gallery-wrapper'
        },
       
        // ... rest of settings ...
       
    };
     
    // We can use the extend method to merge options/settings as usual:
    // But with the added first parameter of TRUE to signify a DEEP COPY:
    var settings = $.extend(true, {}, defaults, options);
</div>

The *$.extend()* method will now recurse through all nested objects to give us a merged version of both the defaults and the passed options, giving the passed options precedence.

The plugin user now has the power to specify any attribute of that wrapper element — so if they require that there be a hook for any CSS styles then they can quite easily add a class or change the name of the ID without having to go digging around in plugin source.

The same model can be used to let the user define CSS styles:

<div class="example" markdown="1">
    var defaults = {
     
        wrapperCSS : {},
       
        // ... rest of settings ...
       
    };
     
    // Later on in the plugin where we define the wrapper:
    var $wrapper = $('<div />')
                     .attr(settings.wrapperAttrs)
                     .css(settings.wrapperCSS) // ** Set CSS!
                     .appendTo(settings.container);
</div>

Your plugin may have an associated StyleSheet where developers can add CSS styles. Even in this situation it's a good idea to offer some convenient way of setting styles in JavaScript, without having to use a selector to get at the elements.

###Provide callback capabilities

*What is a callback?* - A callback is essentially a function to be called later, normally triggered by an event. It's passed as an argument, usually to the initiating call of a component. (in this case, a jQuery plugin).

If your plugin is driven by events then it might be a good idea to provide a callback capability for each event. Plus, you can create your own custom events and then provide callbacks for those. In this gallery plugin it might make sense to add an 'onImageShow' callback.

<div class="example" markdown="1">
    var defaults = {
     
        onImageShow : function(){}, // we define an empty anonymous function
                                    // so that we don't need to check its
                                    // existence before calling it.
       
        // ... rest of settings ...
       
    };
     
    // Later on in the plugin:
     
    $nextButton.bind('click', showNextImage);
     
    function showNextImage() {
        // DO stuff to show the image here...
        // ...
        // Here's the callback:
        settings.onImageShow.call(this);
    }
</div>

Instead of initiating the callback via traditional means (adding parenthesis) we're calling it in the context of 'this' which will be a reference to the image node. This means that you have access to the actual image node through the 'this' keyword within the callback:

<div class="example" markdown="1">
    $('ul.imgs li').superGallery({
     
        onImageShow : function() {
            $(this)
                .after('<span>' + $(this).attr('longdesc') + '</span>');
        },
       
        // ... other options ...
        // ...
       
    });
</div>

Similarly you could add an "onImageHide" callback and numerous other ones...

The point with callbacks is to give plugin users an easy way to add additional functionality without digging around in the source.

###Remember, it's a compromise

Your plugin is not going to be able to work in every situation. And equally, it's not going to be very useful if you offer no or very few methods of control. So, remember, it's always going to be a compromise. Three things you must always take into account are:

- *Flexibility*: How many situations will your plugin be able to deal with?
- *Size*: Does the size of your plugin correspond to its level of functionality? I.e. Would you use a very basic tooltip plugin if it was 20k in size? - Probably not!
- *Performance*: Does your plugin heavily process the options in any way? Does this effect speed? Is the overhead caused worth it for the end user?