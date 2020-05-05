export type ToolbarDropdown = { heading?: string[] };
export type ToolbarDropdownGroupKeys = keyof ToolbarDropdown;
export type ToolbarDropdownGroupValues = ToolbarDropdown[ToolbarDropdownGroupKeys];
export type ToolbarItem = string | ToolbarDropdown;
export type Toolbar = Array<ToolbarItem[]> | null;

export interface Config {
  toolbar: boolean | Toolbar;
}

export interface MenuItemMeta {
  key: string;
  icon?: string;
  type: 'mark' | 'node';
  label?: string;
  attrs?: {
    level?: number
  };
  command?: any;
}

export interface MenuItemViewSpec {
  classNames?: string[];
  innerHTML?: string;
  textContent?: string;
  attrs?: { [key: string]: string };
}

export interface ComputedOptions extends Config {
  placeholder: string;
  toolbar: Toolbar;
}

export type KeyMap = { [key: string]: any };
