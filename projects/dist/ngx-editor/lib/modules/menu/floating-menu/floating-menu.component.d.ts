import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import Editor from '../../../Editor';
import { TBItems } from '../../../types';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import * as i0 from "@angular/core";
export declare class FloatingMenuComponent implements OnInit, OnDestroy {
    el: ElementRef<HTMLElement>;
    private sanitizeHTML;
    constructor(el: ElementRef<HTMLElement>, sanitizeHTML: SanitizeHtmlPipe);
    get display(): Partial<CSSStyleDeclaration>;
    private get view();
    editor: Editor;
    private posLeft;
    private posTop;
    private showMenu;
    private updateSubscription;
    private dragging;
    private resizeSubscription;
    execulableItems: TBItems[];
    activeItems: TBItems[];
    onMouseDown(e: MouseEvent): void;
    onKeyDown(): void;
    onMouseUp(): void;
    onKeyUp(): void;
    private useUpdate;
    getIcon(name: TBItems): SafeHtml;
    private hide;
    private show;
    private calculateBubblePosition;
    private update;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<FloatingMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<FloatingMenuComponent, "ngx-editor-floating-menu", never, { "editor": "editor"; }, {}, never, ["*"]>;
}
//# sourceMappingURL=floating-menu.component.d.ts.map