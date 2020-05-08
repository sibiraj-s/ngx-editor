import { EditorState, Transaction } from 'prosemirror-state';
import { NodeType } from 'prosemirror-model';
import { setBlockType } from 'prosemirror-commands';

import isNodeActive from '../helpers/isNodeActive';

export const toggleBlockType = (type: NodeType, toggleType: NodeType, attrs = {}) => {
  return (state: EditorState, dispatch: (tr: Transaction) => void) => {
    const isActive = isNodeActive(state, type, attrs);

    if (isActive) {
      return setBlockType(toggleType)(state, dispatch);
    }

    return setBlockType(type, attrs)(state, dispatch);
  };
};
