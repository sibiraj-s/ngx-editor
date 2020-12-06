import {
  Component, ViewChild, ElementRef,
  forwardRef, OnDestroy, ViewEncapsulation, OnInit, Output, EventEmitter, Input, TemplateRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
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

export class NgxEditorComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @ViewChild('ngxEditor', { static: true }) ngxEditor: ElementRef;

  view: EditorView;
  private onChange: (value: object) => void;

  config: NgxEditorServiceConfig;

  @Input() customMenuRef: TemplateRef<any>;
  @Output() init = new EventEmitter<EditorView>();
  @Output() focusOut = new EventEmitter<void>();
  @Output() focusIn = new EventEmitter<void>();

  private editorInitialized = false;

  constructor(private ngxEditorService: NgxEditorService) {
    this.config = ngxEditorService.config;
  }

  writeValue(value: object | null): void {
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

  private updateContent(value: object): void {
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

  private handleTransactions(tr: Transaction): void {
    const { state } = this.view.state.applyTransaction(tr);

    this.view.updateState(state);

    if (tr.docChanged && this.onChange) {
      const json = state.doc.toJSON();
      this.onChange(json);
    }
  }

  onEditorUpdate = (view: EditorView) => {
    this.ngxEditorService.dispatchEditorUpdate(view);
  }

  createUpdateWatcherPlugin(): Plugin {
    const plugin = new Plugin({
      key: new PluginKey('ngx-update-watcher'),
      view: () => {
        return {
          update: this.onEditorUpdate
        };
      }
    });

    return plugin;
  }

  createEditor(): void {
    const { schema, plugins, nodeViews } = this.config;

    this.view = new EditorView(this.ngxEditor.nativeElement, {
      state: EditorState.create({
        doc: null,
        schema,
        plugins: [
          ...plugins,
          this.createUpdateWatcherPlugin()
        ]
      }),
      nodeViews,
      dispatchTransaction: this.handleTransactions.bind(this),
      handleDOMEvents: {
        focus: () => {
          this.focusIn.emit();
          return true;
        },
        blur: () => {
          this.focusOut.emit();
          return true;
        }
      },
      attributes: {
        class: 'NgxEditor__Content'
      },
    });

    this.ngxEditorService.view = this.view;
    this.init.emit(this.view);
    this.ngxEditorService.setCustomMenuRef(this.customMenuRef);
    this.editorInitialized = true;
  }

  ngOnInit(): void {
    this.createEditor();
  }

  ngOnDestroy(): void {
    this.view.destroy();
  }
}
