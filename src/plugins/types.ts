import { EditorState, Transaction } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

type TCR = { dom: HTMLElement, update: (state: EditorState) => void };

type TBHeading = Array<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
type TBItems = 'bold' | 'italic' | 'code' | 'blockquote' | 'ordered_list' | 'bullet_list' | 'link';

export type ToolbarDropdown = { heading?: TBHeading };
export type ToolbarBuiltInMenuItem = (editorView: EditorView, spec: MenuItemSpec) => TCR;
export type ToolbarCustomMenuItem = (editorView: EditorView) => TCR;
export type ToolbarDropdownGroupKeys = keyof ToolbarDropdown;
export type ToolbarDropdownGroupValues = ToolbarDropdown[ToolbarDropdownGroupKeys];
export type ToolbarItem = TBItems | ToolbarDropdown | ToolbarBuiltInMenuItem | ToolbarCustomMenuItem;
export type Toolbar = Array<ToolbarItem[]>;

export interface MenuItemSpec {
  classNames?: string[];
  icon?: {
    default: string;
    alt: string;
  };
  iconContainerClass?: string;
  textContent?: string;
  attrs?: { [key: string]: string };
  activeClass: string;
  disabledClass: string;
}

export type DOMUpdateOptions = {
  active: boolean;
  disabled: boolean;
};

export type MenuLabels = { [key: string]: string };
export interface MenuOptions {
  toolbar?: Toolbar;
  labels?: MenuLabels;
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
