import {
  Component, ElementRef, EventEmitter,
  Input, Output, ViewChild
} from '@angular/core';
import { EditorView } from 'prosemirror-view';

@Component({
  selector: 'ngx-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})

export class ImageViewComponent {
  private resizing = false;
  @Input() src: string;
  @Input() alt = '';
  @Input() title = '';
  @Input() outerWidth = '';
  @Input() selected = false;
  @Input() view: EditorView;

  @Output() imageResize = new EventEmitter();

  @ViewChild('imgEl', { static: true }) imgEl: ElementRef;

  constructor() { }

  startResizing(e: MouseEvent): void {
    e.preventDefault();
    this.resizeImage(e);
  }

  resizeImage(evt: MouseEvent): void {
    const startX = evt.pageX;
    const startWidth = this.imgEl.nativeElement.clientWidth;

    const isLeftResize = (evt.target as HTMLElement).dataset.direction === 'left';

    const { width } = window.getComputedStyle(this.view.dom);
    const editorWidth = parseInt(width, 10);

    const onMouseMove = (e: MouseEvent) => {
      const currentX = e.pageX;
      const diffInPx = currentX - startX;
      const computedWidth = isLeftResize ? startWidth - diffInPx : startWidth + diffInPx;

      // prevent image overflow the editor
      // prevent resizng below 20px
      if (computedWidth > editorWidth || computedWidth < 20) {
        return;
      }

      this.outerWidth = `${computedWidth}px`;
    };

    const onMouseUp = (e: MouseEvent) => {
      e.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      this.imageResize.emit();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
