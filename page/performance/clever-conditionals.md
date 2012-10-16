---
title:        Clever Conditionals
level:        intermediate
---

```
// old way
if (type == 'foo' || type == 'bar') { ... }

// better
if (/^(foo|bar)$/.test(type)) { ... }

// object literal lookup
if (({ foo : 1, bar : 1 })[type]) { ... }
```