---
title:        Queue & Dequeue Explained
attribution:  Remy Sharp
editrequired: 2
source:       http://jqueryfordesigners.com/api-queue-dequeue/
---

When you use the animate and show, hide, slideUp, etc effect methods, you’re adding a job on to the fx queue.By default, using queue and passing a function, will add to the fx queue. So we’re creating our own bespoke animation step:

<div class="example" markdown="1">
$('.box').animate({
	height : 20
}, 'slow')
.queue(function () {
	$('#title').html("We're in the animation, baby!");
});
</div>

As I said though, these methods come in pairs, so anything you add using queue, you need to dequeue to allow the process to continue. In the code above, if I chained more animations on, until I call $(this).dequeue(), the subsequent animations wouldn’t run:

<div class="example" markdown="1">
$('.box').animate({
	height : 20
}, 'slow')
.queue(function () {
	$('#title').html("We're in the animation, baby!");
	$(this).dequeue();
})
.animate({
	height: 150
});
</div>

Keeping in mind that the animation won’t continue until we’ve explicitly called dequeue, we can easily create a pausing plugin, by adding a step in the queue that sets a timer and triggers after n milliseconds, at which time, it dequeues the element:

<div class="example" markdown="1">
$.fn.pause = function (n) {
	return this.queue(function () {
		var el = this;
		setTimeout(function () {
			return $(el).dequeue();
		}, n);
	});
};

$('.box').animate({
		height : 20
	}, 'slow')
	.pause(1000) // 1000ms == 1 second
	.animate({
		height: 150
	});
</div>

Remember that the first argument for queue and dequeue are ‘fx’, and that in all of these examples I’m not including it because jQuery set the argument to ‘fx’ by default - so I don’t have to specify it.
