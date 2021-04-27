import { OnDestroy, OnInit, EventEmitter, Renderer2, SimpleChanges, OnChanges, Injector } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import Editor from './Editor';
import * as i0 from "@angular/core";
export declare class NgxEditorComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    private renderer;
    private injector;
    constructor(renderer: Renderer2, injector: Injector);
    private ngxEditor;
    editor: Editor;
    outputFormat: 'doc' | 'html';
    placeholder: string;
    enabled: boolean;
    focusOut: EventEmitter<void>;
    focusIn: EventEmitter<void>;
    private subscriptions;
    private onChange;
    private onTouched;
    writeValue(value: Record<string, any> | string | null): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private handleChange;
    private setMeta;
    private enable;
    private disable;
    private setPlaceholder;
    private registerPlugins;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<NgxEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NgxEditorComponent, "ngx-editor", never, { "editor": "editor"; "outputFormat": "outputFormat"; "placeholder": "placeholder"; "enabled": "enabled"; }, { "focusOut": "focusOut"; "focusIn": "focusIn"; }, never, ["*"]>;
}
//# sourceMappingURL=editor.component.d.ts.map