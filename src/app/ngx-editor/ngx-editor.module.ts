import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorComponent } from './ngx-editor.component';
import { NgxGrippieComponent } from './ngx-grippie/ngx-grippie.component';
import { NgxToolbarComponent } from './ngx-toolbar/ngx-toolbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxEditorComponent, NgxGrippieComponent, NgxToolbarComponent],
  exports: [NgxEditorComponent, NgxGrippieComponent]
})

export class NgxEditorModule { }
