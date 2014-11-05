<script>{
	"title": "Attributes",
	"level": "beginner"
}</script>

An element's attributes can contain useful information for your application, so it's important to be able to get and set them.

## The `.attr()` method

The `.attr()` method acts as both a getter and a setter. As a setter, `.attr()` can accept either a key and a value, or an object containing one or more key/value pairs.

`.attr()` as a setter:

```
$( "a" ).attr( "href", "allMyHrefsAreTheSameNow.html" );

$( "a" ).attr({
	title: "all titles are the same too!",
	href: "somethingNew.html"
});
```

`.attr()` as a getter:

```
$( "a" ).attr( "href" ); // Returns the href for the first a element in the document
```
