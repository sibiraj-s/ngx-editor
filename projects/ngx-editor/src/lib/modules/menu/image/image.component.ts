import {
  Component, ElementRef, HostBinding,
  HostListener, OnDestroy, OnInit,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NodeSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Subscription } from 'rxjs';

import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import Icon from '../../../icons';
import { Image as ImageCommand } from '../MenuCommands';

@Component({
  selector: 'ngx-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, OnDestroy {
  showPopup = false;
  isActive = false;
  private updateSubscription: Subscription;

  form = new FormGroup({
    src: new FormControl('', [
      Validators.required,
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/??([^#\n\r]*)?#?([^\n\r]*)'),
    ]),
    alt: new FormControl(''),
    title: new FormControl(''),
  });

  private editorView: EditorView;

  constructor(
    private el: ElementRef,
    private ngxeService: NgxEditorService,
    private menuService: MenuService,
  ) { }

  @HostBinding('class.NgxEditor__MenuItem--Active') get valid(): boolean {
    return this.isActive || this.showPopup;
  }

  get icon(): string {
    return Icon.get('image');
  }

  get src(): AbstractControl {
    return this.form.get('src');
  }

  @HostListener('document:mousedown', ['$event']) onDocumentClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
      this.hideForm();
    }
  }

  getLabel(key: string): string {
    return this.ngxeService.locals.get(key);
  }

  private hideForm(): void {
    this.showPopup = false;
    this.form.reset({
      src: '',
      alt: '',
      title: '',
    });
  }

  onMouseDown(e: MouseEvent): void {
    if (e.button !== 0) {
      return;
    }

    this.showPopup = !this.showPopup;

    if (this.showPopup) {
      this.fillForm();
    }
  }

  private fillForm(): void {
    const { state } = this.editorView;
    const { selection } = state;
    if (selection instanceof NodeSelection && this.isActive) {
      const { src, alt = '', title = '' } = selection.node.attrs;

      this.form.setValue({
        src,
        alt,
        title,
      });
    }
  }

  private update = (view: EditorView) => {
    const { state } = view;
    this.isActive = ImageCommand.isActive(state);
  };

  insertLink(e: MouseEvent): void {
    e.preventDefault();
    const { src, alt, title } = this.form.getRawValue();
    const { dispatch, state } = this.editorView;

    const attrs = {
      alt,
      title,
    };

    ImageCommand.insert(src, attrs)(state, dispatch);
    this.editorView.focus();
    this.hideForm();
  }

  ngOnInit(): void {
    this.editorView = this.menuService.editor.view;

    this.updateSubscription = this.menuService.editor.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
