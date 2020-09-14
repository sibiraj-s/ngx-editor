import { EditorState, Transaction } from 'prosemirror-state';
import { NodeType } from 'prosemirror-model';
import { wrapIn, lift } from 'prosemirror-commands';

import { isNodeActive } from 'ngx-editor/helpers';

export const toggleWrap = (type: NodeType) => {
  return (state: EditorState, dispatch: (tr: Transaction) => void) => {
    const isActive = isNodeActive(state, type);

    if (isActive) {
      return lift(state, dispatch);
    }

    return wrapIn(type)(state, dispatch);
  };
};
