import type { EditorState, Transaction, Command } from 'prosemirror-state';
import type { Node } from 'prosemirror-model';

import { getSelectionNodes } from 'ngx-editor/helpers';

import { ToggleCommand } from './types';

export type Align = 'left' | 'center' | 'right' | 'justify';

class TextAlign implements ToggleCommand {
  align: string;

  constructor(align: Align) {
    this.align = align;
  }

  toggle(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { doc, selection, tr, schema } = state;
      const { from, to } = selection;

      let applicable = false;

      doc.nodesBetween(from, to, (node, pos) => {
        const nodeType = node.type;
        if ([schema.nodes['paragraph'], schema.nodes['heading']].includes(nodeType)) {
          applicable = true;
          const align = node.attrs['align'] === this.align ? null : this.align;
          tr.setNodeMarkup(pos, nodeType, { ...node.attrs, align });
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
    };
  }

  isActive(state: EditorState): boolean {
    const nodes = getSelectionNodes(state);

    const active = nodes.find((node: Node) => {
      return node.attrs['align'] === this.align;
    });

    return Boolean(active);
  }

  canExecute(state: EditorState): boolean {
    return this.toggle()(state);
  }
}

export default TextAlign;
