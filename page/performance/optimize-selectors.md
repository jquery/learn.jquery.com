<script>{
	"title": "Optimize Selectors",
	"level": "intermediate",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

Selector optimization is less important than it used to be, as more browsers implement `document.querySelectorAll()` and the burden of selection shifts from jQuery to the browser. However, there are still some tips to keep in mind.

## ID-Based Selectors

Beginning your selector with an ID is always best.

```
// Fast:
$( "#container div.robotarm" );

// Super-fast:
$( "#container" ).find( "div.robotarm" );
```

The `.find()` approach is faster because the first selection is handled without going through the Sizzle selector engine – ID-only selections are handled using `document.getElementById()`, which is extremely fast because it is native to the browser.

## Specificity

Be specific on the right-hand side of your selector, and less specific on the left.

```
// Unoptimized:
$( "div.data .gonzalez" );

// Optimized:
$( ".data td.gonzalez" );
```

Use `tag.class` if possible on your right-most selector, and just tag or just `.class` on the left.

## Avoid Excessive Specificity

```
$( ".data table.attendees td.gonzalez" );

// Better: Drop the middle if possible.
$( ".data td.gonzalez" );
```

A "flatter" DOM also helps improve selector performance, as the selector engine has fewer layers to traverse when looking for an element.

## Avoid the Universal Selector

Selections that specify or imply that a match could be found anywhere can be very slow.

```
$( ".buttons > *" ); // Extremely expensive.
$( ".buttons" ).children(); // Much better.

$( ".category :radio" ); // Implied universal selection.
$( ".category *:radio" ); // Same thing, explicit now.
$( ".category input:radio" ); // Much better.
```
