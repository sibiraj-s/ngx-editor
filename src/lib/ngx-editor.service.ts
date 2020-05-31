import { Injectable, Optional } from '@angular/core';

import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

import { NgxEditorConfig, NodeViews } from './types';

import menu from './prosemirror/plugins/menu';
import placeholder from './prosemirror/plugins/placeholder';
import { schema } from './schema';

@Injectable({
  providedIn: 'root'
})

export class NgxEditorServiceConfig {
  public plugins: Plugin[] = [
    menu(),
    placeholder()
  ];

  public nodeViews: NodeViews = {};
  public schema: Schema = schema;
}

@Injectable({
  providedIn: 'root'
})

export class NgxEditorService {
  config: NgxEditorServiceConfig;

  constructor(@Optional() config?: NgxEditorServiceConfig) {
    this.config = config;
  }
}

const defaultConfig: NgxEditorConfig = {
  plugins: [],
  nodeViews: {},
  schema
};

export function provideMyServiceOptions(config?: NgxEditorConfig): NgxEditorConfig {
  return Object.assign({}, defaultConfig, config);
}
