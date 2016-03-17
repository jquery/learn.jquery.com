<script>{
	"title": "Optimize Selectors",
	"level": "intermediate",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

Selector optimization is less important than it used to be, as more browsers implement `document.querySelectorAll()` and the burden of selection shifts from jQuery to the browser. However, there are still some tips to keep in mind when selector performance becomes a bottleneck.

## jQuery Extensions

When possible, avoid selectors that include [jQuery extensions](https://api.jquery.com/category/selectors/jquery-selector-extensions/). These extensions cannot take advantage of the performance boost provided by the native `querySelectorAll()` DOM method and, therefore, require the use of the Sizzle selector engine provided by jQuery.

```
// Slower (the zero-based :even selector is a jQuery extension)
$( "#my-table tr:even" );

// Better, though not exactly equivalent
$( "#my-table tr:nth-child(odd)" );
```

Keep in mind that many jQuery extensions, including `:even` in the above example, do not have exact equivalents in the CSS specification. In some situations the convenience of these extensions could outweigh their performance cost.

## Try to segregate the nonstandard parts of your selection

When you select elements, jQuery will call `querySelectorAll` with your selection. If `querySelectorAll` throws an error, jQuery will refer to its Sizzle engine. So, if you are using at least one of the nonstandard pseudo-classes such as `:contains()`, `:has`, `:even`, `:submit`, etc. You will not take advantage of the native `querySelectorAll`.

```
// A long selection with nonstandard pseudo-classes inside
$( "#global.ready .part .list li a:contains('qwerty'):first" );

// A long standard selection with a filter outside (faster):
$( "#global.ready .part .list li a").filter( ":contains('qwerty'):first" );
```

## Avoid Excessive Specificity

```
$( ".data table.attendees td.gonzalez" );

// Better: Drop the middle if possible.
$( ".data td.gonzalez" );
```

A "flatter" DOM also helps improve selector performance, as the selector engine has fewer layers to traverse when looking for an element.

## Save calls to `querySelectorAll`

```
// If in your HTML there are 2 .container with 5 div in each,
// this line will call querySelectorAll 13 times (1 + 2 + 2*5).
$( ".container" ).children( "div" ).find( ".robotarm" );

// Against only 1 call with this:
$( ".container div .robotarm" );
```

## Tips for Older Browsers

When support for older browsers, such as Internet Explorer 8 and below, is necessary, consider the following tips:

### Specificity

Be specific on the right-hand side of your selector, and less specific on the left.

```
// Unoptimized:
$( "div.data .gonzalez" );

// Optimized:
$( ".data td.gonzalez" );
```

Use `tag.class` if possible on your right-most selector, and just tag or just `.class` on the left.

### Avoid the Universal Selector

Selections that specify or imply that a match could be found anywhere can be very slow.

```
$( ":radio" ); // Implied universal selection.
$( "*:radio" ); // Same thing, explicit now.
$( "input:radio" ); // Much better.
```
