---
title:        Beware Anonymous Functions
attribution:  jQuery Fundamentals
---

Anonymous functions bound everywhere are a pain. They're difficult to debug,
maintain, test, or reuse. Instead, use an object literal to organize and name
your handlers and callbacks.
<javascript>
// BAD
$(document).ready(function() {
  $('#magic').click(function(e) {
    $('#yayeffects').slideUp(function() {
      // ...
    });
  });

  $('#happiness').load(url + ' #unicorns', function() {
    // ...
  });
});

// BETTER
var PI = {
  onReady : function() {
    $('#magic').click(PI.candyMtn);
    $('#happiness').load(PI.url + ' #unicorns', PI.unicornCb);
  },

  candyMtn : function(e) {
    $('#yayeffects').slideUp(PI.slideCb);
  },

  slideCb : function() { ... },

  unicornCb : function() { ... }
};

$(document).ready(PI.onReady);
</javascript>
