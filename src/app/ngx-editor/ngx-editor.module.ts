import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorComponent } from './ngx-editor.component';
import { NgxGrippieComponent } from './ngx-grippie/ngx-grippie.component';
import { NgxToolbarComponent } from './ngx-toolbar/ngx-toolbar.component';
import { NgxEditorMessageComponent } from './ngx-editor-message/ngx-editor-message.component';
import { MessageService } from './ngx-editor-message/message.service';
import { CommandExecutor } from './command-executor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxEditorComponent, NgxGrippieComponent, NgxToolbarComponent, NgxEditorMessageComponent],
  exports: [NgxEditorComponent, NgxGrippieComponent],
  providers: [CommandExecutor, MessageService]
})

export class NgxEditorModule { }
