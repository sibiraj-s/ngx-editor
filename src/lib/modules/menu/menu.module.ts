import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuService } from './menu.service';

import { MenuComponent } from './menu.component';
import { ToggleCommandComponent } from './toggle-command/toggle-command.component';
import { LinkComponent } from './link/link.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ImageComponent } from './image/image.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';

import { SanitizeHtmlPipe } from '../../pipes/sanitize/sanitize-html.pipe';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    // pipes
    SanitizeHtmlPipe,

    // components
    MenuComponent,
    ToggleCommandComponent,
    LinkComponent,
    DropdownComponent,
    ImageComponent,
    ColorPickerComponent,
    FloatingMenuComponent,
  ],
  providers: [
    MenuService,
    SanitizeHtmlPipe
  ],
  exports: [
    MenuComponent
  ],
})

export class MenuModule { }
