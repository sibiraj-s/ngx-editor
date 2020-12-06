import { EditorState, Transaction } from 'prosemirror-state';

import { getSelectionNodes } from 'ngx-editor/helpers';
import { Node } from 'prosemirror-model';

type Align = 'left' | 'center' | 'right' | 'justify';

class TextAlign {
  align: string;

  constructor(align: Align) {
    this.align = align;
  }

  execute(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const { doc, selection, tr, schema } = state;
    const { from, to } = selection;

    let applicable = false;

    doc.nodesBetween(from, to, (node, pos) => {
      const nodeType = node.type;
      if ([schema.nodes.paragraph, schema.nodes.heading].includes(nodeType)) {
        applicable = true;
        tr.setNodeMarkup(pos, nodeType, { ...node.attrs, align: this.align });
      }
      return true;
    });

    if (!applicable) {
      return false;
    }

    if (tr.docChanged) {
      dispatch?.(tr);
    }

    return true;
  }

  isActive(state: EditorState): boolean {
    const nodes = getSelectionNodes(state);

    const active = nodes.find((node: Node) => {
      return node.attrs.align === this.align;
    });

    return Boolean(active);
  }

  canExecute(state: EditorState): boolean {
    return this.execute(state, null);
  }
}

export default TextAlign;
