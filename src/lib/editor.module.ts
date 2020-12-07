import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';

import { NgxEditorConfig } from './types';

import { NgxEditorComponent } from './editor.component';
import { NgxEditorServiceConfig, provideMyServiceOptions } from './editor.service';
import { MenuModule } from './modules/menu/menu.module';

const NGX_EDITOR_CONFIG_TOKEN = new InjectionToken<NgxEditorConfig>('NgxEditorConfig');

@NgModule({
  imports: [
    MenuModule
  ],
  declarations: [
    NgxEditorComponent
  ],
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
