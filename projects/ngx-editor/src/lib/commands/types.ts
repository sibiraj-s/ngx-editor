import type { EditorState, Transaction, Command } from 'prosemirror-state';

export type Dispatch = (tr: Transaction) => void | null;

interface BaseCommand {
  canExecute: (state: EditorState) => boolean;
}

export interface ToggleCommand extends BaseCommand {
  toggle: () => Command;
  isActive: (state: EditorState) => boolean;
}

export interface InsertCommand extends BaseCommand {
  insert: () => Command;
}
