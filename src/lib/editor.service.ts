import { Injectable, Optional } from '@angular/core';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

import { Menu, NgxEditorConfig, NodeViews, Toolbar } from './types';
import Locals from './Locals';

import { schema } from './schema';

const DEFAULT_TOOLBAR: Toolbar = [
  ['bold', 'italic'],
  ['code', 'blockquote'],
  ['underline', 'strike'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['link', 'image'],
  ['text_color', 'background_color'],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
];

const DEFAULT_COLOR_PRESETS = [
  '#b60205',
  '#d93f0b',
  '#fbca04',
  '#0e8a16',
  '#006b75',
  '#1d76db',
  '#0052cc',
  '#5319e7',
  '#e99695',
  '#f9d0c4',
  '#fef2c0',
  '#c2e0c6',
  '#bfdadc',
  '#c5def5',
  '#bfd4f2',
  '#d4c5f9'
];

const DEFAULT_MENU: Menu = {
  toolbar: DEFAULT_TOOLBAR,
  colorPresets: []
};

const DEFAULT_SCHEMA = schema;
const DEFAULT_PLUGINS: Plugin[] = [
];

@Injectable({
  providedIn: 'root'
})
export class NgxEditorServiceConfig {
  public plugins: Plugin[] = DEFAULT_PLUGINS;
  public nodeViews: NodeViews = {};
  public schema: Schema = DEFAULT_SCHEMA;
  public menu = DEFAULT_MENU;
  public locals = {};
}

@Injectable({
  providedIn: 'root'
})
export class NgxEditorService {
  config: NgxEditorServiceConfig;

  constructor(@Optional() config?: NgxEditorServiceConfig) {
    this.config = config;
  }

  get locals(): Locals {
    return new Locals(this.config.locals);
  }

  get menu(): Menu {
    return this.config.menu;
  }

  get colorPresets(): string[][] {
    const col = 8;
    const colors: string[][] = [];

    const { colorPresets } = this.config.menu;
    const allColors = colorPresets.length ? colorPresets : DEFAULT_COLOR_PRESETS;

    allColors.forEach((color, index) => {
      const row = Math.floor(index / col);

      if (!colors[row]) {
        colors.push([]);
      }

      colors[row].push(color);
    });

    return colors;
  }
}

export const provideMyServiceOptions = (config?: NgxEditorConfig): NgxEditorServiceConfig => {
  let menu: Menu;

  if (config.menu !== null) {
    if (!config.menu) {
      menu = DEFAULT_MENU;
    } else if (Array.isArray(config.menu)) {
      menu = {
        ...DEFAULT_MENU,
        toolbar: config.menu,
      };
    } else {
      menu = {
        ...DEFAULT_MENU,
        ...config.menu,
      };
    }
  }

  return {
    plugins: config?.plugins ?? DEFAULT_PLUGINS,
    nodeViews: config?.nodeViews ?? {},
    menu,
    schema: config?.schema ?? DEFAULT_SCHEMA,
    locals: config.locals ?? {}
  };
};
