---
title: Working with HTML/JSON doc
---

The editor content is a [prosemirror document](https://prosemirror.net/docs/ref/#model.Document_Structure), which can be represented as a JSON doc. ngx-editor provides helpers to convert it to and from HTML.

### Getting the content

- **Forms** - with `ngModel` or a reactive form control, the bound value is the content. It is an HTML string or a JSON doc depending on the input value or the `outputFormat` prop. See [NgModel](/ngx-editor/examples/ng-model/) and [Reactive Forms](/ngx-editor/examples/reactive-forms/).
- **`valueChanges`** - subscribe to `editor.valueChanges` to get the JSON doc whenever the content changes.

  ```ts
  this.editor.valueChanges.subscribe((jsonDoc) => {
    const html = toHTML(jsonDoc);
  });
  ```

- **Current value** - read the JSON doc from the editor state at any time.

  ```ts
  const jsonDoc = this.editor.view.state.doc.toJSON();
  ```

### Generate HTML from JSON

```ts
import { toHTML } from 'ngx-editor';

const html = toHTML(jsonDoc); // -> html string

// schema is optional, use it if you modified the default schema
const html = toHTML(jsonDoc, schema); // -> html string
```

### Generating JSON from HTML

```ts
import { toDoc } from 'ngx-editor';

const jsonDoc = toDoc(htmlString);

// schema is optional, use it if you modified the default schema
const jsonDoc = toDoc(htmlString, schema);
```
