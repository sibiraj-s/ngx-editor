import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { LocalsKeys } from './Locals';
declare type TCR = {
    dom: HTMLElement;
    update: (state: EditorState) => void;
};
export declare type TBHeadingItems = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export declare type TBItems = 'bold' | 'italic' | 'code' | 'blockquote' | 'underline' | 'strike' | 'ordered_list' | 'bullet_list' | 'link' | 'image' | 'text_color' | 'background_color' | 'align_left' | 'align_center' | 'align_right' | 'align_justify';
export declare type ToolbarDropdown = {
    heading?: TBHeadingItems[];
};
export declare type ToolbarCustomMenuItem = (editorView: EditorView) => TCR;
export declare type ToolbarDropdownGroupKeys = keyof ToolbarDropdown;
export declare type ToolbarDropdownGroupValues = ToolbarDropdown[ToolbarDropdownGroupKeys];
export declare type ToolbarItem = TBItems | ToolbarDropdown | ToolbarCustomMenuItem;
export declare type Toolbar = Array<ToolbarItem[]>;
export interface NgxEditorConfig {
    locals?: Partial<Record<LocalsKeys, string>>;
}
export {};
//# sourceMappingURL=types.d.ts.map