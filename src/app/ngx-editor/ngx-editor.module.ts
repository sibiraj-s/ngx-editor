import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorComponent } from './ngx-editor.component';
import { NgxResizerModule } from 'ngx-resizer';

@NgModule({
  imports: [
    CommonModule,
    NgxResizerModule
  ],
  declarations: [
    NgxEditorComponent
  ],
  exports: [
    NgxEditorComponent
  ]
})

export class NgxEditorModule { }
