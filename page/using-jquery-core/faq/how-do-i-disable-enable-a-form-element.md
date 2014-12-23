<script>{
	"title": "How do I disable/enable a form element?"
}</script>

You can enable or disable a form element using the `.prop()` method:

```
// Disable #x
$( "#x" ).prop( "disabled", true );

// Enable #x
$( "#x" ).prop( "disabled", false );
```
