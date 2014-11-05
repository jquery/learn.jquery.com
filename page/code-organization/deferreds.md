<script>{
	"title": "Deferreds",
	"level": "advanced",
	"source": "http://msdn.microsoft.com/en-us/magazine/gg723713.aspx",
	"attribution": [
		"Julian Aubourg <j@ubourg.net>",
		"Addy Osmani <addyosmani@gmail.com>",
		"Andree Hansson <peolanha@gmail.com>"
	]
}</script>

At a high-level, deferreds can be thought of as a way to represent asynchronous operations which can take a long time to complete. They're the asynchronous alternative to blocking functions and the general idea is that rather than your application blocking while it awaits some request to complete before returning a result, a deferred object can instead be returned immediately. You can then attach callbacks to the deferred object: they will be called once the request has actually completed.

## Promises

In its most basic form, a "promise" is a model that provides a solution for the concept of deferred (or future) results in software engineering. The main idea behind it is something we've already covered: rather than executing a call which may result in blocking, we instead return a promise for a future value that will eventually be satisfied.

If it helps to have an example here, consider that you are building a web application which heavily relies on data from a third party API. A common problem that's faced is having an unknown knowledge of the API server's latency at a given time so it's possible that other parts of your application may be blocked from running until a result from it is returned. Deferreds provide a better solution to this problem, one which is void of "blocking" effects and completely decoupled.

The [Promises/A](http://wiki.commonjs.org/wiki/Promises/A) proposal defines a method called "then" that can be used to register callbacks to a promise and, thus, get the future result when it is available. The pseudo-code for dealing with a third party API that returns a promise may look like:

```
var promise = callToAPI( arg1, arg2, ...);

promise.then(function( futureValue ) {

	// Handle futureValue

});

promise.then(function( futureValue ) {

	// Do something else

});
```

Furthermore, a promise can actually end up being in two different states:

* Resolved: in which case data is available
* Rejected: in which case something went wrong and no value is available

Thankfully, the "then" method accepts two parameters: one for when the promise was resolved, another for when the promise was rejected. If we get back to pseudo-code, we may do things like:

```
promise.then(function( futureValue ) {

	// We got a value

}, function() {

	// Something went wrong

});
```

In the case of certain applications, it is necessary to have several results returned before your application can continue at all (for example, displaying a dynamic set of options on a screen before a user is able to select the option that interests them). Where this is the case, a method called "when" exists, which can be used to perform some action once all the promises have been fully fulfilled:

```
when(
	promise1,
	promise2,
	...
).then(function( futureValue1, futureValue2, ... ) {

	// All promises have completed and are resolved

});
```

A good example is a scenario where you may have multiple concurrent animations that are being run. Without keeping track of each callback firing on completion, it can be difficult to truly establish once all your animations have finished running. Using promises and "when" however this is very straightforward as each of your animations can effectively say "we promise to let you know once we're done". The compounded result of this means it's a trivial process to execute a single callback once the animations are done. For example:

```
var promise1 = $( "#id1" ).animate().promise();
var promise2 = $( "#id2" ).animate().promise();
when(
	promise1,
	promise2
).then(function() {

	// Once both animations have completed
	// we can then run our additional logic

});
```

This means that one can basically write non-blocking logic that can be executed without synchronization. Rather than directly passing callbacks to functions, something which can lead to tightly coupled interfaces, using promises allows one to separate concerns for code that is synchronous or asynchronous.
