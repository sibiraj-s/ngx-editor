import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEditorConfig } from './types';
import { defaults as defaultLocals } from './Locals';
import { icons } from './icons';

import { NgxEditorComponent } from './editor.component';
import { NgxEditorServiceConfig } from './editor-config.service';
import { NgxEditorService, provideMyServiceOptions } from './editor.service';
import { MenuModule } from './modules/menu/menu.module';

import { MenuComponent } from './modules/menu/menu.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { FloatingMenuComponent } from './modules/menu/floating-menu/floating-menu.component';

export const NGX_EDITOR_CONFIG_TOKEN = new InjectionToken<NgxEditorConfig>('NgxEditorConfig');

const defaultConfig: NgxEditorConfig = {
  locals: defaultLocals,
  icons,
};

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
  ],
  providers: [],
  declarations: [
    NgxEditorComponent,
    ImageViewComponent,
  ],
  exports: [
    NgxEditorComponent,
    MenuComponent,
    FloatingMenuComponent,
  ],
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
