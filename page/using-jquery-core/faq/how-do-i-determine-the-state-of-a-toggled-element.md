<script>{
	"title": "How do I determine the state of a toggled element?"
}</script>

You can determine whether an element is collapsed or not by using the `:visible` and `:hidden` selectors.

```
var isVisible = $( "#myDiv" ).is( ":visible" );

var isHidden = $( "#myDiv" ).is( ":hidden" );
```

If you're simply acting on an element based on its visibility, just include `:visible` or `:hidden` in the selector expression. For example:

```
$( "#myDiv:visible" ).animate({

	left: "+=200px"

}, "slow" );
```
