import { OnDestroy, OnInit } from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import { TBItems, ToolbarItem } from '../../../types';
import * as i0 from "@angular/core";
export declare class ToggleCommandComponent implements OnInit, OnDestroy {
    private ngxeService;
    private menuService;
    toolbarItem: ToolbarItem;
    get name(): TBItems;
    html: string;
    editorView: EditorView;
    private updateSubscription;
    constructor(ngxeService: NgxEditorService, menuService: MenuService);
    isActive: boolean;
    disabled: boolean;
    toggle(e: MouseEvent): void;
    update: (view: EditorView) => void;
    getTitle(name: string): string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<ToggleCommandComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ToggleCommandComponent, "ngx-toggle-command", never, { "toolbarItem": "toolbarItem"; }, {}, never, never>;
}
//# sourceMappingURL=toggle-command.component.d.ts.map