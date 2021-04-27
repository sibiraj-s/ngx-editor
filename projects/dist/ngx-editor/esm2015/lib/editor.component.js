import { Component, ViewChild, forwardRef, ViewEncapsulation, Output, EventEmitter, Input, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as plugins from './plugins';
import { toHTML } from './parsers';
import * as i0 from "@angular/core";
const _c0 = ["ngxEditor"];
const _c1 = ["*"];
export class NgxEditorComponent {
    constructor(renderer, injector) {
        this.renderer = renderer;
        this.injector = injector;
        this.placeholder = 'Type Here...';
        this.enabled = true;
        this.focusOut = new EventEmitter();
        this.focusIn = new EventEmitter();
        this.subscriptions = [];
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        if (!this.outputFormat && typeof value === 'string') {
            this.outputFormat = 'html';
        }
        this.editor.setContent(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    handleChange(jsonDoc) {
        if (this.outputFormat === 'html') {
            const html = toHTML(jsonDoc, this.editor.schema);
            this.onChange(html);
            return;
        }
        this.onChange(jsonDoc);
    }
    setMeta(key, value) {
        const { dispatch, state: { tr } } = this.editor.view;
        dispatch(tr.setMeta(key, value));
    }
    enable() {
        this.setMeta('UPDATE_EDITABLE', true);
    }
    disable() {
        this.setMeta('UPDATE_EDITABLE', false);
    }
    setPlaceholder(placeholder) {
        this.setMeta('UPDATE_PLACEHOLDER', placeholder);
    }
    registerPlugins() {
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
        this.editor.registerPlugin(plugins.link());
    }
    ngOnInit() {
        if (!this.editor) {
            throw new Error('NgxEditor: Required editor instance');
        }
        // this.registerCustomElements();
        this.registerPlugins();
        this.renderer.appendChild(this.ngxEditor.nativeElement, this.editor.view.dom);
        const contentChangeSubscription = this.editor.valueChanges.subscribe(jsonDoc => {
            this.handleChange(jsonDoc);
        });
        this.subscriptions.push(contentChangeSubscription);
    }
    ngOnChanges(changes) {
        if ((changes === null || changes === void 0 ? void 0 : changes.placeholder) && !changes.placeholder.isFirstChange()) {
            this.setPlaceholder(changes.placeholder.currentValue);
        }
        if ((changes === null || changes === void 0 ? void 0 : changes.enabled) && !changes.enabled.isFirstChange()) {
            if (!changes.enabled.currentValue) {
                this.disable();
            }
            else {
                this.enable();
            }
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}
NgxEditorComponent.ɵfac = function NgxEditorComponent_Factory(t) { return new (t || NgxEditorComponent)(i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.Injector)); };
NgxEditorComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgxEditorComponent, selectors: [["ngx-editor"]], viewQuery: function NgxEditorComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 3);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.ngxEditor = _t.first);
    } }, inputs: { editor: "editor", outputFormat: "outputFormat", placeholder: "placeholder", enabled: "enabled" }, outputs: { focusOut: "focusOut", focusIn: "focusIn" }, features: [i0.ɵɵProvidersFeature([{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgxEditorComponent),
                multi: true
            }]), i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c1, decls: 3, vars: 0, consts: [[1, "NgxEditor"], ["ngxEditor", ""]], template: function NgxEditorComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0, 1);
        i0.ɵɵprojection(2);
        i0.ɵɵelementEnd();
    } }, styles: [".NgxEditor{background:#fff;color:#000;background-clip:padding-box;border-radius:4px;border:1px solid rgba(0,0,0,.2);position:relative}.NgxEditor--Disabled{opacity:.5;pointer-events:none}.NgxEditor__Placeholder:before{color:#6c757d;opacity:1;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:absolute;cursor:text;content:attr(data-placeholder)}.NgxEditor__Placeholder[data-align=right]:before{position:relative}.NgxEditor__Content{padding:.5rem;white-space:pre-wrap;outline:none;font-variant-ligatures:none;font-feature-settings:\"liga\" 0}.NgxEditor__Content p{margin:0 0 .7rem}.NgxEditor__Content blockquote{padding-left:1rem;border-left:3px solid #ddd;margin-left:0;margin-right:0}.NgxEditor__Content--Disabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}.NgxEditor__Wrapper{border:1px solid rgba(0,0,0,.4);border-radius:4px}.NgxEditor__Wrapper .NgxEditor__MenuBar{border-top-left-radius:4px;border-top-right-radius:4px;border-bottom:1px solid rgba(0,0,0,.2)}.NgxEditor__Wrapper .NgxEditor{border-top-left-radius:0;border-top-right-radius:0;border:none}.NgxEditor__MenuBar{display:flex;padding:.2rem;cursor:default;background-color:#fff}.NgxEditor__MenuItem{border-radius:2px;display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0}.NgxEditor__MenuItem:hover{background-color:#f1f1f1}.NgxEditor__MenuItem.NgxEditor__MenuItem--Icon{height:1.85rem;width:1.85rem;transition:.3s ease-in-out}.NgxEditor__MenuItem.NgxEditor__MenuItem--Icon+.NgxEditor__MenuItem--Icon{margin-left:2px}.NgxEditor__MenuItem .NgxEditor__MenuItem--IconContainer{display:flex;height:100%;width:100%;align-items:center;justify-content:center}.NgxEditor__MenuItem.NgxEditor__MenuItem--Text{padding:0 .3rem}.NgxEditor__MenuItem.NgxEditor__MenuItem--Active{background-color:#e8f0fe}.NgxEditor__MenuItem.NgxEditor__MenuItem--Active.NgxEditor__MenuItem--Text{color:#1a73e8}.NgxEditor__MenuItem.NgxEditor__MenuItem--Active svg{fill:#1a73e8}.NgxEditor__Dropdown{min-width:4rem;position:relative;display:flex;align-items:center;flex-shrink:0}.NgxEditor__Dropdown:hover{background-color:#f1f1f1}.NgxEditor__Dropdown .NgxEditor__Dropdown--Text{display:flex;align-items:center;justify-content:center;padding:0 .3rem;height:100%;width:100%}.NgxEditor__Dropdown .NgxEditor__Dropdown--Text:after{display:inline-block;content:\"\";margin-left:1.5rem;vertical-align:.25rem;border-top:.25rem solid;border-right:.25rem solid transparent;border-bottom:0;border-left:.25rem solid transparent}.NgxEditor__Dropdown .NgxEditor__Dropdown--DropdownMenu{position:absolute;left:0;top:calc(1.85rem + 2px);box-shadow:0 2px 6px 2px rgba(60,64,67,.15);border-radius:4px;background-color:#fff;z-index:10;width:100%}.NgxEditor__Dropdown .NgxEditor__Dropdown--Item{padding:.5rem;white-space:nowrap;color:inherit}.NgxEditor__Dropdown .NgxEditor__Dropdown--Item:hover{background-color:#ececec}.NgxEditor__Dropdown.NgxEditor__Dropdown--Open,.NgxEditor__Dropdown.NgxEditor__Dropdown--Selected{background-color:#e8f0fe}.NgxEditor__Dropdown.NgxEditor__Dropdown--Open .NgxEditor__Dropdown--Text,.NgxEditor__Dropdown.NgxEditor__Dropdown--Selected .NgxEditor__Dropdown--Text{color:#1a73e8}.NgxEditor__Dropdown .NgxEditor__Dropdown--Active{background-color:#f1f1f1}.NgxEditor__Dropdown .NgxEditor__Dropdown--Active:hover{background-color:#e7e7e7}.NgxEditor__Popup{position:absolute;top:calc(1.85rem + 2px);box-shadow:0 2px 6px 2px rgba(60,64,67,.15);border-radius:4px;background-color:#fff;z-index:10;min-width:12rem;padding:8px}.NgxEditor__Popup .NgxEditor__Popup--FormGroup{margin-bottom:8px}.NgxEditor__Popup .NgxEditor__Popup--FormGroup label{margin-bottom:3px}.NgxEditor__Popup .NgxEditor__Popup--FormGroup input[type=text],.NgxEditor__Popup .NgxEditor__Popup--FormGroup input[type=url]{padding:2px 4px}.NgxEditor__Popup .NgxEditor__Popup--Col{display:flex;flex-direction:column;position:relative}.NgxEditor__Popup .NgxEditor__Popup--Label{font-size:85%}.NgxEditor__Seperator{border-left:1px solid #ccc;margin:0 .3rem}.NgxEditor__HelpText{font-size:80%}.NgxEditor__HelpText.NgxEditor__HelpText--Error{color:red}"], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxEditorComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-editor',
                templateUrl: './editor.component.html',
                styleUrls: ['./editor.component.scss'],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NgxEditorComponent),
                        multi: true
                    }],
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: i0.Renderer2 }, { type: i0.Injector }]; }, { ngxEditor: [{
            type: ViewChild,
            args: ['ngxEditor', { static: true }]
        }], editor: [{
            type: Input
        }], outputFormat: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], enabled: [{
            type: Input
        }], focusOut: [{
            type: Output
        }], focusIn: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25neC1lZGl0b3Ivc3JjL2xpYi9lZGl0b3IuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vbmd4LWVkaXRvci9zcmMvbGliL2VkaXRvci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLFNBQVMsRUFDcEIsVUFBVSxFQUFhLGlCQUFpQixFQUNoQyxNQUFNLEVBQUUsWUFBWSxFQUM1QixLQUFLLEdBRU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBR3pFLE9BQU8sS0FBSyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUFlbkMsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUNVLFFBQW1CLEVBQ25CLFFBQWtCO1FBRGxCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQU9uQixnQkFBVyxHQUFHLGNBQWMsQ0FBQztRQUM3QixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBRWQsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDcEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFckMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ25DLGFBQVEsR0FBa0QsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BFLGNBQVMsR0FBZSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFkdEMsQ0FBQztJQWdCTCxVQUFVLENBQUMsS0FBMEM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ25ELElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFD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LFdBQVcsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7b0ZBM0hVLGtCQUFrQjt1REFBbEIsa0JBQWtCOzs7Ozs2TUFSbEIsQ0FBQztnQkFDVixPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUNqRCxLQUFLLEVBQUUsSUFBSTthQUNaLENBQUM7O1FDdEJKLGlDQUFrQztRQUNoQyxrQkFBeUI7UUFDM0IsaUJBQU07O3VGRHdCTyxrQkFBa0I7Y0FaOUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztnQkFDdEMsU0FBUyxFQUFFLENBQUM7d0JBQ1YsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUM7d0JBQ2pELEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUM7Z0JBQ0YsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDdEM7bUZBUW1ELFNBQVM7a0JBQTFELFNBQVM7bUJBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUUvQixNQUFNO2tCQUFkLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUVJLFFBQVE7a0JBQWpCLE1BQU07WUFDRyxPQUFPO2tCQUFoQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsXG4gIGZvcndhcmRSZWYsIE9uRGVzdHJveSwgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsXG4gIElucHV0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMsXG4gIE9uQ2hhbmdlcywgSW5qZWN0b3IsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCAqIGFzIHBsdWdpbnMgZnJvbSAnLi9wbHVnaW5zJztcbmltcG9ydCB7IHRvSFRNTCB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgRWRpdG9yIGZyb20gJy4vRWRpdG9yJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWVkaXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9lZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9lZGl0b3IuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEVkaXRvckNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbiAgfV0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxuICApIHsgfVxuXG4gIEBWaWV3Q2hpbGQoJ25neEVkaXRvcicsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgbmd4RWRpdG9yOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIGVkaXRvcjogRWRpdG9yO1xuICBASW5wdXQoKSBvdXRwdXRGb3JtYXQ6ICdkb2MnIHwgJ2h0bWwnO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdUeXBlIEhlcmUuLi4nO1xuICBASW5wdXQoKSBlbmFibGVkID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgZm9jdXNPdXQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBmb2N1c0luID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vdXRwdXRGb3JtYXQgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5vdXRwdXRGb3JtYXQgPSAnaHRtbCc7XG4gICAgfVxuXG4gICAgdGhpcy5lZGl0b3Iuc2V0Q29udGVudCh2YWx1ZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlQ2hhbmdlKGpzb25Eb2M6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdXRwdXRGb3JtYXQgPT09ICdodG1sJykge1xuICAgICAgY29uc3QgaHRtbCA9IHRvSFRNTChqc29uRG9jLCB0aGlzLmVkaXRvci5zY2hlbWEpO1xuICAgICAgdGhpcy5vbkNoYW5nZShodG1sKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9uQ2hhbmdlKGpzb25Eb2MpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRNZXRhKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgeyBkaXNwYXRjaCwgc3RhdGU6IHsgdHIgfSB9ID0gdGhpcy5lZGl0b3IudmlldztcbiAgICBkaXNwYXRjaCh0ci5zZXRNZXRhKGtleSwgdmFsdWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgZW5hYmxlKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0TWV0YSgnVVBEQVRFX0VESVRBQkxFJywgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGRpc2FibGUoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRNZXRhKCdVUERBVEVfRURJVEFCTEUnLCBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIHNldFBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNldE1ldGEoJ1VQREFURV9QTEFDRUhPTERFUicsIHBsYWNlaG9sZGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJQbHVnaW5zKCk6IHZvaWQge1xuICAgIHRoaXMuZWRpdG9yLnJlZ2lzdGVyUGx1Z2luKHBsdWdpbnMuZWRpdGFibGUodGhpcy5lbmFibGVkKSk7XG4gICAgdGhpcy5lZGl0b3IucmVnaXN0ZXJQbHVnaW4ocGx1Z2lucy5wbGFjZWhvbGRlcih0aGlzLnBsYWNlaG9sZGVyKSk7XG5cbiAgICB0aGlzLmVkaXRvci5yZWdpc3RlclBsdWdpbihwbHVnaW5zLmF0dHJpYnV0ZXMoe1xuICAgICAgY2xhc3M6ICdOZ3hFZGl0b3JfX0NvbnRlbnQnXG4gICAgfSkpO1xuXG4gICAgdGhpcy5lZGl0b3IucmVnaXN0ZXJQbHVnaW4ocGx1Z2lucy5mb2N1cygoKSA9PiB7XG4gICAgICB0aGlzLmZvY3VzSW4uZW1pdCgpO1xuICAgIH0pKTtcblxuICAgIHRoaXMuZWRpdG9yLnJlZ2lzdGVyUGx1Z2luKHBsdWdpbnMuZm9jdXMoKCkgPT4ge1xuICAgICAgdGhpcy5mb2N1c0luLmVtaXQoKTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLmVkaXRvci5yZWdpc3RlclBsdWdpbihwbHVnaW5zLmJsdXIoKCkgPT4ge1xuICAgICAgdGhpcy5mb2N1c091dC5lbWl0KCk7XG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH0pKTtcblxuICAgIHRoaXMuZWRpdG9yLnJlZ2lzdGVyUGx1Z2luKHBsdWdpbnMuaW1hZ2UodGhpcy5pbmplY3RvcikpO1xuICAgIHRoaXMuZWRpdG9yLnJlZ2lzdGVyUGx1Z2luKHBsdWdpbnMubGluaygpKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5lZGl0b3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmd4RWRpdG9yOiBSZXF1aXJlZCBlZGl0b3IgaW5zdGFuY2UnKTtcbiAgICB9XG5cbiAgICAvLyB0aGlzLnJlZ2lzdGVyQ3VzdG9tRWxlbWVudHMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyUGx1Z2lucygpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLm5neEVkaXRvci5uYXRpdmVFbGVtZW50LCB0aGlzLmVkaXRvci52aWV3LmRvbSk7XG5cbiAgICBjb25zdCBjb250ZW50Q2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5lZGl0b3IudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShqc29uRG9jID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKGpzb25Eb2MpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goY29udGVudENoYW5nZVN1YnNjcmlwdGlvbik7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXM/LnBsYWNlaG9sZGVyICYmICFjaGFuZ2VzLnBsYWNlaG9sZGVyLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5zZXRQbGFjZWhvbGRlcihjaGFuZ2VzLnBsYWNlaG9sZGVyLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXM/LmVuYWJsZWQgJiYgIWNoYW5nZXMuZW5hYmxlZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIGlmICghY2hhbmdlcy5lbmFibGVkLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiTmd4RWRpdG9yXCIgI25neEVkaXRvcj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG4iXX0=