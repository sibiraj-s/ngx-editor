import { Component, OnInit, Input, Output, ViewChild, HostListener, ElementRef, EventEmitter } from '@angular/core';

import { CommandExecutorService } from './common/services/command-executor.service';
import { MessageService } from './common/services/message.service';

import { ngxEditorConfig } from './common/ngx-editor.defaults';
import * as Utils from './common/utils/ngx-editor.utils';

@Component({
  selector: 'app-ngx-editor',
  templateUrl: './ngx-editor.component.html',
  styleUrls: ['./ngx-editor.component.scss']
})

export class NgxEditorComponent implements OnInit {

  @Input() editable: boolean;
  @Input() spellcheck: boolean;
  @Input() placeholder: string;
  @Input() translate: string;
  @Input() height: string;
  @Input() minHeight: string;
  @Input() width: string;
  @Input() minWidth: string;
  @Input() toolbar: any;
  @Input() html = '';
  @Input() resizer = 'stack';
  @Input() config = ngxEditorConfig;

  @ViewChild('ngxTextArea') textArea: any;

  @Output() htmlChange: EventEmitter<string> = new EventEmitter<string>();

  enableToolbar = false;
  Utils = Utils;

  constructor(
    private _elementRef: ElementRef,
    private _messageService: MessageService,
    private _commandExecutor: CommandExecutorService) { }

  /*
   * events
   */
  onFocus() {
    this.enableToolbar = true;
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.enableToolbar = !!this._elementRef.nativeElement.contains(event.target);
  }

  onContentChange(value) {
    this.htmlChange.emit(value);
  }

  /*
   * resizing text area
   */
  resizeTextArea(offsetY: number) {
    let newHeight = parseInt(this.height, 10);
    newHeight += offsetY;
    this.height = newHeight + 'px';
    this.textArea.nativeElement.style.height = this.height;
  }

  /*
  * editor actions
  */
  executeCommand(commandName: string) {
    try {
      this._commandExecutor.execute(commandName);
    } catch (error) {
      this._messageService.sendMessage(error.message);
    }
  }

  // update view
  refreshContent() {
    this.textArea.nativeElement.innerHTML = this.html || '';
  }

  ngOnInit() {
    // set configuartion
    this.config = Utils.getEditorConfiguration(this.config, ngxEditorConfig);

    this.height = this.height || this.textArea.nativeElement.offsetHeight;

    this.refreshContent();

    this.executeCommand('enableObjectResizing');
  }

}
