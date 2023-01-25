---
title: Schema
---

The schema configuration can be provided using `config` property

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
import { Schema, NodeSpec } from 'prosemirror-model';

const codeMirror: NodeSpec = {
  content: 'text*',
  marks: '',
  group: 'block',
  code: true,
  defining: true,
  isolating: true,
  parseDOM: [
    {
      tag: 'pre',
      preserveWhitespace: 'full',
    },
  ],
  toDOM(): DOMOutputSpec {
    return ['pre', ['code', 0]];
  },
};

const nodes = Object.assign({}, basicNodes, {
  code_mirror: codeMirror,
});

const schema = new Schema({
  nodes,
  marks,
});

export default schema;
```

**Note**: Always extend the built in schema. Removing builtin schemas might cause the editor menu/commands to not work as expected.
