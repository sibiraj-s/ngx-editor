import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as Utils from '../common/utils/ngx-editor.utils';

@Component({
  selector: 'app-ngx-editor-toolbar',
  templateUrl: './ngx-editor-toolbar.component.html',
  styleUrls: ['./ngx-editor-toolbar.component.scss']
})

export class NgxEditorToolbarComponent {

  /**
   * Editor configuration
   */
  @Input() config: any;
  /**
   * Emits an event when a toolbar button is clicked
   */
  @Output() execute: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  /**
   * enable or diable toolbar based on configuration
   *
   * @param value name of the toolbar buttons
   */
  canEnableToolbarOptions(value): boolean {
    return Utils.canEnableToolbarOptions(value, this.config['toolbar']);
  }

  /**
   * triggers command from the toolbar to be executed and emits an event
   *
   * @param command name of the command to be executed
   */
  triggerCommand(command: string): void {
    this.execute.emit(command);
  }

}
