import type { NodeType } from 'prosemirror-model';
import type { EditorState, Transaction } from 'prosemirror-state';
import type { Command } from 'prosemirror-commands';

import { canInsert } from 'ngx-editor/helpers';

class HorizontalRule {
  insert(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { schema, tr } = state;

      const type: NodeType = schema.nodes.horizontal_rule;

      if (!type) {
        return false;
      }

      dispatch(tr.replaceSelectionWith(type.create()).scrollIntoView());
      return true;
    };
  }

  canExecute(state: EditorState): boolean {
    return canInsert(state, state.schema.nodes.horizontal_rule);
  }
}

export default HorizontalRule;
