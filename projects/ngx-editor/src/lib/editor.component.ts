import {
  Component,
  ElementRef,
  forwardRef,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  inject,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isNil, NgxEditorError } from 'ngx-editor/utils';
import Editor from './Editor';
import { emptyDoc, toHTML } from './parsers';
import * as plugins from './plugins';
import { HTML, isHtml } from './trustedTypesUtil';

@Component({
  selector: 'ngx-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxEditorComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  encapsulation: ViewEncapsulation.None,
})
export class NgxEditorComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  private renderer = inject(Renderer2);
  private injector = inject(Injector);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @ViewChild('ngxEditor', { static: true }) private ngxEditor: ElementRef;

  readonly editor = input<Editor>(undefined);
  readonly placeholder = input('Type Here...');

  readonly outputFormat = input<'doc' | 'html'>(undefined);
  // inferred from the first html value when no format is given
  private format = linkedSignal(() => this.outputFormat());

  readonly focusOut = output<void>();
  readonly focusIn = output<void>();

  private unsubscribe = new Subject<void>();
  private initialValueSet = false;
  private onChange: (value: Record<string, unknown> | string) => void = () => { /** */ };
  private onTouched: () => void = () => { /** */ };

  writeValue(value: Record<string, unknown> | HTML | null): void {
    if (!this.format() && isHtml(value)) {
      this.format.set('html');
    }

    // the initial value should not be undoable, else undo clears the editor.
    // ngModel writes null before the actual value, so the first non-null value is the initial value
    this.editor().setContent(value ?? emptyDoc, { addToHistory: this.initialValueSet });

    if (!isNil(value)) {
      this.initialValueSet = true;
    }
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.setMeta('UPDATE_EDITABLE', !isDisabled);
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  private handleChange(jsonDoc: Record<string, unknown>): void {
    if (this.format() === 'html') {
      const html = toHTML(jsonDoc, this.editor().schema);
      this.onChange(html);
      return;
    }

    this.onChange(jsonDoc);
  }

  private setMeta(key: string, value: unknown): void {
    const { dispatch, state: { tr } } = this.editor().view;
    dispatch(tr.setMeta(key, value));
  }

  private setPlaceholder(placeholder: string): void {
    this.setMeta('UPDATE_PLACEHOLDER', placeholder);
  }

  private registerPlugins(): void {
    this.editor().registerPlugin(plugins.editable());
    this.editor().registerPlugin(plugins.placeholder(this.placeholder()));

    this.editor().registerPlugin(plugins.attributes({ class: 'NgxEditor__Content' }));

    this.editor().registerPlugin(plugins.focus(() => {
      this.focusIn.emit();
    }));

    this.editor().registerPlugin(plugins.blur(() => {
      this.focusOut.emit();
      this.onTouched();
    }));

    const editor = this.editor();
    if (editor.features.resizeImage) {
      editor.registerPlugin(plugins.imageResize(this.injector));
    }

    if (editor.features.linkOnPaste) {
      editor.registerPlugin(plugins.linkify());
    }
  }

  ngOnInit(): void {
    const editor = this.editor();
    if (!editor) {
      throw new NgxEditorError('Required editor instance for initializing editor component');
    }

    this.registerPlugins();

    this.renderer.appendChild(this.ngxEditor.nativeElement, editor.view.dom);

    editor.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe((jsonDoc) => {
      this.handleChange(jsonDoc);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['placeholder'] && !changes['placeholder'].isFirstChange()) {
      this.setPlaceholder(changes['placeholder'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
