import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import Editor from '../../Editor';
import * as i0 from "@angular/core";
export declare class MenuService {
    editor: Editor;
    customMenuRefChange: Subject<TemplateRef<any>>;
    constructor();
    setCustomMenuRef(c: TemplateRef<any>): void;
    static ɵfac: i0.ɵɵFactoryDef<MenuService, never>;
    static ɵprov: i0.ɵɵInjectableDef<MenuService>;
}
//# sourceMappingURL=menu.service.d.ts.map