import {
  Component, ElementRef,
  HostListener, Input, OnDestroy, OnInit,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorView } from 'prosemirror-view';
import { Observable, Subscription } from 'rxjs';
import { uniq } from 'ngx-editor/utils';

import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import { Link as LinkCommand } from '../MenuCommands';
import { HTML } from '../../../trustedTypesUtil';

@Component({
  selector: 'ngx-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})

export class LinkComponent implements OnInit, OnDestroy {
  @Input() showOpenInNewTab = true;

  showPopup = false;
  isActive = false;
  canExecute = true;
  private componentId = uniq();
  form: FormGroup;

  private editorView: EditorView;
  private updateSubscription: Subscription;

  constructor(
    private el: ElementRef,
    private ngxeService: NgxEditorService,
    private menuService: MenuService,
  ) { }

  get icon(): HTML {
    return this.ngxeService.getIcon(this.isActive ? 'unlink' : 'link');
  }

  get title(): Observable<string> {
    return this.ngxeService.locals.get(this.isActive ? 'removeLink' : 'insertLink');
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

  getId(name:string): string {
    return `${name}-${this.componentId}`;
  }

  getLabel(key: string): Observable<string> {
    return this.ngxeService.locals.get(key);
  }

  private hideForm(): void {
    this.showPopup = false;
    this.form.reset({
      href: '',
      text: '',
      openInNewTab: true,
    });
    this.text.enable();
  }

  onMouseDown(e: MouseEvent): void {
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
  };

  private update = (view: EditorView) => {
    const { state } = view;
    this.isActive = LinkCommand.isActive(state, { strict: false });
    this.canExecute = LinkCommand.canExecute(state);
  };

  insertLink(e: MouseEvent): void {
    e.preventDefault();
    const { text, href, openInNewTab } = this.form.getRawValue();
    const { dispatch, state } = this.editorView;
    const { selection } = state;

    let target: string | undefined;

    if (this.showOpenInNewTab) {
      target = openInNewTab ? '_blank' : '_self';
    }

    const attrs = {
      title: href,
      href,
      target,
    };

    if (selection.empty) {
      LinkCommand.insert(text, attrs)(state, dispatch);
      this.editorView.focus();
    } else {
      LinkCommand.update(attrs)(state, dispatch);
    }
    this.hideForm();
  }

  ngOnInit(): void {
    this.editorView = this.menuService.editor.view;

    this.form = new FormGroup({
      href: new FormControl('', [
        Validators.required,
        Validators.pattern(this.menuService.editor.linkValidationPattern),
      ]),
      text: new FormControl('', [Validators.required]),
      openInNewTab: new FormControl(true),
    });

    this.updateSubscription = this.menuService.editor.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
