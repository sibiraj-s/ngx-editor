import {
  Component, OnInit, Input, Output,
  ViewChild, HostListener, ElementRef, EventEmitter,
  Renderer2, forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { CommandExecutorService } from './common/services/command-executor.service';
import { MessageService } from './common/services/message.service';

import { ngxEditorConfig } from './common/ngx-editor.defaults';
import * as Utils from './common/utils/ngx-editor.utils';

@Component({
  selector: 'app-ngx-editor',
  templateUrl: './ngx-editor.component.html',
  styleUrls: ['./ngx-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxEditorComponent),
      multi: true
    }
  ]
})

export class NgxEditorComponent implements OnInit, ControlValueAccessor {

  @Input() editable: boolean;
  @Input() spellcheck: boolean;
  @Input() placeholder: string;
  @Input() translate: string;
  @Input() height: string;
  @Input() minHeight: string;
  @Input() width: string;
  @Input() minWidth: string;
  @Input() toolbar: any;
  @Input() resizer = 'stack';
  @Input() config = ngxEditorConfig;
  @Input() showToolbar = true;

  @ViewChild('ngxTextArea') textArea: any;

  enableToolbar = false;
  Utils = Utils;

  private lastViewModel: any = '';
  private onChange: (value: string) => void;
  private onTouched: () => void;
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  /**
   *
   * @param _elementRef  api to access dom element
   * @param _messageService service to send message to the editor message component
   * @param _commandExecutor executes command from the toolbar
   * @param _renderer access and manipulate the dom element
   */
  constructor(
    private _elementRef: ElementRef,
    private _messageService: MessageService,
    private _commandExecutor: CommandExecutorService,
    private _renderer: Renderer2) { }

  /**
   * events
   */
  onFocus(): void {
    this.enableToolbar = true;
    this.focus.emit();
    return;
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.enableToolbar = !!this._elementRef.nativeElement.contains(event.target);
  }

  /**
   *
   * @param html html string from contenteditable
   */
  onContentChange(html: string): void {

    if (typeof this.onChange === 'function') {
      this.onChange(html);
    }

    return;
  }

  onBlur(): void {

    if (typeof this.onTouched === 'function') {
      this.onTouched();
    }
    this.blur.emit();
    return;
  }

  /**
   * resizing text area
   *
   * @param offsetY vertical height of the eidtable portion of the editor
   */
  resizeTextArea(offsetY: number): void {
    let newHeight = parseInt(this.height, 10);
    newHeight += offsetY;
    this.height = newHeight + 'px';
    this.textArea.nativeElement.style.height = this.height;
    return;
  }

  /**
   * editor actions, i.e., executes command from toolbar
   *
   * @param commandName name of the command to be executed
   */
  executeCommand(commandName: string): void {
    try {
      this._commandExecutor.execute(commandName);
    } catch (error) {
      this._messageService.sendMessage(error.message);
    }
    return;
  }

  /**
   * Write a new value to the element.
   *
   * @param value value to be executed when there is a change in contenteditable
   */
  writeValue(value: any): void {
    if (value === undefined) {
      return;
    }

    this.refreshView(value);
  }

  /**
   * Set the function to be called
   * when the control receives a change event.
   *
   * @param fn a function
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Set the function to be called
   * when the control receives a touch event.
   *
   * @param fn a function
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * refresh view/HTML of the editor
   *
   * @param value html string from the editor
   */
  refreshView(value: string): void {
    const normalizedValue = value == null ? '' : value;
    this._renderer.setProperty(this.textArea.nativeElement, 'innerHTML', normalizedValue);
    return;
  }

  /**
   * return a json containing input params
   */
  getCollectiveParams(): any {
    return {
      editable: this.editable,
      spellcheck: this.spellcheck,
      placeholder: this.placeholder,
      translate: this.translate,
      height: this.height,
      minHeight: this.minHeight,
      width: this.width,
      minWidth: this.minWidth,
      toolbar: this.toolbar
    };
  }

  ngOnInit() {
    /**
     * set configuartion
     */
    this.config = this.Utils.getEditorConfiguration(this.config, ngxEditorConfig, this.getCollectiveParams());

    this.height = this.height || this.textArea.nativeElement.offsetHeight;

    this.executeCommand('enableObjectResizing');
  }

}
