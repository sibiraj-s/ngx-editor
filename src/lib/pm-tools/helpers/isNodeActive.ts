import { EditorState } from 'prosemirror-state';
import { NodeType, Node as ProsemirrorNode } from 'prosemirror-model';
import { findSelectedNodeOfType, findParentNode } from 'prosemirror-utils';

const isNodeActive = (state: EditorState, type: NodeType, attrs = {}): boolean => {
  const { $from, to } = state.selection;

  const predicate = (n: ProsemirrorNode) => n.type === type;
  const node = findSelectedNodeOfType(type)(state.selection) || findParentNode(predicate)(state.selection);

  if (!Object.entries(attrs).length || !node) {
    return !!node;
  }

  // check if heading is active
  return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
};

export default isNodeActive;
