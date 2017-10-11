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
  ngxMessage: string;
  enableToolbar = false;

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
    } else {
      this._resizer = 'stack';
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

  constructor(private _element: ElementRef) { }

  /*
   * editor actions
   */
  executeCommand(commandName) {
    document.execCommand(commandName, false, null);
  }

  // blockquote
  blockQuote() {
    document.execCommand('formatBlock', false, '<blockquote>');
  }

  removeQuote() {
    document.execCommand('formatBlock', false, 'div');
  }

  // insert link
  createLink() {
    const selection = document.getSelection();

    if (selection.anchorNode.parentElement.tagName === 'A') {
      const linkURL = prompt('Enter URL', selection.anchorNode.parentElement.getAttribute('href'));
      if (linkURL) {
        document.execCommand('createLink', false, linkURL);
      }
    } else {
      if (selection['type'] === 'None') {
        this.createMessage('No selection made');
      } else {
        const linkURL = prompt('Enter URL', 'http://');
        if (linkURL) {
          document.execCommand('createLink', false, linkURL);
        }
      }
    }
  }

  // insert image
  insertImage() {
    const imageURI = prompt('Enter URL', 'http://');
    if (imageURI) {
      const inserted = document.execCommand('insertImage', false, imageURI);
      if (!inserted) {
        this.createMessage('Invalid URL');
      }
    }
  }

  /*
   * message box
   */
  createMessage(message) {
    this.ngxMessage = message;
    setTimeout(() => {
      this.clearMessage();
    }, 5000);
  }

  clearMessage() {
    this.ngxMessage = undefined;
  }

  /*
   * focus event
   */
  onFocus() {
    this.enableToolbar = true;
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    if (this._element.nativeElement.contains(event.target)) {
      this.enableToolbar = true;
    } else {
      this.enableToolbar = false;
    }
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
    let newHeight = parseInt(this.height, 10);
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

    document.execCommand('enableObjectResizing', true, true);
  }

}
