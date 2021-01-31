import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEditorConfig } from './types';

import { NgxEditorComponent } from './editor.component';
import { NgxEditorService, NgxEditorServiceConfig, provideMyServiceOptions } from './editor.service';
import { MenuModule } from './modules/menu/menu.module';

import { BubbleComponent } from './components/bubble/bubble.component';
import { MenuComponent } from './modules/menu/menu.component';
import { ImageViewComponent } from './components/image-view/image-view.component';

const NGX_EDITOR_CONFIG_TOKEN = new InjectionToken<NgxEditorConfig>('NgxEditorConfig');

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
  ],
  providers: [],
  declarations: [
    NgxEditorComponent,
    BubbleComponent,
    ImageViewComponent,
  ],
  exports: [
    NgxEditorComponent,
    MenuComponent
  ]
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

  static forChild(config: NgxEditorConfig): ModuleWithProviders<NgxEditorModule> {
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
        },
        NgxEditorService,
      ]
    };
  }
}
