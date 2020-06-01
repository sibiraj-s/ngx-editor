import { EditorState } from 'prosemirror-state';
import { NodeType } from 'prosemirror-model';

export const isNodeActive = (state: EditorState, type: NodeType, attrs = {}): boolean => {
  const { $from, to } = state.selection;
  return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
};

export default isNodeActive;
