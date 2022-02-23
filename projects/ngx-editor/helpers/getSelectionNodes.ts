import { EditorState } from 'prosemirror-state';
import { Node } from 'prosemirror-model';

export const getSelectionNodes = (state: EditorState): Node[] => {
  const nodes: Node[] = [];

  const { selection: { from, to } } = state;

  state.doc.nodesBetween(from, to, (node) => {
    nodes.push(node);
  });

  return nodes;
};

export default getSelectionNodes;
