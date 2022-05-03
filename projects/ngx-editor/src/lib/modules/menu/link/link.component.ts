import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EditorView } from 'prosemirror-view';
import { Subscription } from 'rxjs';

import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import Icon from '../../../icons';
import { Link as LinkCommand } from '../MenuCommands';

@Component({
  selector: 'ngx-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit, OnDestroy {
  showPopup = false;
  isActive = false;
  private canExecute = true;
  private editorView: EditorView;
  private updateSubscription: Subscription;

  form = new FormGroup({
    href: new FormControl('https://', [
      Validators.required,
      Validators.pattern(
        '((([A-Za-z]{3,9}:(?:\\/\\/))(?:[-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9.-]+|(:www.|[-;:&=\\+\\$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[\\+~%\\/.\\w-_]*)?\\??(?:[-\\+=&;%@.\\w_]*)#?(?:[\\w]*))?)',
      ),
    ]),
    text: new FormControl('', [Validators.required]),
    openInNewTab: new FormControl(true),
  });

  constructor(
    private el: ElementRef,
    private ngxeService: NgxEditorService,
    private menuService: MenuService,
  ) {}

  @HostBinding('class.NgxEditor__MenuItem--Active') get valid(): boolean {
    return this.isActive || this.showPopup;
  }

  @HostBinding('class.NgxEditor--Disabled') get disabled(): boolean {
    return !this.canExecute;
  }

  get icon(): string {
    return Icon.get(this.isActive ? 'unlink' : 'link');
  }

  get title(): string {
    return this.ngxeService.locals.get(
      this.isActive ? 'removeLink' : 'insertLink',
    );
  }

  get href(): AbstractControl {
    return this.form.get('href');
  }

  get text(): AbstractControl {
    return this.form.get('text');
  }

  @HostListener('document:mousedown', ['$event']) onDocumentClick(
    e: MouseEvent,
  ): void {
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
      href: 'https://',
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
    const {
      state: { selection, doc },
    } = this.editorView;
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

    const attrs = {
      title: href,
      href,
      target: openInNewTab ? '_blank' : '_self',
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

    this.updateSubscription = this.menuService.editor.update.subscribe(
      (view: EditorView) => {
        this.update(view);
      },
    );
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
