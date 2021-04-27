import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import * as i0 from "@angular/core";
export declare class ColorPickerComponent implements OnInit, OnDestroy {
    private el;
    private menuService;
    private ngxeService;
    presets: string[][];
    type: string;
    constructor(el: ElementRef, menuService: MenuService, ngxeService: NgxEditorService);
    get valid(): boolean;
    get disabled(): boolean;
    get title(): string;
    get icon(): string;
    private get command();
    private updateSubscription;
    private editorView;
    showPopup: boolean;
    isActive: boolean;
    activeColors: string[];
    private canExecute;
    getContrastYIQ(hexcolor: string): string;
    onDocumentClick(e: MouseEvent): void;
    private hidePopup;
    togglePopup(e: MouseEvent): void;
    remove(e: MouseEvent): void;
    onColorSelect(e: MouseEvent, color: string): void;
    private update;
    getLabel(key: string): string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<ColorPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ColorPickerComponent, "ngx-color-picker", never, { "presets": "presets"; "type": "type"; }, {}, never, never>;
}
//# sourceMappingURL=color-picker.component.d.ts.map