import {
  Component, ViewChild, ElementRef,
  forwardRef, OnDestroy, ViewEncapsulation, OnInit,
  Output, EventEmitter, Input, TemplateRef,
  OnChanges, SimpleChanges, Injector,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Node as ProsemirrorNode } from 'prosemirror-model';

import { NgxEditorService, NgxEditorServiceConfig } from './editor.service';
import { SharedService } from './services/shared/shared.service';
import { Toolbar } from './types';

@Component({
  selector: 'ngx-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxEditorComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})

export class NgxEditorComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @ViewChild('ngxEditor', { static: true }) ngxEditor: ElementRef;

  view: EditorView;
  private onChange: (value: object) => void;
  private onTouched: () => void;

  private config: NgxEditorServiceConfig;

  @Input() customMenuRef: TemplateRef<any>;
  @Input() placeholder: string;
  @Output() init = new EventEmitter<EditorView>();
  @Output() focusOut = new EventEmitter<void>();
  @Output() focusIn = new EventEmitter<void>();

  private editorInitialized = false;

  constructor(
    ngxEditorService: NgxEditorService,
    private injector: Injector,
    private sharedService: SharedService,
  ) {
    this.config = ngxEditorService.config;
  }

  get menu(): Toolbar {
    return this.config.menu;
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

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

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

  private createUpdateWatcherPlugin(): Plugin {
    const plugin = new Plugin({
      key: new PluginKey('ngx-update-watcher'),
      view: () => {
        return {
          update: (view: EditorView) => this.sharedService.plugin.update.next(view),
          destroy: () => this.sharedService.plugin.destroy.next()
        };
      }
    });

    return plugin;
  }

  private createEditor(): void {
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
          return false;
        },
        blur: () => {
          this.onTouched();
          this.focusOut.emit();
          return false;
        }
      },
      attributes: {
        class: 'NgxEditor__Content'
      },
    });

    this.editorInitialized = true;
    this.sharedService.view = this.view;
    this.sharedService.setCustomMenuRef(this.customMenuRef);
    this.init.emit(this.view);
  }

  private setPlaceholder(newPlaceholder?: string): void {
    const { dispatch, state: { tr } } = this.view;
    const placeholder = newPlaceholder ?? this.placeholder;
    dispatch(tr.setMeta('UPDATE_PLACEHOLDER', placeholder));
  }

  ngOnInit(): void {
    this.createEditor();
    this.setPlaceholder();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.placeholder && !changes.placeholder.isFirstChange()) {
      this.setPlaceholder(changes.placeholder.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.view.destroy();
  }
}
