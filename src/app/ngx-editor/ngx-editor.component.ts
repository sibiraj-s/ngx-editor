import {Component, OnInit, HostListener, Input, Output, ElementRef, EventEmitter, ViewChild} from '@angular/core';
import {ngxEditorConfig} from './ngx-editor.defaults';
import {CommandExecutor} from './command-executor';
import {MessageService} from './ngx-editor-message/message.service';

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

  constructor(private _element: ElementRef, private messageService: MessageService, private commandExecutor: CommandExecutor) {
  }

  /*
   * focus event
   */
  onFocus() {
    this.enableToolbar = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event) {
    this.enableToolbar = !!this._element.nativeElement.contains(event.target);
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

    this.executeCommand('enableObjectResizing');
  }

  /*
 * editor actions
 */
  executeCommand(commandName) {
    this.messageService.send(commandName);
     try {
       this.commandExecutor.execute(commandName);
     } catch (error) {
       this.messageService.send(error.message);
     }
  }
}
