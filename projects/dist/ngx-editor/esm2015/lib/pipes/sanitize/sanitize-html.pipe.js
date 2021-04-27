import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class SanitizeHtmlPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
SanitizeHtmlPipe.ɵfac = function SanitizeHtmlPipe_Factory(t) { return new (t || SanitizeHtmlPipe)(i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
SanitizeHtmlPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sanitizeHtml", type: SanitizeHtmlPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SanitizeHtmlPipe, [{
        type: Pipe,
        args: [{
                name: 'sanitizeHtml'
            }]
    }], function () { return [{ type: i1.DomSanitizer }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FuaXRpemUtaHRtbC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWVkaXRvci9zcmMvbGliL3BpcGVzL3Nhbml0aXplL3Nhbml0aXplLWh0bWwucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7O0FBT3BELE1BQU0sT0FBTyxnQkFBZ0I7SUFFM0IsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFJLENBQUM7SUFFaEQsU0FBUyxDQUFDLEtBQWE7UUFDckIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7O2dGQU5VLGdCQUFnQjt1RUFBaEIsZ0JBQWdCO3VGQUFoQixnQkFBZ0I7Y0FKNUIsSUFBSTtlQUFDO2dCQUNKLElBQUksRUFBRSxjQUFjO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdzYW5pdGl6ZUh0bWwnXG59KVxuXG5leHBvcnQgY2xhc3MgU2FuaXRpemVIdG1sUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHsgfVxuXG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogU2FmZUh0bWwge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==