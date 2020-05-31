import { Plugin, EditorState, Transaction } from 'prosemirror-state';
import { Node as ProsemirrorNode, Schema } from 'prosemirror-model';
import { EditorView, Decoration, NodeView } from 'prosemirror-view';

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

export interface NodeViews {
  [name: string]: (
    node: ProsemirrorNode,
    view: EditorView,
    getPos: () => number,
    decorations: Decoration[]
  ) => NodeView;
}

export interface NgxEditorConfig {
  schema?: Schema;
  plugins?: Plugin[];
  nodeViews?: NodeViews;
}

export type MenuLabels = { [key: string]: string };
export interface MenuOptions {
  toolbar?: Toolbar;
  labels?: MenuLabels;
  schema?: Schema;
}

export type Command = (schema: EditorState, dispatch: (tr: Transaction) => void) => boolean;
