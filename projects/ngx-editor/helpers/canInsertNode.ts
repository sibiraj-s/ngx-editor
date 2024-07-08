import type { EditorState } from 'prosemirror-state';
import type { NodeType } from 'prosemirror-model';

export const canInsert = (state: EditorState, nodeType: NodeType) => {
  const { $from } = state.selection;

  for (let d = $from.depth; d >= 0; d -= 1) {
    const index = $from.index(d);

    if ($from.node(d).canReplaceWith(index, index, nodeType)) {
      return true;
    }
  }

  return false;
};

export default canInsert;
