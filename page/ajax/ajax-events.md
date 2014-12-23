<script>{
	"title": "Ajax Events",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

Often, you'll want to perform an operation whenever an Ajax requests starts or stops, such as showing or hiding a loading indicator. Rather than defining this behavior inside every Ajax request, you can bind Ajax events to elements just like you'd bind other events. For a complete list of Ajax events, visit [Ajax Events documentation on docs.jquery.com](http://docs.jquery.com/Ajax_Events).

```
// Setting up a loading indicator using Ajax Events
$( "#loading_indicator" )
	.ajaxStart(function() {
		$( this ).show();
	})
	.ajaxStop(function() {
		$( this ).hide();
	});
```
