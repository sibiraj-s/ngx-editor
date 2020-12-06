import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxEditorConfig } from './types';

import { NgxEditorComponent } from './ngx-editor.component';
import { NgxEditorServiceConfig, provideMyServiceOptions } from './ngx-editor.service';
import { MenuComponent } from './components/menu/menu.component';
import { SimpleCommandComponent } from './components/menu/simple-command/simple-command.component';
import { LinkComponent } from './components/menu/link/link.component';
import { SanitizeHtmlPipe } from './pipe/sanitize-html.pipe';
import { DropdownComponent } from './components/menu/dropdown/dropdown.component';
import { ImageComponent } from './components/menu/image/image.component';

const NGX_EDITOR_CONFIG_TOKEN = new InjectionToken<NgxEditorConfig>('NgxEditorConfig');

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    NgxEditorComponent,

    // pipes
    SanitizeHtmlPipe,

    // other components
    MenuComponent,
    SimpleCommandComponent,
    LinkComponent,
    DropdownComponent,
    ImageComponent,
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
