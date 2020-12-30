import {
  Component, ViewChild, ElementRef,
  forwardRef, OnDestroy, ViewEncapsulation, OnInit,
  Output, EventEmitter, Input, TemplateRef,
  OnChanges, SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Node as ProsemirrorNode } from 'prosemirror-model';

import { NgxEditorService, NgxEditorServiceConfig } from './editor.service';
import { SharedService } from './services/shared/shared.service';
import { Toolbar } from './types';
import { editable as editablePlugin, placeholder as placeholderPlugin } from 'ngx-editor/plugins';
import { toDoc, toHTML } from './html';

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
  private onChange: (value: Record<string, any> | string) => void;
  private onTouched: () => void;

  private config: NgxEditorServiceConfig;
  private editorInitialized = false;

  @Input() outputFormat: 'doc' | 'html';
  @Input() customMenuRef: TemplateRef<any>;
  @Input() placeholder = 'Type here...';
  @Input() editable = true;
  @Output() init = new EventEmitter<EditorView>();
  @Output() focusOut = new EventEmitter<void>();
  @Output() focusIn = new EventEmitter<void>();

  constructor(
    ngxEditorService: NgxEditorService,
    private sharedService: SharedService,
  ) {
    this.config = ngxEditorService.config;
  }

  get toolbar(): Toolbar {
    return this.config.menu?.toolbar;
  }

  writeValue(value: Record<string, any> | string | null): void {
    if (!this.editorInitialized) {
      return;
    }

    if (!this.outputFormat && typeof value === 'string') {
      this.outputFormat = 'html';
    }

    this.updateContent(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private parse(value: Record<string, any> | string): ProsemirrorNode {
    if (!value) {
      return null;
    }

    let contentJson = null;

    if (typeof value === 'string') {
      contentJson = toDoc(value, this.config.schema);
    } else {
      contentJson = value;
    }

    const { schema } = this.config;
    return schema.nodeFromJSON(contentJson);
  }

  private updateContent(value: Record<string, any> | string): void {
    try {
      const { state } = this.view;
      const { tr, doc } = state;

      const newDoc = this.parse(value);
      tr.replaceWith(0, state.doc.content.size, newDoc)
        .setMeta('PREVENT_ONCHANGE', true);

      // don't emit if both content is same
      if (doc !== null && doc.eq(tr.doc)) {
        return;
      }

      if (!tr.docChanged) {
        return;
      }

      this.view.dispatch(tr);
    } catch (err) {
      console.error('Unable to update document.', err);
    }
  }

  private handleTransactions(tr: Transaction): void {
    const { state } = this.view.state.applyTransaction(tr);
    this.view.updateState(state);

    if (!tr.docChanged || !this.onChange || tr.getMeta('PREVENT_ONCHANGE')) {
      return;
    }

    const json = state.doc.toJSON();

    if (this.outputFormat === 'html') {
      const html = toHTML(json, this.config.schema);
      this.onChange(html);
      return;
    }

    this.onChange(json);
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

  private filterBuiltIns(plugin: Plugin): boolean {
    const pluginKey: string = (plugin as any).key;
    if (/^(editable|placeholder)\$/.test(pluginKey)) {
      return false;
    }

    return true;
  }

  private createEditor(): void {
    const { schema, plugins, nodeViews } = this.config;

    this.view = new EditorView(this.ngxEditor.nativeElement, {
      state: EditorState.create({
        doc: null,
        schema,
        plugins: [
          ...plugins.filter((plugin) => this.filterBuiltIns(plugin)),
          this.createUpdateWatcherPlugin(),
          placeholderPlugin(this.placeholder),
          editablePlugin(this.editable)
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

  private updateEditable(edit: boolean): void {
    const { dispatch, state: { tr } } = this.view;
    dispatch(tr.setMeta('UPDATE_EDITABLE', edit));
  }

  ngOnInit(): void {
    this.createEditor();
    this.setPlaceholder();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.placeholder && !changes.placeholder.isFirstChange()) {
      this.setPlaceholder(changes.placeholder.currentValue);
    }

    if (changes?.editable && !changes.editable.isFirstChange()) {
      this.updateEditable(changes.editable.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.view.destroy();
  }
}
