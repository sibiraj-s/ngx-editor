import type { EditorState, Transaction, Command } from 'prosemirror-state';

import { InsertCommand } from './types';
import { redo, undo } from 'prosemirror-history';

type HistoryMode = 'undo' | 'redo';

class History implements InsertCommand {
  mode: HistoryMode = 'undo';

  constructor(mode: HistoryMode) {
    this.mode = mode;
  }

  insert(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      if (this.mode === 'undo') {
        return undo(state, dispatch);
      }

      return redo(state, dispatch);
    };
  }

  canExecute(state: EditorState): boolean {
    return this.insert()(state);
  }
}

export default History;
