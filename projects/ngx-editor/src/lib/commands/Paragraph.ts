import type { NodeType } from 'prosemirror-model';
import type { EditorState, Transaction, Command } from 'prosemirror-state';

import { getSelectionNodes } from 'ngx-editor/helpers';

import { ToggleCommand } from './types';

// whether any textblock in the selection can be turned into the given type
const canSetBlockType = (state: EditorState, type: NodeType): boolean => {
  const { doc, selection } = state;
  let applicable = false;

  selection.ranges.forEach(({ $from, $to }) => {
    doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      if (applicable) {
        return false;
      }

      if (!node.isTextblock || node.type === type) {
        return true;
      }

      const $pos = doc.resolve(pos);
      const index = $pos.index();
      applicable = $pos.parent.canReplaceWith(index, index + 1, type);
      return false;
    });
  });

  return applicable;
};

class Paragraph implements ToggleCommand {
  toggle(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { schema, selection, tr } = state;

      const type: NodeType = schema.nodes['paragraph'];
      if (!type || !canSetBlockType(state, type)) {
        return false;
      }

      if (dispatch) {
        // keep attributes like align and indent of each converted block
        selection.ranges.forEach(({ $from, $to }) => {
          tr.setBlockType($from.pos, $to.pos, type, (node) => node.attrs);
        });

        dispatch(tr.scrollIntoView());
      }

      return true;
    };
  }

  isActive(state: EditorState): boolean {
    const { schema } = state;

    const type: NodeType = schema.nodes['paragraph'];
    if (!type) {
      return false;
    }

    return getSelectionNodes(state).some((node) => node.type === type);
  }

  canExecute(state: EditorState): boolean {
    return this.toggle()(state);
  }
}

export default Paragraph;
