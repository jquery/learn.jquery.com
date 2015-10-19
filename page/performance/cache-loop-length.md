<script>{
	"title": "Cache Length During Loops",
	"level": "intermediate",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

In a for loop, don't access the length property of an array every time; cache it beforehand.

```
var myLength = myArray.length;

for ( var i = 0; i < myLength; i++ ) {

	// do stuff

}
```

Or if you only need length property for this loop, you can also declare it as a local variable.

```
for ( var i = 0, myLength = myArray.length; i < myLength; i++ ) {

	// do stuff

}
```
