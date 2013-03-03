---
title: Keep Things DRY
level: beginner
attribution:
source: http://jqfundamentals.com/legacy
  - jQuery Fundamentals
---
Don&rsquo;t repeat yourself; if you&rsquo;re repeating yourself, you&rsquo;re doing it wrong.

```
// BAD
if ( $eventfade.data( "currently" ) !== "showing" ) {
	$eventfade.stop();
}

if ( $eventhover.data( "currently" ) !== "showing" ) {
	$eventhover.stop();
}

if ( $spans.data( "currently" ) !== "showing" ) {
	$spans.stop();
}

// GOOD!!
var $elems = [ $eventfade, $eventhover, $spans ];

$.each( $elems, function( i, elem ) {
	if ( elem.data( "currently" ) !== "showing" ) {
		elem.stop();
	}
});
```
