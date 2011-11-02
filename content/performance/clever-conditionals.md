---
chapter :     performance
section:      0
title:        Clever Conditionals
attribution:  jQuery Fundamentals
tags:         performance
---
<javascript>

// old way
if (type == 'foo' || type == 'bar') { ... }

// better
if (/^(foo|bar)$/.test(type)) { ... }

// object literal lookup
if (({ foo : 1, bar : 1 })[type]) { ... }
</javascript>
