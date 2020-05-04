export type Toolbar = string[][] | null;

export interface Config {
  toolbar: boolean | Toolbar;
}

export interface MenuItemMeta {
  key: string;
  icon: string;
  type: 'mark' | 'node';
  command?: any;
}

export interface ComputedOptions extends Config {
  placeholder: string;
  toolbar: Toolbar;
}

export type KeyMap = { [key: string]: any };
