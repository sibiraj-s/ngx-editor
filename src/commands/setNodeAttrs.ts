import { NodeType } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { setBlockType } from 'prosemirror-commands';

export const setNodeAttrs = (type: NodeType, attrs = {}) => {
  return (state: EditorState, dispatch: (tr: Transaction) => void) => {

    const { doc, selection, tr } = state;
    const { from, to } = selection;

    let applicable = false;

    doc.nodesBetween(from, to, (node, pos) => {
      const nodeType = node.type;
      if (['paragraph', 'heading'].includes(nodeType.name)) {
        applicable = true;
        tr.setNodeMarkup(pos, nodeType, { ...node.attrs, ...attrs });
      }

      return true;
    });

    if (!applicable) {
      return false;
    }

    dispatch?.(tr);
    return true;
  };

};
