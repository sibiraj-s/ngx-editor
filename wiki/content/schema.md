# Configuration

The Configuration can be provided using `config` property

Ref: https://prosemirror.net/examples/schema/

Example: https://github.com/sibiraj-s/ngx-editor/tree/master/demo

## Usage

```ts
import { menu, placeholder, schema } from 'ngx-editor';

NgxEditorModule.forRoot({
  schema
});
```

## Create custom schema

```ts
import { nodes as basicNodes, marks as basicMarks } from 'ngx-editor';
import { Schema, Node as ProsemirrorNode, NodeSpec } from 'prosemirror-model';

const codeBlock: NodeSpec = {
  group: 'block',
  attrs: {
    text: { default: '' },
    language: { default: 'text/javascript' }
  },
  parseDOM: [
    {
      tag: 'pre',
      getAttrs: (dom: HTMLElement) => {
        return {
          text: dom.textContent,
          language: dom.getAttribute('data-language') || 'text/plain'
        };
      }
    }
  ],
  toDOM(node: ProsemirrorNode) {
    return ['pre', { 'data-language': node.attrs.language }, node.attrs.text];
  }
};

const nodes = Object.assign({}, basicNodes, {
  code_mirror: codeBlock
});

const schema = new Schema({
  nodes,
  marks: basicMarks
});

export default schema;
```
