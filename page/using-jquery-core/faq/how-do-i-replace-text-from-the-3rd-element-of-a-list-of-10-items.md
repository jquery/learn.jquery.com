<script>{
	"title": "How do I replace text from the 3rd element of a list of 10 items?"
}</script>

Either the `:eq()` selector or the `.eq()` method will allow you to select the proper item. However, to replace the text, you must get the value before you set it:

```
// This doesn't work; text() returns a string, not the jQuery object:
$( this ).find( "li a" ).eq( 2 ).text().replace( "foo", "bar" );

// This works:
var thirdLink = $( this ).find( "li a" ).eq( 2 );

var linkText = thirdLink.text().replace( "foo", "bar" );

thirdLink.text( linkText );
```

The first example just discards the modified text. The second example saves the modified text and then replaces the old text with the new modified text. Remember, `.text()` gets; `.text( "foo" )` sets.
