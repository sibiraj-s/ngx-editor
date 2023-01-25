---
title: Working with HTML/JSON doc
---

### Generate HTML from JSON

```ts
import { toHTML } from 'ngx-editor';

const html = toHTML(this.jsonDoc); // -> html string

// schema is optional, use it if you modified the default schema
const html = toHTML(this.jsonDoc, schema); // -> html string
```

### Generating JSON from HTML

```ts
import { toDOC } from 'ngx-editor';

this.jsonDoc = toDOC(htmlString);

// schema is optional, use it if you modified the default schema
this.jsonDoc = toDOC(htmlString, schema);
```
