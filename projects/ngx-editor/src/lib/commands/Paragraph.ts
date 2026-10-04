import type { NodeType } from 'prosemirror-model';
import type { EditorState, Transaction, Command } from 'prosemirror-state';
import { setBlockType } from 'prosemirror-commands';

import { getSelectionNodes } from 'ngx-editor/helpers';

import { ToggleCommand } from './types';

class Paragraph implements ToggleCommand {
  toggle(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { schema, selection } = state;

      const type: NodeType = schema.nodes['paragraph'];
      if (!type) {
        return false;
      }

      // keep attributes like align and indent of the current block
      const { attrs } = selection.$from.parent;

      return setBlockType(type, attrs)(state, dispatch);
    };
  }

  isActive(state: EditorState): boolean {
    const { schema } = state;

    const type: NodeType = schema.nodes['paragraph'];
    if (!type) {
      return false;
    }

    return getSelectionNodes(state).some((node) => node.type === type);
  }

  canExecute(state: EditorState): boolean {
    return this.toggle()(state);
  }
}

export default Paragraph;
