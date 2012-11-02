---
title:        Clever Conditionals
level:        intermediate
source: http://jqfundamentals.com/legacy
attribution: 
  - jQuery Fundamentals
---

```
// old way
if (type == 'foo' || type == 'bar') { ... }

// better
if (/^(foo|bar)$/.test(type)) { ... }

// object literal lookup
if (({ foo : 1, bar : 1 })[type]) { ... }
```