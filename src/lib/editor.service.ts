import { Injectable, Optional } from '@angular/core';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

import { placeholder } from 'ngx-editor/plugins';

import { NgxEditorConfig, NodeViews, Toolbar } from './types';
import Locals from './Locals';

import { schema } from './schema';

const DEFAULT_MENU: Toolbar = [
  ['bold', 'italic'],
  ['code', 'blockquote'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['link', 'image'],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
];

const DEFAULT_SCHEMA = schema;
const DEFAULT_PLUGINS: Plugin[] = [
  placeholder()
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
}

export function provideMyServiceOptions(config?: NgxEditorConfig): NgxEditorServiceConfig {
  return {
    plugins: config?.plugins ?? DEFAULT_PLUGINS,
    nodeViews: config?.nodeViews ?? {},
    menu: config?.menu ?? DEFAULT_MENU,
    schema: config?.schema ?? DEFAULT_SCHEMA,
    locals: config.locals ?? {}
  };
}
