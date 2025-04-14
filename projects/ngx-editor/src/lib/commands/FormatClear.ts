import type { EditorState, Transaction, Command } from 'prosemirror-state';

import { InsertCommand } from './types';

const SAFE_MARKS = ['link'];

class FormatClear implements InsertCommand {
  insert(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { tr } = state;
      const { ranges, empty } = tr.selection;

      if (empty) {
        return true;
      }

      Object.entries(state.schema.marks).forEach(([markType, mark]) => {
        if (SAFE_MARKS.includes(markType)) {
          return;
        }

        ranges.forEach((range) => {
          tr.removeMark(range.$from.pos, range.$to.pos, mark);
        });
      });

      dispatch(tr);
      return true;
    };
  }

  canExecute(): boolean {
    return true;
  }
}

export default FormatClear;
