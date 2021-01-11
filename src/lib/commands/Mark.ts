import { Command, toggleMark } from 'prosemirror-commands';
import { MarkType } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';

import { isMarkActive } from 'ngx-editor/helpers';

import { SimpleCommand, Dispatch } from './types';
import { applyMark } from 'ngx-editor/commands';

class Mark implements SimpleCommand {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  apply(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {

      const { schema } = state;

      const type: MarkType = schema.marks[this.name];
      if (!type) {
        return false;
      }

      return applyMark(type)(state, dispatch);
    };
  }

  toggle(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {

      const { schema } = state;

      const type: MarkType = schema.marks[this.name];
      if (!type) {
        return false;
      }

      return toggleMark(type)(state, dispatch);
    };
  }

  isActive(state: EditorState): boolean {
    const { schema } = state;

    const type: MarkType = schema.marks[this.name];

    if (!type) {
      return false;
    }

    return isMarkActive(state, type);
  }

  canExecute(state: EditorState): boolean {
    return this.toggle()(state, null);
  }
}

export default Mark;
