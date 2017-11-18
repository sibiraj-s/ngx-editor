import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ngx-editor-message',
  templateUrl: './ngx-editor-message.component.html',
  styleUrls: ['./ngx-editor-message.component.scss']
})
export class NgxEditorMessageComponent implements OnInit {

  @Input() ngxMessage = '';

  constructor() { }

  ngOnInit() {
  }

}
