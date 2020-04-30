import {
  Component, ViewChild, ElementRef,
  Input, forwardRef, OnDestroy, OnInit, ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';

import { Config, ComputedOptions } from './types';

import { getPlugins } from './utils/plugins';
import computeOptions from './utils/computeOptions';

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

export class NgxEditorComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @ViewChild('ngxEditor', { static: true }) ngxEditor: ElementRef;

  @Input() placeholder = 'Type here...';
  @Input() config: Config;

  private view: EditorView;
  private onChange: (value: object) => void;

  private options: ComputedOptions;

  writeValue(value: object | null) {
    if (!value) {
      return;
    }

    this.updateContent(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(): void { }

  private parseDoc(contentJson: object): ProsemirrorNode {
    return schema.nodeFromJSON(contentJson);
  }

  private updateContent(value: object) {
    try {
      const doc = this.parseDoc(value);

      const state = this.view.state;
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
    this.view = new EditorView(this.ngxEditor.nativeElement, {
      state: EditorState.create({
        schema,
        plugins: getPlugins(this.options),
      }),
      dispatchTransaction: this.handleTransactions.bind(this),
      attributes: {
        class: 'NgxEditor-Content'
      },
    });
  }

  ngOnInit() {
    this.options = computeOptions({
      placeholder: this.placeholder,
      config: this.config
    });

    this.createEditor();
  }

  ngOnDestroy() {
    this.view.destroy();
  }
}
