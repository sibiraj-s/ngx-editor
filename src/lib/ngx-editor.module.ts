import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';

import { NgxEditorComponent } from './ngx-editor.component';

import { NgxEditorServiceConfig, provideMyServiceOptions } from './ngx-editor.service';
import { NgxEditorConfig } from './types';

const NGX_EDITOR_CONFIG_TOKEN = new InjectionToken<NgxEditorConfig>('NgxEditorConfig');

@NgModule({
  declarations: [NgxEditorComponent],
  exports: [NgxEditorComponent],
})

export class NgxEditorModule {
  static forRoot(config: NgxEditorConfig): ModuleWithProviders<NgxEditorModule> {

    return {
      ngModule: NgxEditorModule,
      providers: [
        {
          provide: NGX_EDITOR_CONFIG_TOKEN,
          useValue: config
        },
        {
          provide: NgxEditorServiceConfig,
          useFactory: provideMyServiceOptions,
          deps: [NGX_EDITOR_CONFIG_TOKEN]
        }
      ]
    };
  }
}
