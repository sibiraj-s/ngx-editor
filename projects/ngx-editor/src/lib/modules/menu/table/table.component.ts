import { Component, ElementRef, HostListener, OnDestroy, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { uniq } from 'ngx-editor/utils';
import { EditorView } from 'prosemirror-view';
import { Observable, Subscription } from 'rxjs';
import { NgxEditorService } from '../../../editor.service';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { HTML } from '../../../trustedTypesUtil';
import { MenuService } from '../menu.service';

import { Table as TableCommand } from '../MenuCommands';

@Component({
  selector: 'ngx-table',
  imports: [AsyncPipe, SanitizeHtmlPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private ngxeService = inject(NgxEditorService);
  private menuService = inject(MenuService);
  private cdr = inject(ChangeDetectorRef);

  showPopup = false;
  isActive = false;
  private componentId = uniq();
  private updateSubscription: Subscription;

  form = new FormGroup({
    rows: new FormControl(2, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    cols: new FormControl(3, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
  });

  private editorView: EditorView;

  get icon(): HTML {
    return this.ngxeService.getIcon('table');
  }

  @HostListener('document:mousedown', ['$event']) onDocumentClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
      this.hideForm();
    }
  }

  getId(name: string): string {
    return `${name}-${this.componentId}`;
  }

  getLabel(key: string): Observable<string> {
    return this.ngxeService.locals.get(key);
  }

  private hideForm(): void {
    this.showPopup = false;
    this.form.reset({
      rows: 2,
      cols: 3,
    });
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;

    if (this.showPopup) {
      this.fillForm();
    }
  }

  onTogglePopupMouseClick(e: MouseEvent): void {
    if (e.button !== 0) {
      return;
    }

    this.togglePopup();
  }

  onTogglePopupKeydown(): void {
    this.togglePopup();
  }

  private fillForm(): void {
    this.form.setValue({
      rows: 2,
      cols: 3,
    });
  }

  private update = (view: EditorView) => {
    const { state } = view;
    this.isActive = TableCommand.isActive(state);
  };

  insertTable(e: MouseEvent): void {
    e.preventDefault();
    const { rows, cols } = this.form.getRawValue();
    const { dispatch, state } = this.editorView;

    const success = TableCommand.insert(rows, cols)(state, dispatch);
    if (success) {
      this.editorView.focus();
      this.hideForm();
    }
  }

  ngOnInit(): void {
    this.editorView = this.menuService.editor.view;

    this.updateSubscription = this.menuService.editor.update.subscribe((view: EditorView) => {
      this.update(view);
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
