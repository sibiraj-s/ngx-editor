import { EditorState } from 'prosemirror-state';
import { NodeType, Node as ProsemirrorNode } from 'prosemirror-model';
import { findSelectedNodeOfType, findParentNode } from 'prosemirror-utils';

const isNodeActive = (state: EditorState, type: NodeType): boolean => {
  // const { from } = state.selection;

  // if (from === 0) { // all selection
  //   return contains(state.doc, type);
  // }

  const predicate = (n: ProsemirrorNode) => n.type === type;
  const node = findSelectedNodeOfType(type)(state.selection) || findParentNode(predicate)(state.selection);
  return !!node;
};

export default isNodeActive;
