<script>{
	"title": "Introduction to Effects",
	"level": "beginner"
}</script>

## Showing and Hiding Content

jQuery can show or hide content instantaneously with `.show()` or `.hide()`:

```
// Instantaneously hide all paragraphs
$( "p" ).hide();

// Instantaneously show all divs that have the hidden style class
$( "div.hidden" ).show();
```

When jQuery hides an element, it sets its CSS `display` property to `none`. This means the content will have zero width and height; it does not mean that the content will simply become transparent and leave an empty area on the page.

jQuery can also show or hide content by means of animation effects. You can tell `.show()` and `.hide()` to use animation in a couple of ways. One is to pass in an argument of `'slow'`, `'normal'`, or `'fast'`:

```
// Slowly hide all paragraphs
$( "p" ).hide( "slow" );

// Quickly show all divs that have the hidden style class
$( "div.hidden" ).show( "fast" );
```

If you prefer more direct control over the duration of the animation effect, you can pass the desired duration in milliseconds to `.show()` and `.hide()`:

```
// Hide all paragraphs over half a second
$( "p" ).hide( 500 );

// Show all divs that have the hidden style class over 1.25 seconds
$( "div.hidden" ).show( 1250 );
```

Most developers pass in a number of milliseconds to have more precise control over the duration.

## Fade and Slide Animations

You may have noticed that `.show()` and `.hide()` use a combination of slide and fade effects when showing and hiding content in an animated way. If you would rather show or hide content with one effect or the other, there are additional methods that can help. `.slideDown()` and `.slideUp()` show and hide content, respectively, using only a slide effect. Slide animations are accomplished by rapidly making changes to an element's CSS `height` property.

```
// Hide all paragraphs using a slide up animation over 0.8 seconds
$( "p" ).slideUp( 800 );

// Show all hidden divs using a slide down animation over 0.6 seconds
$( "div.hidden" ).slideDown( 600 );
```

Similarly `.fadeIn()` and `.fadeOut()` show and hide content, respectively, by means of a fade animation. Fade animations involve rapidly making changes to an element's CSS `opacity` property.

```
// Hide all paragraphs using a fade out animation over 1.5 seconds
$( "p" ).fadeOut( 1500 );

// Show all hidden divs using a fade in animation over 0.75 seconds
$( "div.hidden" ).fadeIn( 750 );
```

## Changing Display Based on Current Visibility State

jQuery can also let you change a content's visibility based on its current visibility state. `.toggle()` will show content that is currently hidden and hide content that is currently visible. You can pass the same arguments to `.toggle()` as you pass to any of the effects methods above.

```
// Instantaneously toggle the display of all paragraphs
$( "p" ).toggle();

// Slowly toggle the display of all images
$( "img" ).toggle( "slow" );

// Toggle the display of all divs over 1.8 seconds
$( "div" ).toggle( 1800 );
```

`.toggle()` will use a combination of slide and fade effects, just as `.show()` and `.hide()` do. You can toggle the display of content with just a slide or a fade using `.slideToggle()` and `.fadeToggle()`.

```
// Toggle the display of all ordered lists over 1 second using slide up/down animations
$( "ol" ).slideToggle( 1000 );

// Toggle the display of all blockquotes over 0.4 seconds using fade in/out animations
$( "blockquote" ).fadeToggle( 400 );
```

## Doing Something After an Animation Completes

A common mistake when implementing jQuery effects is assuming that the execution of the next method in your chain will wait until the animation runs to completion.

```
// Fade in all hidden paragraphs; then add a style class to them (not quite right)
$( "p.hidden" ).fadeIn( 750 ).addClass( "lookAtMe" );
```

It is important to realize that `.fadeIn()` above only *kicks off* the animation. Once started, the animation is implemented by rapidly changing CSS properties in a JavaScript `setInterval()` loop. When you call `.fadeIn()`, it starts the animation loop and then returns the jQuery object, passing it along to `.addClass()` which will then add the `lookAtMe` style class while the animation loop is just getting started.

To defer an action until after an animation has run to completion, you need to use an animation callback function. You can specify your animation callback as the second argument passed to any of the animation methods discussed above. For the code snippet above, we can implement a callback as follows:

```
// Fade in all hidden paragraphs; then add a style class to them (correct with animation callback)
$( "p.hidden" ).fadeIn( 750, function() {
	// this = DOM element which has just finished being animated
	$( this ).addClass( "lookAtMe" );
});
```

Note that you can use the keyword `this` to refer to the DOM element being animated. Also note that the callback will be called for each element in the jQuery object. This means that if your selector returns no elements, your animation callback will never run! You can solve this problem by testing whether your selection returned any elements; if not, you can just run the callback immediately.

```
// Run a callback even if there were no elements to animate
var someElement = $( "#nonexistent" );

var cb = function() {
	console.log( "done!" );
};

if ( someElement.length ) {
	someElement.fadeIn( 300, cb );
} else {
	cb();
}
```

## Managing Animation Effects

jQuery provides some additional features for controlling your animations:

### `.stop()`

`.stop()` will immediately terminate all animations running on the elements in your selection. You might give end-users control over page animations by rigging a button they can click to stop the animations.

```
// Create a button to stop all animations on the page:
$( "<button type='button'></button>" )
	.text( "Stop All Animations" )
	.on( "click", function() {
		$( "body *" ).filter( ":animated" ).stop();
	})
	.appendTo( document.body );
```

### `.delay()`

`.delay()` is used to introduce a delay between successive animations. For example:

```
// Hide all level 1 headings over half a second; then wait for 1.5 seconds
// and reveal all level 1 headings over 0.3 seconds
$( "h1" ).hide( 500 ).delay( 1500 ).show( 300 );
```

### `jQuery.fx`

The `jQuery.fx` object has a number of properties that control how effects are implemented. `jQuery.fx.speeds` maps the `slow`, `normal`, and `fast` duration arguments mentioned above to a specific number of milliseconds. The default value of `jQuery.fx.speeds` is:

```
{
	slow: 600,
	fast: 200,
	_default: 400 // Default speed, used for "normal"
}
```

You can modify any of these settings and even introduce some of your own:

```
jQuery.fx.speeds.fast = 300;
jQuery.fx.speeds.blazing = 100;
jQuery.fx.speeds.excruciating = 60000;
```

`jQuery.fx.interval` controls the number of frames per second that is displayed in an animation. The default value is 13 milliseconds between successive frames. You can set this to a lower value for faster browsers to make the animations run smoother. However this will mean more frames per second and thus a higher computational load for the browser, so you should be sure to test the performance implications of doing so thoroughly.

Finally, `jQuery.fx.off` can be set to true to disable all animations. Elements will immediately be set to the target final state instead. This can be especially useful when dealing with older browsers; you also may want to provide the option to disable all animations to your users.

```
$( "<button type='button'></button>" )
	.text( "Disable Animations" )
	.on( "click", function() {
		jQuery.fx.off = true;
	})
	.appendTo( document.body );
```
