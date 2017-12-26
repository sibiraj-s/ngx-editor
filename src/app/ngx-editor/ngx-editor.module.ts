import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { NgxEditorComponent } from './ngx-editor.component';
import { NgxGrippieComponent } from './ngx-grippie/ngx-grippie.component';
import { NgxEditorMessageComponent } from './ngx-editor-message/ngx-editor-message.component';
import { NgxEditorToolbarComponent } from './ngx-editor-toolbar/ngx-editor-toolbar.component';

// services
import { MessageService } from './common/services/message.service';
import { CommandExecutorService } from './common/services/command-executor.service';

// external modules
import { PopoverModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    PopoverModule.forRoot()
  ],
  declarations: [NgxEditorComponent, NgxGrippieComponent, NgxEditorMessageComponent, NgxEditorToolbarComponent],
  exports: [NgxEditorComponent],
  providers: [CommandExecutorService, MessageService]
})

export class NgxEditorModule { }
