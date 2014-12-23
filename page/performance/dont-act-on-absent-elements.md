<script>{
	"title": "Don't Act on Absent Elements",
	"level": "intermediate",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

jQuery won't tell you if you're trying to run a whole lot of code on an empty selection – it will proceed as though nothing's wrong. It's up to you to verify that your selection contains some elements.

```
// Bad: This runs three functions before it
// realizes there's nothing in the selection
$( "#nosuchthing" ).slideUp();

// Better:
var elem = $( "#nosuchthing" );

if ( elem.length ) {

	elem.slideUp();

}

// Best: Add a doOnce plugin.
jQuery.fn.doOnce = function( func ) {

	this.length && func.apply( this );

	return this;

}

$( "li.cartitems" ).doOnce(function() { 

	// make it ajax! \o/ 

});
```

This guidance is especially applicable for jQuery UI widgets, which have a lot of overhead even when the selection doesn't contain elements.
