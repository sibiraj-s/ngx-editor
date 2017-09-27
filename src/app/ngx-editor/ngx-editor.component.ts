import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ngxEditorConfig } from './ngx-editor.defaults';

@Component({
  selector: 'app-ngx-editor',
  templateUrl: './ngx-editor.component.html',
  styleUrls: [
    './ngx-editor.component.scss',
    '../../../node_modules/font-awesome/css/font-awesome.css'
  ]
})

export class NgxEditorComponent implements OnInit {

  /*
   * default configurations
   */
  _config: any;

  @Input() set config(value: JSON) {

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

  @Input() spellCheck;
  @Input() placeholder;

  fullScreen = false;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // resize event
  }

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
   * insert HTML
   */
  insertHTML(html) {

  }

  /*
   * toggle full screen
   */
  toggleFullScreen() {
    this.fullScreen = !this.fullScreen;
  }

  ngOnInit() {
    if (this.spellCheck === false) {
      this.config['spellCheck'] = this.spellCheck;
    }

    console.log(this.config)
  }
}
