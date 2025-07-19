import { CommonModule } from '@angular/common';
import {
  Component, ElementRef, EventEmitter, Output, ViewChild,
  input,
  model
} from '@angular/core';
import { EditorView } from 'prosemirror-view';

@Component({
  selector: 'ngx-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
  imports: [CommonModule],
})
export class ImageViewComponent {
  readonly src = input<string>(undefined);
  readonly alt = input('');
  readonly title = input('');
  readonly selected = input(false);
  readonly view = input<EditorView>(undefined);

  // should it be model??
  readonly outerWidth = model('');

  @Output() imageResize = new EventEmitter();

  @ViewChild('imgEl', { static: true }) imgEl: ElementRef;

  startResizing(e: MouseEvent, direction: string): void {
    e.preventDefault();
    this.resizeImage(e, direction);
  }

  resizeImage(evt: MouseEvent, direction: string): void {
    const startX = evt.pageX;
    const startWidth = this.imgEl.nativeElement.clientWidth;

    const isLeftResize = direction === 'left';

    const { width } = window.getComputedStyle(this.view().dom);
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

      this.outerWidth.set(`${computedWidth}px`);
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
