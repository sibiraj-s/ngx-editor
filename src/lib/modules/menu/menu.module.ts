import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from './menu.component';
import { ToggleCommandComponent } from './toggle-command/toggle-command.component';
import { LinkComponent } from './link/link.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ImageComponent } from './image/image.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';

import { SanitizeHtmlPipe } from '../../pipes/sanitize/sanitize-html.pipe';

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
    ColorPickerComponent
  ],
  providers: [
    SanitizeHtmlPipe,
  ],
  exports: [
    MenuComponent
  ],
})

export class MenuModule { }
