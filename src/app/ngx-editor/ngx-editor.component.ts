import {
  Component, OnInit, OnChanges, Input,
  Output, ViewChild, HostListener, ElementRef, EventEmitter, SimpleChanges
} from '@angular/core';

import { CommandExecutorService } from './common/services/command-executor.service';
import { MessageService } from './common/services/message.service';

import { ngxEditorConfig } from './common/ngx-editor.defaults';
import * as Utils from './common/utils/ngx-editor.utils';

@Component({
  selector: 'app-ngx-editor',
  templateUrl: './ngx-editor.component.html',
  styleUrls: ['./ngx-editor.component.scss']
})

export class NgxEditorComponent implements OnInit, OnChanges {

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
  lastViewModel: any;

  constructor(
    private _elementRef: ElementRef,
    private _messageService: MessageService,
    private _commandExecutor: CommandExecutorService) { }

  /*
   * events
   */
  onFocus(): void {
    this.enableToolbar = true;
    return;
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.enableToolbar = !!this._elementRef.nativeElement.contains(event.target);
  }

  onContentChange(html): void {
    this.update(html);
    return;
  }

  onBlur(html): void {
    this.update(html);
    return;
  }

  /*
   * resizing text area
   */
  resizeTextArea(offsetY: number): void {
    let newHeight = parseInt(this.height, 10);
    newHeight += offsetY;
    this.height = newHeight + 'px';
    this.textArea.nativeElement.style.height = this.height;
    return;
  }

  /*
  * editor actions
  */
  executeCommand(commandName: string): void {
    try {
      this._commandExecutor.execute(commandName);
    } catch (error) {
      this._messageService.sendMessage(error.message);
    }
    return;
  }

  // update view
  refreshView(): void {
    this.textArea.nativeElement.innerHTML = this.html || '';
    return;
  }

  update(value): void {
    this.lastViewModel = value;
    this.htmlChange.emit(value);
    return;
  }

  ngOnInit() {
    // set configuartion
    this.config = this.Utils.getEditorConfiguration(this.config, ngxEditorConfig);

    this.height = this.height || this.textArea.nativeElement.offsetHeight;

    this.executeCommand('enableObjectResizing');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.lastViewModel !== changes.html.currentValue) {
      this.refreshView();
    }
  }

}
