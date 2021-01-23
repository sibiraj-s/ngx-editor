import { EditorState, Transaction } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';

export type Dispatch = (tr: Transaction) => void | null;

export interface ToggleCommand {
  toggle: () => Command;
  isActive: (state: EditorState) => boolean;
  canExecute: (state: EditorState) => boolean;
}
