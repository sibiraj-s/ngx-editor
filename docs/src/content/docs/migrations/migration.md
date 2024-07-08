---
title: Migration
---

If you are migrating from older version of ngx-editor(v4 and below) or from other editors, the DOM structure might be little different.

To convert them to the editors current DOM schema, you will need to write a custom schema and run the document through that.

An Example to convert and parse `div` into `p` tag persisting all attributes

**Example HTML**

```html
<div style="background: orange">
  Example text with example custom container with inline style
</div>
```

Lets take this HTML and and write a schema to retain background property.

**The Schema**

```ts
const paragraph: NodeSpec = {
  content: 'inline*',
  group: 'block',
  attrs: {
    align: {
      default: null,
    },
    background: {
      default: null,
    },
  },
  parseDOM: [
    {
      tag: 'p',
      getAttrs(dom: HTMLElement): Record<string, any> {
        const { textAlign } = dom.style;
        const align = dom.getAttribute('align') || textAlign || null;

        return {
          align,
        };
      },
    },
    {
      tag: 'div', // this will parse div to the editor required format
      getAttrs(dom: HTMLElement): Record<string, any> {
        const { textAlign, background } = dom.style; // you can add required properties here.
        const align = dom.getAttribute('align') || textAlign || null;

        return {
          align,
          background,
        };
      },
    },
  ],
  toDOM(node): DOMOutputSpec {
    const { align, background } = node.attrs; // get and apply required attributes

    const styles: Partial<CSSStyleDeclaration> = {
      textAlign: align !== 'left' ? align : null,
      background,
    };
    const style = toStyleString(styles) || null;

    return ['p', { style }, 0];
  },
};
```

You can refer here https://github.com/sibiraj-s/ngx-editor/blob/v5.3.0/src/lib/schema/nodes.ts for editor default schema.

Refer here https://prosemirror.net/examples/schema/ to write a schema from scratch.

After creating the schema extend it with editor's default schema so that all default parsing is applied.

```ts
import { nodes as basicNodes, marks } from 'ngx-editor';

const nodes = Object.assign({}, basicNodes, {
  paragraph,
});

const schema = new Schema({
  nodes,
  marks,
});
```

To Convert HTML

```ts
import { toHTML, toDoc } from 'ngx-editor';

const doc = toDoc(content, schema); // schema is your custom schema.
```

The editor accepts both doc/HTML as input. If you need HTML

```ts
const html = toHTML(doc, schema); // custom schema
```
