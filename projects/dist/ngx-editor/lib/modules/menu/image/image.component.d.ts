import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import * as i0 from "@angular/core";
export declare class ImageComponent implements OnInit, OnDestroy {
    private el;
    private ngxeService;
    private menuService;
    showPopup: boolean;
    isActive: boolean;
    private updateSubscription;
    form: FormGroup;
    private editorView;
    constructor(el: ElementRef, ngxeService: NgxEditorService, menuService: MenuService);
    get valid(): boolean;
    get icon(): string;
    get src(): AbstractControl;
    onDocumentClick(e: MouseEvent): void;
    getLabel(key: string): string;
    private hideForm;
    onMouseDown(e: MouseEvent): void;
    private fillForm;
    private update;
    insertLink(e: MouseEvent): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<ImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ImageComponent, "ngx-image", never, {}, {}, never, never>;
}
//# sourceMappingURL=image.component.d.ts.map