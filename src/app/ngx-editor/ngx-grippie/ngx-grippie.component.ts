import { Component, HostListener } from '@angular/core';
import { NgxEditorComponent } from '../ngx-editor.component';

@Component({
  selector: 'app-ngx-grippie',
  templateUrl: './ngx-grippie.component.html',
  styleUrls: ['./ngx-grippie.component.scss']
})

export class NgxGrippieComponent {

  /** height of the editor */
  height: number;
  /** previous value befor resizing the editor */
  oldY = 0;
  /** set to true on mousedown event */
  grabber = false;

  /**
   * Constructor
   *
   * @param _editorComponent Editor component
   */
  constructor(private _editorComponent: NgxEditorComponent) { }

  /**
   *
   * @param event Mouseevent
   *
   * Update the height of the editor when the grabber is dragged
   */
  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {

    if (!this.grabber) {
      return;
    }

    this._editorComponent.resizeTextArea(event.clientY - this.oldY);
    this.oldY = event.clientY;
  }

  /**
   *
   * @param event Mouseevent
   *
   * set the grabber to false on mouse up action
   */
  @HostListener('document:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    this.grabber = false;
  }

  @HostListener('mousedown', ['$event']) onResize(event: MouseEvent, resizer?: Function) {
    this.grabber = true;
    this.oldY = event.clientY;
    event.preventDefault();
  }

}
