import { ElementRef, EventEmitter } from '@angular/core';
import { EditorView } from 'prosemirror-view';
import * as i0 from "@angular/core";
export declare class ImageViewComponent {
    src: string;
    alt: string;
    title: string;
    outerWidth: string;
    selected: boolean;
    view: EditorView;
    imageResize: EventEmitter<any>;
    imgEl: ElementRef;
    constructor();
    startResizing(e: MouseEvent, direction: string): void;
    resizeImage(evt: MouseEvent, direction: string): void;
    static ɵfac: i0.ɵɵFactoryDef<ImageViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ImageViewComponent, "ngx-image-view", never, { "src": "src"; "alt": "alt"; "title": "title"; "outerWidth": "outerWidth"; "selected": "selected"; "view": "view"; }, { "imageResize": "imageResize"; }, never, never>;
}
//# sourceMappingURL=image-view.component.d.ts.map