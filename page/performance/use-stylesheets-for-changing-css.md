<script>{
	"title": "Use Stylesheets for Changing CSS on Many Elements",
	"level": "intermediate",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

If you're changing the CSS of more than 20 elements using `.css()`, consider adding a style tag to the page instead for a nearly 60% increase in speed.

```
// Fine for up to 20 elements, slow after that:
$( "a.swedberg" ).css( "color", "#0769ad" );

// Much faster:
$( "<style type=\"text/css\">a.swedberg { color: #0769ad }</style>")
	.appendTo( "head" );
```
