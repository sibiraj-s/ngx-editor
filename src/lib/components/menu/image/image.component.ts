import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NodeSelection} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { NgxEditorService } from '../../../editor.service';
import Icon from '../../../icons';
import { Image as ImageCommand } from '../MenuCommands';

@Component({
  selector: 'ngx-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent  {
  showPopup = false;
  isActive = false;

  form = new FormGroup({
    src: new FormControl('', [
      Validators.required,
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
    ]),
    alt: new FormControl(''),
    title: new FormControl('')
  });

  editorView: EditorView;
  @Input() name: string;

  constructor(private el: ElementRef, private ngxeService: NgxEditorService) {
    this.editorView = this.ngxeService.view;

    this.ngxeService.editorUpdate.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  @HostBinding('class.NgxEditor__MenuItem--Active') get valid(): boolean {
    return this.isActive || this.showPopup;
  }

  get icon(): string {
    return Icon.get('image');
  }

  get src(): AbstractControl {
    return this.form.get('src');
  }

  @HostListener('document:click', ['$event']) onDocumentClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
      this.hideForm();
    }
  }

  getLabel(key: string): string {
    return this.ngxeService.i18n.get(key);
  }

  hideForm(): void {
    this.showPopup = false;
    this.form.reset({
      src: '',
      alt: '',
      title: ''
    });
  }

  onMouseDown(e: MouseEvent): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    this.showPopup = !this.showPopup;

    if (this.showPopup) {
      this.fillForm();
    }
  }

  fillForm(): void {
    const { state } = this.editorView;
    const { selection } = state;
    if (selection instanceof NodeSelection && this.isActive) {
      const { src, alt = '', title = '' } = selection.node.attrs;

      this.form.setValue({
        src,
        alt,
        title
      });
    }
  }

  update = (view: EditorView) => {
    const { state } = view;
    this.isActive = ImageCommand.isActive(state);
  }

  insertLink(e: MouseEvent): void {
    e.preventDefault();
    const { src, alt, title } = this.form.getRawValue();
    const { dispatch, state } = this.editorView;

    const attrs = {
      src,
      alt,
      title
    };

    ImageCommand.execute(attrs, state, dispatch);
    this.hideForm();
  }
}
