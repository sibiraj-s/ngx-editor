import { nodes as basicNodes, marks } from 'ngx-editor';
import { Schema, NodeSpec, DOMOutputSpec } from 'prosemirror-model';

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
      preserveWhitespace: 'full'
    }
  ],
  toDOM(): DOMOutputSpec {
    return ['pre', ['code', 0]];
  },
};

const nodes = {
  ...basicNodes,
  code_mirror: codeMirror
};

const schema = new Schema({
  nodes,
  marks
});

export default schema;
