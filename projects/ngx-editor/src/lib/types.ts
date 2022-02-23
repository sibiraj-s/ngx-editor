import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { LocalsKeys } from './Locals';

type TCR = {
  dom: HTMLElement;
  update: (state: EditorState) => void;
};

export type TBHeadingItems = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TBItems = 'bold'
| 'italic'
| 'code'
| 'blockquote'
| 'underline'
| 'strike'
| 'ordered_list'
| 'bullet_list'
| 'link'
| 'image'
| 'text_color'
| 'background_color'
| 'align_left'
| 'align_center'
| 'align_right'
| 'align_justify';

export type ToolbarDropdown = { heading?: TBHeadingItems[] };
export type ToolbarCustomMenuItem = (editorView: EditorView) => TCR;
export type ToolbarDropdownGroupKeys = keyof ToolbarDropdown;
export type ToolbarDropdownGroupValues = ToolbarDropdown[ToolbarDropdownGroupKeys];
export type ToolbarItem = TBItems | ToolbarDropdown | ToolbarCustomMenuItem;
export type Toolbar = Array<ToolbarItem[]>;

export interface NgxEditorConfig {
  locals?: Partial<Record<LocalsKeys, string>>;
}
