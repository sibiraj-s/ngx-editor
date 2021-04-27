import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import * as i0 from "@angular/core";
export declare class LinkComponent implements OnInit, OnDestroy {
    private el;
    private ngxeService;
    private menuService;
    showPopup: boolean;
    isActive: boolean;
    private canExecute;
    private editorView;
    private updateSubscription;
    form: FormGroup;
    constructor(el: ElementRef, ngxeService: NgxEditorService, menuService: MenuService);
    get valid(): boolean;
    get disabled(): boolean;
    get icon(): string;
    get href(): AbstractControl;
    get text(): AbstractControl;
    onDocumentClick(e: MouseEvent): void;
    getLabel(key: string): string;
    private hideForm;
    onMouseDown(e: MouseEvent): void;
    private setText;
    private update;
    insertLink(e: MouseEvent): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<LinkComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<LinkComponent, "ngx-link", never, {}, {}, never, never>;
}
//# sourceMappingURL=link.component.d.ts.map