import { Component, OnInit, HostListener, EventEmitter } from '@angular/core';
import { NgxEditorComponent } from '../ngx-editor.component';

@Component({
  selector: 'app-ngx-grippie',
  templateUrl: './ngx-grippie.component.html',
  styleUrls: ['./ngx-grippie.component.scss']
})

export class NgxGrippieComponent {

  height: number;
  oldY = 0;
  grabber = false;

  constructor(private _editorComponent: NgxEditorComponent) { }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {

    if (!this.grabber) {
      return;
    }

    this._editorComponent.resizeTextArea(event.clientY - this.oldY);
    this.oldY = event.clientY;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.grabber = false;
  }

  @HostListener('mousedown', ['$event']) onResize(event: MouseEvent, resizer?: Function) {
    this.grabber = true;
    this.oldY = event.clientY;
    event.preventDefault();
  }

}
