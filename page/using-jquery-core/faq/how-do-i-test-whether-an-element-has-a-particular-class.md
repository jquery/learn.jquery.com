<script>{
	"title": "How do I test whether an element has a particular class?"
}</script>

[.hasClass()](http://api.jquery.com/hasClass/) (added in version 1.2) handles this common use case:

```
$( "div" ).click(function() {

	if ( $( this ).hasClass( "protected" ) ) {

		$( this )
			.animate({ left: -10 })
			.animate({ left: 10 })
			.animate({ left: -10 })
			.animate({ left: 10 })
			.animate({ left: 0 });

	}

});
```

You can also use the [.is()](http://api.jquery.com/is/) method along with an appropriate selector for more advanced matching:

```
if ( $( "#myDiv" ).is( ".pretty.awesome" ) ) {

	$( "#myDiv" ).show();

}
```

Note that this method allows you to test for other things as well. For example, you can test whether an element is hidden (by using the custom [:hidden](http://api.jquery.com/hidden-selector/) selector):

```
if ( $( "#myDiv" ).is( ":hidden" ) ) {

	$( "#myDiv" ).show();

}
```
