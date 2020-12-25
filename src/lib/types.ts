import { EditorState, Plugin } from 'prosemirror-state';
import { Node as ProsemirrorNode, Schema } from 'prosemirror-model';
import { EditorView, Decoration, NodeView } from 'prosemirror-view';

import { LocalsKeys } from './Locals';

type TCR = { dom: HTMLElement, update: (state: EditorState) => void };

type TBHeading = Array<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
type TBItems = 'bold' | 'italic'
  | 'code' | 'blockquote'
  | 'underline' | 'strike'
  | 'ordered_list' | 'bullet_list'
  | 'link' | 'image'
  | 'text_color' | 'background_color'
  | 'align_left' | 'align_center' | 'align_right' | 'align_justify';

export type ToolbarDropdown = { heading?: TBHeading };
export type ToolbarCustomMenuItem = (editorView: EditorView) => TCR;
export type ToolbarDropdownGroupKeys = keyof ToolbarDropdown;
export type ToolbarDropdownGroupValues = ToolbarDropdown[ToolbarDropdownGroupKeys];
export type ToolbarItem = TBItems | ToolbarDropdown | ToolbarCustomMenuItem;
export type Toolbar = Array<ToolbarItem[]>;

export interface NodeViews {
  [name: string]: (
    node: ProsemirrorNode,
    view: EditorView,
    getPos: () => number,
    decorations: Decoration[]
  ) => NodeView;
}

export interface Menu {
  toolbar: Toolbar;
  colorPresets?: string[];
}

export interface NgxEditorConfig {
  schema?: Schema;
  plugins?: Plugin[];
  nodeViews?: NodeViews;
  menu?: Menu | Toolbar;
  locals?: Partial<Record<LocalsKeys, string>>;
}
