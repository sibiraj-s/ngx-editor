import {Component, Input} from '@angular/core';
import * as Utils from './ngx-editor.utils';

@Component({
  selector: 'app-ngx-toolbar',
  templateUrl: './ngx-toolbar.component.html',
  styleUrls: ['./ngx-toolbar.component.scss']
})
export class NgxToolbarComponent {

  @Input() config: any;
  @Input() enableToolbar = false;

  constructor() {
  }

  /*
 * enable or diable toolbar based on configuration
 */
  canEnableToolbarOptions(value) {
    return Utils.canEnableToolbarOptions(value, this.config['toolbar']);
  }
}
