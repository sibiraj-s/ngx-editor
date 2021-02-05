import {
  Component, ViewChild, ElementRef,
  forwardRef, OnDestroy, ViewEncapsulation,
  OnInit, Output, EventEmitter,
  Input, Renderer2, SimpleChanges,
  OnChanges, Injector, AfterViewInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { createCustomElement } from '@angular/elements';
import { Subscription } from 'rxjs';

import * as plugins from './plugins';
import { toHTML } from './parsers';
import Editor from './Editor';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { FloatingMenuComponent } from './modules/menu/floating-menu/floating-menu.component';

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
    private renderer: Renderer2,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  @ViewChild('ngxEditor', { static: true }) private ngxEditor: ElementRef;
  @ViewChild('ngxFloatingMenu', { static: true, read: ViewContainerRef }) private floatingMenuView: ViewContainerRef;

  @Input() editor: Editor;
  @Input() outputFormat: 'doc' | 'html';
  @Input() placeholder = 'Type Here...';
  @Input() enabled = true;
  @Input() floatingMenu = true;

  @Output() focusOut = new EventEmitter<void>();
  @Output() focusIn = new EventEmitter<void>();

  private subscriptions: Subscription[] = [];
  private onChange: (value: Record<string, any> | string) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: Record<string, any> | string | null): void {
    if (!this.outputFormat && typeof value === 'string') {
      this.outputFormat = 'html';
    }

    this.editor.setContent(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
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

  private enable(): void {
    this.setMeta('UPDATE_EDITABLE', true);
  }

  private disable(): void {
    this.setMeta('UPDATE_EDITABLE', false);
  }

  private setPlaceholder(placeholder: string): void {
    this.setMeta('UPDATE_PLACEHOLDER', placeholder);
  }

  private registerCustomElements(): void {
    const imgViewComponent = customElements.get('ngx-image-view');

    if (!imgViewComponent) {
      const ImageViewElement = createCustomElement(ImageViewComponent, { injector: this.injector });
      customElements.define('ngx-image-view', ImageViewElement);
    }
  }

  private registerPlugins(): void {
    this.editor.registerPlugin(plugins.editable(this.enabled));
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

    this.editor.registerPlugin(plugins.image(this.injector));
  }

  private createFloatingMenu(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FloatingMenuComponent);

    const viewContainerRef = this.floatingMenuView;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<FloatingMenuComponent>(componentFactory);
    componentRef.instance.editor = this.editor;
  }

  private destroyFloatingMenu(): void {
    this.floatingMenuView.clear();
  }

  ngOnInit(): void {
    if (!this.editor) {
      throw new Error('NgxEditor: Required editor instance');
    }

    this.registerCustomElements();
    this.registerPlugins();

    this.renderer.appendChild(this.ngxEditor.nativeElement, this.editor.view.dom);

    const contentChangeSubscription = this.editor.valueChanges.subscribe(jsonDoc => {
      this.handleChange(jsonDoc);
    });

    this.subscriptions.push(contentChangeSubscription);

    if (this.floatingMenu) {
      this.createFloatingMenu();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.placeholder && !changes.placeholder.isFirstChange()) {
      this.setPlaceholder(changes.placeholder.currentValue);
    }

    if (changes?.enabled && !changes.enabled.isFirstChange()) {
      if (!changes.enabled.currentValue) {
        this.disable();
      } else {
        this.enable();
      }
    }

    if (changes?.floatingMenu && !changes.floatingMenu.isFirstChange()) {
      if (changes.floatingMenu.currentValue) {
        this.createFloatingMenu();
      } else {
        this.destroyFloatingMenu();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
