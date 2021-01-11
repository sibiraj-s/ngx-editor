# Configuration

The Configuration can be provided using `config` property

Ref: https://prosemirror.net/examples/schema/

Example: https://github.com/sibiraj-s/ngx-editor/tree/master/demo

## Usage

```ts
import { Editor } from 'ngx-editor';

new Editor({
  schema,
});
```

## Create custom schema

Ref: https://prosemirror.net/examples/schema/

```ts
import { nodes as basicNodes, marks } from 'ngx-editor';
import { Schema, Node as ProsemirrorNode, NodeSpec } from 'prosemirror-model';

const codeBlock: NodeSpec = {
  group: 'block',
  attrs: {
    text: { default: '' },
    language: { default: 'text/javascript' },
  },
  parseDOM: [
    {
      tag: 'pre',
      getAttrs: (dom: HTMLElement) => {
        return {
          text: dom.textContent,
          language: dom.getAttribute('data-language') || 'text/plain',
        };
      },
    },
  ],
  toDOM(node: ProsemirrorNode) {
    return ['pre', { 'data-language': node.attrs.language }, node.attrs.text];
  },
};

const nodes = Object.assign({}, basicNodes, {
  code_mirror: codeBlock,
});

const schema = new Schema({
  nodes,
  marks,
});

export default schema;
```

**Note**: Always extend the built in schema. Removing builtin schemas might cause the editor menu/commands to not work as expected.
