import type { EditorState, Transaction, Command } from 'prosemirror-state';
import { liftListItem, wrapInList } from 'prosemirror-schema-list';

import { isNodeActive } from 'ngx-editor/helpers';

import { withTextSelection } from './textSelection';
import { ToggleCommand } from './types';

class TaskList implements ToggleCommand {
  toggle(): Command {
    return (editorState: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const state = withTextSelection(editorState);
      const { schema } = state;

      const type = schema.nodes['task_list'];
      if (!type) {
        return false;
      }

      if (this.isActive(state)) {
        return liftListItem(schema.nodes['task_item'])(state, dispatch);
      }

      return wrapInList(type)(state, dispatch);
    };
  }

  isActive(state: EditorState): boolean {
    const { schema } = state;

    const type = schema.nodes['task_list'];
    if (!type) {
      return false;
    }

    return isNodeActive(withTextSelection(state), type);
  }

  canExecute(state: EditorState): boolean {
    return this.toggle()(state);
  }
}

export default TaskList;
