import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class SanitizeHtmlPipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(value: string): SafeHtml;
    static ɵfac: i0.ɵɵFactoryDef<SanitizeHtmlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<SanitizeHtmlPipe, "sanitizeHtml">;
}
//# sourceMappingURL=sanitize-html.pipe.d.ts.map