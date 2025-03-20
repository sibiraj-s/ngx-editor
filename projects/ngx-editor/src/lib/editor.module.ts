import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

import { defaults as defaultLocals } from './Locals';
import { icons } from './icons';
import { NgxEditorConfig } from './types';

import { NgxEditorServiceConfig } from './editor-config.service';
import { NgxEditorComponent } from './editor.component';
import { NgxEditorService, provideMyServiceOptions } from './editor.service';
import { MenuModule } from './modules/menu/menu.module';

import { ImageViewComponent } from './components/image-view/image-view.component';
import { NgxFloatingMenuComponent } from './modules/menu/floating-menu/floating-menu.component';
import { NgxMenuComponent } from './modules/menu/menu.component';

export const NGX_EDITOR_CONFIG_TOKEN = new InjectionToken<NgxEditorConfig>('NgxEditorConfig');

const defaultConfig: NgxEditorConfig = {
  locals: defaultLocals,
  icons,
};

@NgModule({
  imports: [CommonModule, MenuModule, NgxEditorComponent, ImageViewComponent],
  providers: [],
  exports: [NgxEditorComponent, NgxMenuComponent, NgxFloatingMenuComponent],
})
export class NgxEditorModule {
  static forRoot(config: NgxEditorConfig = defaultConfig): ModuleWithProviders<NgxEditorModule> {
    return {
      ngModule: NgxEditorModule,
      providers: [
        {
          provide: NGX_EDITOR_CONFIG_TOKEN,
          useValue: config,
        },
        {
          provide: NgxEditorServiceConfig,
          useFactory: provideMyServiceOptions,
          deps: [NGX_EDITOR_CONFIG_TOKEN],
        },
      ],
    };
  }

  static forChild(config: NgxEditorConfig = defaultConfig): ModuleWithProviders<NgxEditorModule> {
    return {
      ngModule: NgxEditorModule,
      providers: [
        {
          provide: NGX_EDITOR_CONFIG_TOKEN,
          useValue: config,
        },
        {
          provide: NgxEditorServiceConfig,
          useFactory: provideMyServiceOptions,
          deps: [NGX_EDITOR_CONFIG_TOKEN],
        },
        NgxEditorService,
      ],
    };
  }
}
