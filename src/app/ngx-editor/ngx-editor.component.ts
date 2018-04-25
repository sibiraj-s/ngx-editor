import {
  Component, OnInit, Input, Output, ViewChild,
  EventEmitter, Renderer2, forwardRef
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

  /** Specifies weather the textarea to be editable or not */
  @Input() editable: boolean;
  /** The spellcheck property specifies whether the element is to have its spelling and grammar checked or not. */
  @Input() spellcheck: boolean;
  /** Placeholder for the textArea */
  @Input() placeholder: string;
  /**
   * The translate property specifies whether the content of an element should be translated or not.
   *
   * Check https://www.w3schools.com/tags/att_global_translate.asp for more information and browser support
   */
  @Input() translate: string;
  /** Sets height of the editor */
  @Input() height: string;
  /** Sets minimum height for the editor */
  @Input() minHeight: string;
  /** Sets Width of the editor */
  @Input() width: string;
  /** Sets minimum width of the editor */
  @Input() minWidth: string;
  /**
   * Toolbar accepts an array which specifies the options to be enabled for the toolbar
   *
   * Check ngxEditorConfig for toolbar configuration
   *
   * Passing an empty array will enable all toolbar
   */
  @Input() toolbar: Object;
  /**
   * The editor can be resized vertically.
   *
   * `basic` resizer enables the html5 reszier. Check here https://www.w3schools.com/cssref/css3_pr_resize.asp
   *
   * `stack` resizer enable a resizer that looks like as if in https://stackoverflow.com
   */
  @Input() resizer = 'stack';
  /**
   * The config property is a JSON object
   *
   * All avaibale inputs inputs can be provided in the configuration as JSON
   * inputs provided directly are considered as top priority
   */
  @Input() config = ngxEditorConfig;
  /** Weather to show or hide toolbar */
  @Input() showToolbar: boolean;
  /** Weather to enable or disable the toolbar */
  @Input() enableToolbar: boolean;
  /** Endpoint for which the image to be uploaded */
  @Input() imageEndPoint: string;

  /** emits `blur` event when focused out from the textarea */
  @Output() blur: EventEmitter<string> = new EventEmitter<string>();
  /** emits `focus` event when focused in to the textarea */
  @Output() focus: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('ngxTextArea') textArea: any;
  @ViewChild('ngxWrapper') ngxWrapper: any;

  Utils: any = Utils;

  private onChange: (value: string) => void;
  private onTouched: () => void;

  /**
   * @param _messageService service to send message to the editor message component
   * @param _commandExecutor executes command from the toolbar
   * @param _renderer access and manipulate the dom element
   */
  constructor(
    private _messageService: MessageService,
    private _commandExecutor: CommandExecutorService,
    private _renderer: Renderer2) { }

  /**
   * events
   */
  onTextAreaFocus(): void {
    this.focus.emit('focus');
    return;
  }

  /** focus the text area when the editor is focussed */
  onEditorFocus() {
    this.textArea.nativeElement.focus();
  }

  /**
   * Executed from the contenteditable section while the input property changes
   * @param html html string from contenteditable
   */
  onContentChange(html: string): void {

    if (typeof this.onChange === 'function') {
      this.onChange(html);
      this.togglePlaceholder(html);
    }

    return;
  }

  onTextAreaBlur(): void {

    /** save selection if focussed out */
    this._commandExecutor.savedSelection = Utils.saveSelection();

    if (typeof this.onTouched === 'function') {
      this.onTouched();
    }
    this.blur.emit('blur');
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

    this.togglePlaceholder(value);

    if (value === null || value === undefined || value === '' || value === '<br>') {
      value = null;
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
    const normalizedValue = value === null ? '' : value;
    this._renderer.setProperty(this.textArea.nativeElement, 'innerHTML', normalizedValue);
    return;
  }

  /**
   * toggles placeholder based on input string
   *
   * @param value A HTML string from the editor
   */
  togglePlaceholder(value: any): void {
    if (!value || value === '<br>' || value === '') {
      this._renderer.addClass(this.ngxWrapper.nativeElement, 'show-placeholder');
    } else {
      this._renderer.removeClass(this.ngxWrapper.nativeElement, 'show-placeholder');
    }
    return;
  }

  /**
   * returns a json containing input params
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
      enableToolbar: this.enableToolbar,
      showToolbar: this.showToolbar,
      imageEndPoint: this.imageEndPoint,
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
