import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// components
import { NgxEditorComponent } from './ngx-editor.component';
import { NgxGrippieComponent } from './ngx-grippie/ngx-grippie.component';
import { NgxEditorMessageComponent } from './ngx-editor-message/ngx-editor-message.component';
import { NgxEditorToolbarComponent } from './ngx-editor-toolbar/ngx-editor-toolbar.component';

// services
import { MessageService } from './common/services/message.service';
import { CommandExecutorService } from './common/services/command-executor.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgxEditorComponent, NgxGrippieComponent, NgxEditorMessageComponent, NgxEditorToolbarComponent],
  exports: [NgxEditorComponent],
  providers: [CommandExecutorService, MessageService]
})

export class NgxEditorModule { }
