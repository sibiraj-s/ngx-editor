import { NodeType } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { Command, lift, wrapIn } from 'prosemirror-commands';

import { isNodeActive } from 'ngx-editor/helpers';

import { SimpleCommand } from './types';

class Blockqote implements SimpleCommand {
  toggle(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { schema } = state;

      const type: NodeType = schema.nodes.blockquote;
      if (!type) {
        return false;
      }

      if (this.isActive(state)) {
        return lift(state, dispatch);
      }

      return wrapIn(type)(state, dispatch);
    };
  }

  isActive(state: EditorState): boolean {
    const { schema } = state;

    const type: NodeType = schema.nodes.blockquote;
    if (!type) {
      return false;
    }

    return isNodeActive(state, type);
  }

  canExecute(state: EditorState): boolean {
    return this.toggle()(state, null);
  }
}

export default Blockqote;
