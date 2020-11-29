import { nodes as basicNodes, marks } from 'ngx-editor';
import { Schema, Node as ProsemirrorNode, NodeSpec, DOMOutputSpec } from 'prosemirror-model';

const codeMirror: NodeSpec = {
  group: 'block',
  attrs: {
    text: { default: '' },
    language: { default: 'text/javascript' }
  },
  parseDOM: [{
    tag: 'pre',
    getAttrs: (dom: HTMLElement) => {
      return {
        text: dom.textContent,
        language: dom.getAttribute('data-language') || 'text/plain'
      };
    }
  }
  ],
  toDOM(node: ProsemirrorNode): DOMOutputSpec {
    return ['pre', { 'data-language': node.attrs.language }, node.attrs.text];
  }
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
