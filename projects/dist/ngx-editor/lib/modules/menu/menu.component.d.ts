import { OnInit, TemplateRef } from '@angular/core';
import { Toolbar, ToolbarItem, ToolbarDropdown } from '../../types';
import { MenuService } from './menu.service';
import Editor from '../../Editor';
import * as i0 from "@angular/core";
export declare class MenuComponent implements OnInit {
    private menuService;
    toolbar: Toolbar;
    colorPresets: string[];
    disabled: boolean;
    editor: Editor;
    customMenuRef: TemplateRef<any> | null;
    toggleCommands: any[];
    iconContainerClass: string[];
    dropdownContainerClass: string[];
    seperatorClass: string[];
    constructor(menuService: MenuService);
    get presets(): string[][];
    isDropDown(item: ToolbarItem): boolean;
    getDropdownItems(item: ToolbarItem): ToolbarDropdown;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<MenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<MenuComponent, "ngx-editor-menu", never, { "toolbar": "toolbar"; "colorPresets": "colorPresets"; "disabled": "disabled"; "editor": "editor"; "customMenuRef": "customMenuRef"; }, {}, never, never>;
}
//# sourceMappingURL=menu.component.d.ts.map