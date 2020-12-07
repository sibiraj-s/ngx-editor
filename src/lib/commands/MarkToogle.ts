import { toggleMark } from 'prosemirror-commands';
import { MarkType } from 'prosemirror-model';

import { EditorState } from 'prosemirror-state';

import { isMarkActive } from 'ngx-editor/helpers';

import { SimpleCommand, Dispatch } from './types';

class MarkToggle implements SimpleCommand {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  execute(state: EditorState, dispatch: Dispatch): boolean {
    const { schema } = state;

    const type: MarkType = schema.marks[this.name];
    if (!type) {
      return false;
    }

    return toggleMark(type)(state, dispatch);
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
    return this.execute(state, null);
  }
}

export default MarkToggle;
