import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as Utils from './ngx-editor.utils';

@Component({
  selector: 'app-ngx-toolbar',
  templateUrl: './ngx-toolbar.component.html',
  styleUrls: ['./ngx-toolbar.component.scss']
})
export class NgxToolbarComponent {

  @Input() config: any;
  @Input() enableToolbar = false;
  @Output('triggerCommand') _triggerCommand = new EventEmitter();

  constructor() {
  }

  /*
 * enable or diable toolbar based on configuration
 */
  canEnableToolbarOptions(value) {
    return Utils.canEnableToolbarOptions(value, this.config['toolbar']);
  }

  triggerCommand(command: string): void {
    this._triggerCommand.emit(command);
  }
}
