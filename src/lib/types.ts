import { Plugin } from 'prosemirror-state';

export type ToolbarDropdown = { heading?: string[] };
export type ToolbarDropdownGroupKeys = keyof ToolbarDropdown;
export type ToolbarDropdownGroupValues = ToolbarDropdown[ToolbarDropdownGroupKeys];
export type ToolbarItem = string | ToolbarDropdown;
export type Toolbar = Array<ToolbarItem[]> | null;

export interface MenuItemViewSpec {
  classNames?: string[];
  innerHTML?: string;
  textContent?: string;
  attrs?: { [key: string]: string };
}

export interface NgxEditorConfig {
  plugins: Plugin[];
}

export type MenuLabels = { [key: string]: string };
export interface MenuOptions {
  toolbar?: Toolbar;
  labels?: MenuLabels;
}
