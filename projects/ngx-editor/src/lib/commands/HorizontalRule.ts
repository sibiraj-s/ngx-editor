import type { NodeType } from 'prosemirror-model';
import type { EditorState, Transaction, Command } from 'prosemirror-state';

import { canInsert } from 'ngx-editor/helpers';

import { InsertCommand } from './types';

class HorizontalRule implements InsertCommand {
  insert(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { schema, tr } = state;

      const type: NodeType = schema.nodes['horizontal_rule'];

      if (!type) {
        return false;
      }

      dispatch(tr.replaceSelectionWith(type.create()).scrollIntoView());
      return true;
    };
  }

  canExecute(state: EditorState): boolean {
    return canInsert(state, state.schema.nodes['horizontal_rule']);
  }
}

export default HorizontalRule;
