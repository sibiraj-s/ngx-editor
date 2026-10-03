import { Injectable, inject } from '@angular/core';

import { NgxEditorConfig } from './types';
import Locals from './Locals';
import { NgxEditorServiceConfig } from './editor-config.service';
import Icon from './icons';
import { HTML } from './trustedTypesUtil';

@Injectable({
  providedIn: 'root',
})
export class NgxEditorService {
  config = inject(NgxEditorServiceConfig, { optional: true });

  get locals(): Locals {
    return new Locals(this.config.locals);
  }

  getIcon(icon: string): HTML {
    return this.config.icons[icon] ? this.config.icons[icon] : Icon.get(icon);
  }
}

export const provideMyServiceOptions = (config?: NgxEditorConfig): NgxEditorServiceConfig => {
  return {
    locals: config.locals ?? {},
    icons: config.icons ?? {},
  };
};
