export type Toolbar = string[][] | null;

export interface Config {
  toolbar: boolean | Toolbar;
}

export interface MenuItem {
  key: string;
  command?: any;
  dom: HTMLElement;
}

export interface ComputedOptions extends Config {
  placeholder: string;
  toolbar: Toolbar;
}
