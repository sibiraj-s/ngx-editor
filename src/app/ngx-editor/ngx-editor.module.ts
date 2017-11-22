import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { NgxEditorComponent } from './ngx-editor.component';
import { NgxGrippieComponent } from './ngx-grippie/ngx-grippie.component';
import { NgxToolbarComponent } from './ngx-toolbar/ngx-toolbar.component';
import { NgxEditorMessageComponent } from './ngx-editor-message/ngx-editor-message.component';

// services
import { MessageService } from './common/services/message.service';
import { CommandExecutorService } from './common/services/command-executor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxEditorComponent, NgxGrippieComponent, NgxToolbarComponent, NgxEditorMessageComponent],
  exports: [NgxEditorComponent, NgxGrippieComponent],
  providers: [CommandExecutorService, MessageService]
})

export class NgxEditorModule { }
