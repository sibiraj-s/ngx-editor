import { NgxEditorConfig } from './types';
import Locals from './Locals';
import * as i0 from "@angular/core";
export declare class NgxEditorServiceConfig {
    locals: {};
    static ɵfac: i0.ɵɵFactoryDef<NgxEditorServiceConfig, never>;
    static ɵprov: i0.ɵɵInjectableDef<NgxEditorServiceConfig>;
}
export declare class NgxEditorService {
    config: NgxEditorServiceConfig;
    constructor(config?: NgxEditorServiceConfig);
    get locals(): Locals;
    static ɵfac: i0.ɵɵFactoryDef<NgxEditorService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<NgxEditorService>;
}
export declare const provideMyServiceOptions: (config?: NgxEditorConfig) => NgxEditorServiceConfig;
//# sourceMappingURL=editor.service.d.ts.map