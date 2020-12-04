import { EditorState } from 'prosemirror-state';
import { Node, NodeType, ResolvedPos } from 'prosemirror-model';

const findNode = (type: NodeType, $from: ResolvedPos): Node | null => {
  for (let i = $from.depth; i > 0; i--) {
    if ($from.node(i).type === type) {
      return $from.node(i);
    }
  }

  return null;
};

export const isNodeActive = (state: EditorState, type: NodeType, attrs: any = {}): boolean => {
  const { selection } = state;
  const { $from, to } = selection;

  const node: Node | null = findNode(type, $from);

  if (!Object.entries(attrs).length || !node) {
    return !!node;
  }

  if (node.type.name === 'heading') {
    return attrs?.level === node.attrs.level;
  }

  return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
};

export default isNodeActive;
