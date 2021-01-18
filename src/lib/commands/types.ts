import { EditorState, Transaction } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';

export type Dispatch = (tr: Transaction) => void | null;

export interface SimpleCommand {
  name?: string;

  isActive: (state: EditorState) => boolean;
  apply?: () => Command;
  toggle?: () => Command;
  canExecute: (state: EditorState) => boolean;
}
