import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEditorConfig } from './types';

import { NgxEditorComponent } from './editor.component';
import { NgxEditorServiceConfig, provideMyServiceOptions } from './editor.service';
import { MenuModule } from './modules/menu/menu.module';

import { BubbleComponent } from './components/bubble/bubble.component';
import { SharedService } from './services/shared/shared.service';

const NGX_EDITOR_CONFIG_TOKEN = new InjectionToken<NgxEditorConfig>('NgxEditorConfig');

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
  ],
  providers: [
    SharedService
  ],
  declarations: [
    NgxEditorComponent,
    BubbleComponent
  ],
  exports: [NgxEditorComponent],
  entryComponents: [BubbleComponent]
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
