import {
  Component, ViewChild, ElementRef,
  forwardRef, OnDestroy, ViewEncapsulation,
  OnInit, Output, EventEmitter,
  Input, Renderer2, SimpleChanges,
  OnChanges, Injector,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';

import * as plugins from './plugins';
import { toHTML } from './parsers';
import Editor from './Editor';

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

export class NgxEditorComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  constructor(
    private _renderer: Renderer2,
    private _injector: Injector,
    private _elementRef: ElementRef<HTMLElement>
  ) { }

  @ViewChild('ngxEditor', { static: true }) private ngxEditor: ElementRef;

  @Input() editor: Editor;
  @Input() outputFormat: 'doc' | 'html';
  @Input() placeholder = 'Type Here...';

  @Output() focusOut = new EventEmitter<void>();
  @Output() focusIn = new EventEmitter<void>();

  private subscriptions: Subscription[] = [];
  private onChange: (value: Record<string, any> | string) => void = () => { /** */ };
  private onTouched: () => void = () => { /** */ };

  writeValue(value: Record<string, any> | string | null): void {
    if (!this.outputFormat && typeof value === 'string') {
      this.outputFormat = 'html';
    }

    this.editor.setContent(value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.setMeta('UPDATE_EDITABLE', !isDisabled);
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  private handleChange(jsonDoc: Record<string, any>): void {
    if (this.outputFormat === 'html') {
      const html = toHTML(jsonDoc, this.editor.schema);
      this.onChange(html);
      return;
    }

    this.onChange(jsonDoc);
  }

  private setMeta(key: string, value: any): void {
    const { dispatch, state: { tr } } = this.editor.view;
    dispatch(tr.setMeta(key, value));
  }

  private setPlaceholder(placeholder: string): void {
    this.setMeta('UPDATE_PLACEHOLDER', placeholder);
  }

  private registerPlugins(): void {
    this.editor.registerPlugin(plugins.editable());
    this.editor.registerPlugin(plugins.placeholder(this.placeholder));

    this.editor.registerPlugin(plugins.attributes({
      class: 'NgxEditor__Content'
    }));

    this.editor.registerPlugin(plugins.focus(() => {
      this.focusIn.emit();
    }));

    this.editor.registerPlugin(plugins.focus(() => {
      this.focusIn.emit();
    }));

    this.editor.registerPlugin(plugins.blur(() => {
      this.focusOut.emit();
      this.onTouched();
    }));

    if (this.editor.features.resizeImage) {
      this.editor.registerPlugin(plugins.imageResize(this._injector));
    }

    if (this.editor.features.linkOnPaste) {
      this.editor.registerPlugin(plugins.linkify());
    }
  }

  ngOnInit(): void {
    if (!this.editor) {
      throw new Error('NgxEditor: Required editor instance');
    }

    this.registerPlugins();

    this._renderer.appendChild(this.ngxEditor.nativeElement, this.editor.view.dom);

    const contentChangeSubscription = this.editor.valueChanges.subscribe(jsonDoc => {
      this.handleChange(jsonDoc);
    });

    this.subscriptions.push(contentChangeSubscription);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['placeholder'] && !changes['placeholder'].isFirstChange()) {
      this.setPlaceholder(changes['placeholder'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
