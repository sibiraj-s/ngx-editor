import { NodeType } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

import { isListItem } from './isListItem';

export const isListItemActive = (state: EditorState, type: NodeType, ): boolean => {
  const { $from, $to } = state.selection;
  const range = $from.blockRange($to, node => {
    return node.childCount && isListItem(node.firstChild.type, state.schema);
  });

  if (!range) {
    return false;
  }

  return $from.node(range.depth).type === type;
};
