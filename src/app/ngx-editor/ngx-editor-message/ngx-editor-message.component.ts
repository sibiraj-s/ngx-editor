import { Component } from '@angular/core';

import { MessageService } from '../common/services/message.service';

@Component({
  selector: 'app-ngx-editor-message',
  templateUrl: './ngx-editor-message.component.html',
  styleUrls: ['./ngx-editor-message.component.scss']
})

export class NgxEditorMessageComponent {

  /** property that holds the message to be displayed on the editor */
  ngxMessage = undefined;

  /**
   * @param _messageService service to send message to the editor
   */
  constructor(private _messageService: MessageService) {
    this._messageService.getMessage().subscribe((message: string) => this.ngxMessage = message);
  }

  /**
   * clears editor message
   */
  clearMessage(): void {
    this.ngxMessage = undefined;
    return;
  }
}
