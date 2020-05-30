# NgModel

Input can be a [prosemirror document object](https://prosemirror.net/docs/ref/#model.Document_Structure) or `undefined` or `null`

```ts
class AppComponent {
  jsonDoc = null;

  onChange(doc: object) {
    this.jsonDoc = doc;
  }
}
```

```html
<ngx-editor [ngModel]="jsonDoc" (ngModelChange)="onChange"></ngx-editor>
```

## Generate HTML from JSON

```ts
import { DOMSerializer } from "prosemirror-model";
import { schema } from "ngx-editor";

const contentNode = schema.nodeFromJSON(this.jsonDoc);

// https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
const html: DocumentFragment = DOMSerializer.fromSchema(schema).serializeFragment(contentNode.content);
console.log(html);
```

## Generating JSON from HTML

```ts
import { DOMParser } from 'prosemirror-model';
import { schema } from 'ngx-editor';

const el = document.createElement('div')
el.innerHTML = htmlString

this.jsonDoc = DOMParser.fromSchema(schema).parse(el).toJSON()
```
