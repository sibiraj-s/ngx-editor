import { Component, OnInit, Input, Output, ViewChild, HostListener, ElementRef, EventEmitter } from '@angular/core';

import { ngxEditorConfig } from './common/ngx-editor.defaults';
import { CommandExecutorService } from './common/services/command-executor.service';
import { MessageService } from './common/services/message.service';
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

  @Output() htmlChange = new EventEmitter();

  @ViewChild('ngxTextArea') textArea: any;

  enableToolbar = false;
  Utils = Utils;

  /*
   * update html on changes in content editable
   */
  htmlContentChange(value: string) {
    if (value === '<br>') {
      this.htmlChange.emit('');
    } else {
      this.htmlChange.emit(value);
    }
  }

  constructor(
    private _element: ElementRef,
    private _messageService: MessageService,
    private _commandExecutor: CommandExecutorService) { }

  /*
   * events
   */
  onFocus() {
    this.enableToolbar = true;
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.enableToolbar = !!this._element.nativeElement.contains(event.target);
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

  ngOnInit() {
    // set configuartion
    this.config = Utils.getEditorConfiguration(this.config, ngxEditorConfig);

    this.textArea.nativeElement.innerHTML = this.html || '';

    this.height = this.height || this.textArea.nativeElement.offsetHeight;

    this.executeCommand('enableObjectResizing');
  }

}
