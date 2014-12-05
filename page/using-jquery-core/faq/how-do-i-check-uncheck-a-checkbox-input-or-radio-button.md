<script>{
	"title": "How do I check/uncheck a checkbox input or radio button?"
}</script>

You can check or uncheck a checkbox element or a radio button using the `.prop()` method:

```
// Check #x
$( "#x" ).prop( "checked", true );

// Uncheck #x
$( "#x" ).prop( "checked", false );
```
