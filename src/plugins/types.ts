import { EditorState, Transaction } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

type TCR = { dom: HTMLElement, update: (state: EditorState) => void };

export type ToolbarDropdown = { heading?: string[] };
export type ToolbarCustomMenuItem = (editorView: EditorView) => TCR;
export type ToolbarDropdownGroupKeys = keyof ToolbarDropdown;
export type ToolbarDropdownGroupValues = ToolbarDropdown[ToolbarDropdownGroupKeys];
export type ToolbarItem = string | ToolbarDropdown | ToolbarCustomMenuItem;
export type Toolbar = Array<ToolbarItem[]> | null;

export interface MenuItemViewSpec {
  classNames?: string[];
  innerHTML?: string;
  textContent?: string;
  attrs?: { [key: string]: string };
  activeClass: string;
  disabledClass: string;
}

export type MenuLabels = { [key: string]: string };
export interface MenuOptions {
  toolbar: Toolbar;
  labels: MenuLabels;
  schema?: Schema;
}

export type Command = (schema: EditorState, dispatch: (tr: Transaction) => void) => boolean;

export interface DropdownViewRender {
  dom: HTMLElement;
  updates: Array<(state: EditorState) => void>;
}

export interface MenuItemViewRender {
  dom: HTMLElement;
  update: (state: EditorState) => void;
}
