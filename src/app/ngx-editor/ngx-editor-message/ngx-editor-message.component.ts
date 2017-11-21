import { Component } from '@angular/core';
import { MessageService } from '../common/services/message.service';


@Component({
  selector: 'app-ngx-editor-message',
  templateUrl: './ngx-editor-message.component.html',
  styleUrls: ['./ngx-editor-message.component.scss']
})
export class NgxEditorMessageComponent {

  ngxMessage = '';

  constructor(private messageService: MessageService) {
    this.messageService.messages().subscribe((message: string) => this.ngxMessage = message);
  }

  clearMessage() {
    this.ngxMessage = undefined;
  }
}
