import { EditorState } from 'prosemirror-state';
import { NodeType, ResolvedPos } from 'prosemirror-model';

const findNodeType = (type: NodeType, $from: ResolvedPos): NodeType | null => {
  for (let i = $from.depth; i > 0; i -= 1) {
    if ($from.node(i).type === type) {
      return $from.node(i).type;
    }
  }

  return null;
};

export const isNodeActive = (state: EditorState, type: NodeType, attrs: any = {}): boolean => {
  const { selection } = state;
  const { $from, to } = selection;

  const node: NodeType | null = findNodeType(type, $from);

  if (!Object.entries(attrs).length || !node) {
    return Boolean(node);
  }

  return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
};

export default isNodeActive;
