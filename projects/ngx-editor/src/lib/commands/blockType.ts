import type { Attrs, Node as ProseMirrorNode, NodeType } from 'prosemirror-model';
import type { EditorState, Transaction, Command } from 'prosemirror-state';

type GetAttrs = (node: ProseMirrorNode) => Attrs;

// whether any textblock in the selection would change when set to the given type
const canSetBlockType = (state: EditorState, type: NodeType, getAttrs: GetAttrs): boolean => {
  const { doc, selection } = state;
  let applicable = false;

  selection.ranges.forEach(({ $from, $to }) => {
    doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      if (applicable) {
        return false;
      }

      if (!node.isTextblock || node.hasMarkup(type, getAttrs(node))) {
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

// like setBlockType from prosemirror-commands, but the attributes are computed
// from each converted block, so blocks keep their own attributes like align and indent
export const setBlockTypeWithAttrs = (type: NodeType, getAttrs: GetAttrs): Command => {
  return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
    if (!canSetBlockType(state, type, getAttrs)) {
      return false;
    }

    if (dispatch) {
      const { selection, tr } = state;

      selection.ranges.forEach(({ $from, $to }) => {
        tr.setBlockType($from.pos, $to.pos, type, getAttrs);
      });

      dispatch(tr.scrollIntoView());
    }

    return true;
  };
};

export default setBlockTypeWithAttrs;
