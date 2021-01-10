import { EditorState, Transaction } from 'prosemirror-state';

export type Dispatch = (tr: Transaction) => void | null;

export interface SimpleCommand {
  name?: string;

  isActive: (state: EditorState) => boolean;
  apply?: (state: EditorState, dispatch?: Dispatch) => boolean;
  toggle?: (state: EditorState, dispatch?: Dispatch) => boolean;
  canExecute: (state: EditorState) => boolean;
}
