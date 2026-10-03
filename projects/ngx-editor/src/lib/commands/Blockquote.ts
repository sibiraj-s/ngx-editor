import type { NodeType } from 'prosemirror-model';
import type { EditorState, Transaction, Command } from 'prosemirror-state';
import { lift, wrapIn } from 'prosemirror-commands';

import { isNodeActive } from 'ngx-editor/helpers';

import { withTextSelection } from './textSelection';
import { ToggleCommand } from './types';

class Blockqote implements ToggleCommand {
  toggle(): Command {
    return (editorState: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const state = withTextSelection(editorState);
      const { schema } = state;

      const type: NodeType = schema.nodes['blockquote'];
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

    const type: NodeType = schema.nodes['blockquote'];
    if (!type) {
      return false;
    }

    return isNodeActive(withTextSelection(state), type);
  }

  canExecute(state: EditorState): boolean {
    return this.toggle()(state);
  }
}

export default Blockqote;
