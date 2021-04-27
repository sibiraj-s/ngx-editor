import { ModuleWithProviders } from '@angular/core';
import { NgxEditorConfig } from './types';
import * as i0 from "@angular/core";
import * as i1 from "./editor.component";
import * as i2 from "./components/image-view/image-view.component";
import * as i3 from "@angular/common";
import * as i4 from "./modules/menu/menu.module";
import * as i5 from "./modules/menu/menu.component";
import * as i6 from "./modules/menu/floating-menu/floating-menu.component";
export declare class NgxEditorModule {
    static forRoot(config: NgxEditorConfig): ModuleWithProviders<NgxEditorModule>;
    static forChild(config: NgxEditorConfig): ModuleWithProviders<NgxEditorModule>;
    static ɵfac: i0.ɵɵFactoryDef<NgxEditorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<NgxEditorModule, [typeof i1.NgxEditorComponent, typeof i2.ImageViewComponent], [typeof i3.CommonModule, typeof i4.MenuModule], [typeof i1.NgxEditorComponent, typeof i5.MenuComponent, typeof i6.FloatingMenuComponent]>;
    static ɵinj: i0.ɵɵInjectorDef<NgxEditorModule>;
}
//# sourceMappingURL=editor.module.d.ts.map