import { Component, OnInit, HostListener, Input, Output, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { ngxEditorConfig } from './ngx-editor.defaults';
import * as Utils from './ngx-editor.utils';

@Component({
  selector: 'app-ngx-editor',
  templateUrl: './ngx-editor.component.html',
  styleUrls: ['./ngx-editor.component.scss']
})

export class NgxEditorComponent implements OnInit {

  @Output() htmlChange = new EventEmitter();

  @ViewChild('ngxTextArea') textArea: any;

  _config: any;
  _html: any;
  _resizer: string;

  @Input() editable: boolean;
  @Input() spellcheck: boolean;
  @Input() placeholder: string;
  @Input() translate: string;
  @Input() height: string;
  @Input() minHeight: string;
  @Input() width: string;
  @Input() minWidth: string;
  @Input() toolbar: any;

  // set resizer
  @Input()
  set resizer(value: string) {
    console.log(value);
    if (value === 'basic') {
      this._resizer = value;
    }
    else {
      this._resizer = 'stack'
    }
  }
  get resizer(): string {
    return this._resizer || 'stack';
  }

  // set configuration
  @Input()
  set config(value: JSON) {

    for (const i in ngxEditorConfig) {
      if (i) {
        if (this[i]) {
          value[i] = this[i];
        }
        if (!value.hasOwnProperty(i)) {
          value[i] = ngxEditorConfig[i];
        }
      }
    }
    this._config = value;
  }
  get config(): JSON {
    return this._config || ngxEditorConfig;
  }

  // set HTML value
  @Input()
  set html(value: any) {
    this._html = value;
  }
  get html(): any {
    return this._html;
  }

  /*
   * update html on changes in content editable
   */
  htmlContentChange(value) {
    if (value === '<br>') {
      this.htmlChange.emit('');
    } else {
      this.htmlChange.emit(value);
    }
  }

  constructor() { }

  executeCommand(commandName) {
    const isExecuted = document.execCommand(commandName, false, null);
  }

  /*
   * blockquote
   */
  blockQuote() {
    document.execCommand('formatBlock', false, '<blockquote>');
  }

  removeQuote() {
    document.execCommand('formatBlock', false, 'div');
  }

  /*
   * enable or diable toolbar based on configuration
   */
  canEnableToolbarOptions(value) {
    return Utils.canEnableToolbarOptions(value, this.config['toolbar']);
  }

  /*
   * resizing text area
   */
  resizeTextArea(offsetY) {
    let newHeight = parseInt(this.height);
    newHeight += offsetY;
    this.height = newHeight + 'px';
    this.textArea.nativeElement.style.height = this.height;
  }

  // return vertical if the element is the resizer property is set to basic
  canResize() {
    if (this.resizer === 'basic') {
      return 'vertical';
    }
    return false;
  }

  /*
   * ngOnInit
   */
  ngOnInit() {
    this.textArea.nativeElement.innerHTML = this.html || '';

    this.height = this.height || this.textArea.nativeElement.offsetHeight;
  }

}
