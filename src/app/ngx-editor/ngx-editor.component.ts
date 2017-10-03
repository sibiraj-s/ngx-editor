import { Component, OnInit, HostListener, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { ngxEditorConfig } from './ngx-editor.defaults';

@Component({
  selector: 'app-ngx-editor',
  templateUrl: './ngx-editor.component.html',
  styleUrls: ['./ngx-editor.component.scss']
})

export class NgxEditorComponent implements OnInit {

  @Output() htmlChange = new EventEmitter();

  /*
   * default configurations
   */
  _config: any;
  _html: any;

  /*
   * set default values
   */

  // set configuration
  @Input()
  set config(value: JSON) {

    for (const i in ngxEditorConfig) {
      if (!value.hasOwnProperty(i)) {
        value[i] = ngxEditorConfig[i];
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

  @Input() editable: boolean;
  @Input() spellcheck: boolean;
  @Input() placeholder: string;
  @Input() translate: string;

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

  constructor(private element: ElementRef) { }

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
   * return values for attributes that accepts boolean
   */
  getBooleanProperty(value) {
    if (this[value] === false) {
      return false;
    }
    if (this[value] === undefined) {
      return this.config[value];
    }
    return true;
  }

  /*
   * ngOnInit
   */
  ngOnInit() {
    this.element.nativeElement.getElementsByClassName('textarea')[0].innerHTML = this.html || '';
  }

}
