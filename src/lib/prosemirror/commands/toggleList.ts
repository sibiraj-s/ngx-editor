import { EditorState, Transaction } from 'prosemirror-state';
import { NodeType } from 'prosemirror-model';
import { wrapInList, liftListItem } from 'prosemirror-schema-list';

import { isListItemActive } from '../helpers';

export const toggleList = (type: NodeType, itemType: NodeType) => {
  return (state: EditorState, dispatch: (tr: Transaction) => void) => {
    const isActive = isListItemActive(state, type);

    if (isActive) {
      return liftListItem(itemType)(state, dispatch);
    }

    return wrapInList(type)(state, dispatch);
  };
};
