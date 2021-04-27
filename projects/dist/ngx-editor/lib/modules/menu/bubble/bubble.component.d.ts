import { OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import Editor from '../../../Editor';
import { TBItems } from '../../../types';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { NgxEditorService } from '../../../editor.service';
import * as i0 from "@angular/core";
export declare class BubbleComponent implements OnInit, OnDestroy {
    private sanitizeHTML;
    private ngxeService;
    constructor(sanitizeHTML: SanitizeHtmlPipe, ngxeService: NgxEditorService);
    private get view();
    editor: Editor;
    private updateSubscription;
    execulableItems: TBItems[];
    activeItems: TBItems[];
    toolbar: TBItems[][];
    toggleCommands: TBItems[];
    getIcon(name: TBItems): SafeHtml;
    getTitle(name: string): string;
    onClick(e: MouseEvent, commandName: TBItems): void;
    private update;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<BubbleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BubbleComponent, "ngx-bubble", never, { "editor": "editor"; }, {}, never, never>;
}
//# sourceMappingURL=bubble.component.d.ts.map