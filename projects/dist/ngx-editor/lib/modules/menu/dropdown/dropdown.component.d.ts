import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import { TBHeadingItems } from '../../../types';
import * as i0 from "@angular/core";
export declare class DropdownComponent implements OnInit, OnDestroy {
    private ngxeService;
    private menuService;
    private el;
    private editorView;
    private updateSubscription;
    group: string;
    items: TBHeadingItems[];
    isDropdownOpen: boolean;
    private activeItems;
    disabledItems: string[];
    activeItem: string | null;
    constructor(ngxeService: NgxEditorService, menuService: MenuService, el: ElementRef);
    get isSelected(): boolean;
    get isDropdownDisabled(): boolean;
    onDocumentClick(target: Node): void;
    getName(key: string): string;
    toggleDropdown(e: MouseEvent): void;
    onClick(e: MouseEvent, item: TBHeadingItems): void;
    private update;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<DropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<DropdownComponent, "ngx-dropdown", never, { "group": "group"; "items": "items"; }, {}, never, never>;
}
//# sourceMappingURL=dropdown.component.d.ts.map