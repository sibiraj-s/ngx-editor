import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NgxEditorError } from 'ngx-editor/utils';
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
  encapsulation: ViewEncapsulation.None,
})
export class NgxEditorComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  constructor(
    private renderer: Renderer2,
    private injector: Injector,
    private elementRef: ElementRef<HTMLElement>,
  ) {}

  @ViewChild('ngxEditor', { static: true }) private ngxEditor: ElementRef;

  @Input() editor: Editor;
  @Input() outputFormat: 'doc' | 'html';
  @Input() placeholder = 'Type Here...';

  @Output() focusOut = new EventEmitter<void>();
  @Output() focusIn = new EventEmitter<void>();

  private unsubscribe: Subject<void> = new Subject();
  private onChange: (value: Record<string, any> | string) => void = () => {
    /** */
  };

  private onTouched: () => void = () => {
    /** */
  };

  writeValue(value: Record<string, any> | HTML | null): void {
    if (!this.outputFormat && isHtml(value)) {
      this.outputFormat = 'html';
    }

    this.editor.setContent(value ?? emptyDoc);
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

  private handleChange(jsonDoc: Record<string, any>): void {
    if (this.outputFormat === 'html') {
      const html = toHTML(jsonDoc, this.editor.schema);
      this.onChange(html);
      return;
    }

    this.onChange(jsonDoc);
  }

  private setMeta(key: string, value: any): void {
    const {
      dispatch,
      state: { tr },
    } = this.editor.view;
    dispatch(tr.setMeta(key, value));
  }

  private setPlaceholder(placeholder: string): void {
    this.setMeta('UPDATE_PLACEHOLDER', placeholder);
  }

  private registerPlugins(): void {
    this.editor.registerPlugin(plugins.editable());
    this.editor.registerPlugin(plugins.placeholder(this.placeholder));

    this.editor.registerPlugin(
      plugins.attributes({
        class: 'NgxEditor__Content',
      }),
    );

    this.editor.registerPlugin(
      plugins.focus(() => {
        this.focusIn.emit();
      }),
    );

    this.editor.registerPlugin(
      plugins.blur(() => {
        this.focusOut.emit();
        this.onTouched();
      }),
    );

    if (this.editor.features.resizeImage) {
      this.editor.registerPlugin(plugins.imageResize(this.injector));
    }

    if (this.editor.features.linkOnPaste) {
      this.editor.registerPlugin(plugins.linkify());
    }
  }

  ngOnInit(): void {
    if (!this.editor) {
      throw new NgxEditorError('Required editor instance for initializing editor component');
    }

    this.registerPlugins();

    this.renderer.appendChild(this.ngxEditor.nativeElement, this.editor.view.dom);

    this.editor.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe((jsonDoc) => {
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
