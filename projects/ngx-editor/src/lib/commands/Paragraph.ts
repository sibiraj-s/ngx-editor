import type { NodeType } from 'prosemirror-model';
import type { EditorState, Transaction, Command } from 'prosemirror-state';

import { getSelectionNodes } from 'ngx-editor/helpers';

import { setBlockTypeWithAttrs } from './blockType';
import { ToggleCommand } from './types';

class Paragraph implements ToggleCommand {
  toggle(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { schema } = state;

      const type: NodeType = schema.nodes['paragraph'];
      if (!type) {
        return false;
      }

      return setBlockTypeWithAttrs(type, (node) => node.attrs)(state, dispatch);
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
