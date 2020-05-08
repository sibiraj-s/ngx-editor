import { Injectable, Optional } from '@angular/core';

import { NgxEditorConfig } from './types';

import menu from './prosemirror/plugins/menu';
import placeholder from './prosemirror/plugins/placeholder';

@Injectable({
  providedIn: 'root'
})
export class NgxEditorServiceConfig {
  public plugins = [
    menu(),
    placeholder()
  ];
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

export function provideMyServiceOptions(config?: NgxEditorConfig): NgxEditorConfig {
  return (config);
}
