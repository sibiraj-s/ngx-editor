import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorView } from 'prosemirror-view';
import { Subscription } from 'rxjs';

import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import Icon from '../../../icons';
import { Link as LinkCommand } from '../MenuCommands';

@Component({
  selector: 'ngx-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})

export class LinkComponent implements OnDestroy {
  showPopup = false;
  isActive = false;
  private canExecute = true;
  private editorView: EditorView;
  private pluginUpdateSubscription: Subscription;

  @Input() name: string;

  form = new FormGroup({
    href: new FormControl('', [
      Validators.required,
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
    ]),
    text: new FormControl('', [Validators.required]),
    openInNewTab: new FormControl(true)
  });

  constructor(
    private el: ElementRef,
    private ngxeService: NgxEditorService,
    private menuService: MenuService
  ) {
    this.editorView = this.menuService.view;

    this.pluginUpdateSubscription = this.menuService.plugin.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  @HostBinding('class.NgxEditor__MenuItem--Active') get valid(): boolean {
    return this.isActive || this.showPopup;
  }

  @HostBinding('class.NgxEditor--Disabled') get disabled(): boolean {
    return !this.canExecute;
  }

  get icon(): string {
    return Icon.get(this.isActive ? 'unlink' : 'link');
  }

  get href(): AbstractControl {
    return this.form.get('href');
  }

  get text(): AbstractControl {
    return this.form.get('text');
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
      href: '',
      text: '',
      openInNewTab: true
    });
    this.text.enable();
  }

  onMouseDown(e: MouseEvent): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    const { state, dispatch } = this.editorView;

    if (this.isActive) {
      LinkCommand.remove(state, dispatch);
      return;
    }

    this.showPopup = !this.showPopup;
    if (this.showPopup) {
      this.setText();
    }
  }

  private setText = () => {
    const { state: { selection, doc } } = this.editorView;
    const { empty, from, to } = selection;
    const selectedText = !empty ? doc.textBetween(from, to) : '';

    if (selectedText) {
      this.text.patchValue(selectedText);
      this.text.disable();
    }
  }

  private update = (view: EditorView) => {
    const { state } = view;
    this.isActive = LinkCommand.isActive(state, { strict: false });
    this.canExecute = LinkCommand.canExecute(state);
  }

  insertLink(e: MouseEvent): void {
    e.preventDefault();
    const { text, href, openInNewTab } = this.form.getRawValue();
    const { dispatch, state } = this.editorView;
    const { selection } = state;

    const attrs = {
      title: href,
      href,
      target: openInNewTab ? '_blank' : '_self'
    };

    if (selection.empty) {
      LinkCommand.insert(text, attrs, state, dispatch);
      this.editorView.focus();
    } else {
      LinkCommand.update(attrs, state, dispatch);
    }
    this.hideForm();
  }

  ngOnDestroy(): void {
    this.pluginUpdateSubscription.unsubscribe();
  }
}
