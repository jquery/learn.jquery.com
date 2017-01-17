<script>{
	"title": "Keep Things DRY",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

Don't repeat yourself; if you're repeating yourself, you're doing it wrong.

```
// BAD
if ( eventfade.data( "currently" ) !== "showing" ) {
	eventfade.stop();
}

if ( eventhover.data( "currently" ) !== "showing" ) {
	eventhover.stop();
}

if ( spans.data( "currently" ) !== "showing" ) {
	spans.stop();
}

// GOOD!!
var elems = [ eventfade, eventhover, spans ];

$.each( elems, function( i, elem ) {
	if ( elem.data( "currently" ) !== "showing" ) {
		elem.stop();
	}
});

// APPROACH 1
var IsCurrentlyNotShowing = function( elem ) { return elem.data( "currently" ) !== "showing"; };
elems
.filter(IsCurrentlyNotShowing)
.forEach(function( elem ) { elem.stop(); });

//ES6 APPROACH
const IsCurrentlyShowing = ( elem ) => elem.data( "currently" ) === "showing";
elems
.filter((elem) => !IsCurrentlyShowing(elem) )
.forEach((elem) => elem.stop() );
```
