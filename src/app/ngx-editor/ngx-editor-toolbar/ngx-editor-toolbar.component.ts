import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as Utils from '../common/utils/ngx-editor.utils';

@Component({
  selector: 'app-ngx-editor-toolbar',
  templateUrl: './ngx-editor-toolbar.component.html',
  styleUrls: ['./ngx-editor-toolbar.component.scss']
})

export class NgxEditorToolbarComponent {

  @Input() config: any;
  @Input() enableToolbar = false;
  @Output() execute = new EventEmitter();

  constructor() { }

  /*
   * enable or diable toolbar based on configuration
   */
  canEnableToolbarOptions(value) {
    return Utils.canEnableToolbarOptions(value, this.config['toolbar']);
  }

  triggerCommand(command: string): void {
    this.execute.emit(command);
  }

}
