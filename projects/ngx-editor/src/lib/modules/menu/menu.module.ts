import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BubbleComponent } from './bubble/bubble.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NgxEditorFloatingMenuComponent } from './floating-menu/floating-menu.component';
import { ImageComponent } from './image/image.component';
import { LinkComponent } from './link/link.component';
import { NgxEditorMenuComponent } from './menu.component';
import { ToggleCommandComponent } from './toggle-command/toggle-command.component';

import { SanitizeHtmlPipe } from '../../pipes/sanitize/sanitize-html.pipe';
import { InsertCommandComponent } from './insert-command/insert-command.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // pipes
    SanitizeHtmlPipe,
    // components
    NgxEditorMenuComponent,
    ToggleCommandComponent,
    InsertCommandComponent,
    LinkComponent,
    DropdownComponent,
    ImageComponent,
    ColorPickerComponent,
    NgxEditorFloatingMenuComponent,
    BubbleComponent,
  ],
  providers: [
    SanitizeHtmlPipe,
  ],
  exports: [
    NgxEditorMenuComponent,
    NgxEditorFloatingMenuComponent,
  ],
})
export class MenuModule {}
