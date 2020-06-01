import {
  Component, ViewChild, ElementRef,
  forwardRef, OnDestroy, ViewEncapsulation, AfterViewInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Node as ProsemirrorNode } from 'prosemirror-model';

import { NgxEditorService, NgxEditorServiceConfig } from './ngx-editor.service';

@Component({
  selector: 'ngx-editor',
  templateUrl: 'ngx-editor.component.html',
  styleUrls: ['ngx-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxEditorComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})

export class NgxEditorComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @ViewChild('ngxEditor', { static: true }) ngxEditor: ElementRef;

  private view: EditorView;
  private onChange: (value: object) => void;

  private config: NgxEditorServiceConfig;

  private editorInitialized = false;

  constructor(ngxEditorService: NgxEditorService) {
    this.config = ngxEditorService.config;
  }

  writeValue(value: object | null) {
    if (!this.editorInitialized) {
      return;
    }

    this.updateContent(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(): void { }

  private parseDoc(contentJson: object): ProsemirrorNode {
    if (!contentJson) {
      return null;
    }

    const { schema } = this.config;
    return schema.nodeFromJSON(contentJson);
  }

  private updateContent(value: object) {
    try {
      const doc = this.parseDoc(value);
      const state = this.view.state;

      // don't emit if both content is same
      if (doc !== null && state.doc.eq(doc)) {
        return;
      }

      const tr = state.tr;
      tr.replaceWith(0, state.doc.content.size, doc);
      this.view.dispatch(tr);
    } catch (err) {
      console.error('Unable to update document.', err);
    }
  }

  private handleTransactions(tr: Transaction) {
    const { state } = this.view.state.applyTransaction(tr);

    this.view.updateState(state);

    if (tr.docChanged) {
      const json = state.doc.toJSON();
      this.onChange(json);
    }
  }

  createEditor() {
    const { schema, plugins, nodeViews } = this.config;

    this.view = new EditorView(this.ngxEditor.nativeElement, {
      state: EditorState.create({
        schema,
        plugins
      }),
      nodeViews,
      dispatchTransaction: this.handleTransactions.bind(this),
      attributes: {
        class: 'NgxEditor__Content'
      },
    });

    this.editorInitialized = true;
  }

  ngAfterViewInit() {
    this.createEditor();
  }

  ngOnDestroy() {
    this.view.destroy();
  }
}
