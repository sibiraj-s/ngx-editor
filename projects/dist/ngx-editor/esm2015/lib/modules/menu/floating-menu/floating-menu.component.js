import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { NodeSelection } from 'prosemirror-state';
import { asyncScheduler, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import Icon from '../../../icons';
import * as i0 from "@angular/core";
import * as i1 from "../../../pipes/sanitize/sanitize-html.pipe";
import * as i2 from "@angular/common";
import * as i3 from "../bubble/bubble.component";
function FloatingMenuComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ngx-bubble", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("editor", ctx_r1.editor);
} }
const _c0 = ["*"];
export class FloatingMenuComponent {
    constructor(el, sanitizeHTML) {
        this.el = el;
        this.sanitizeHTML = sanitizeHTML;
        this.posLeft = 0;
        this.posTop = 0;
        this.showMenu = false;
        this.dragging = false;
        this.execulableItems = [];
        this.activeItems = [];
    }
    get display() {
        return {
            visibility: this.showMenu ? 'visible' : 'hidden',
            opacity: this.showMenu ? '1' : '0',
            top: this.posTop + 'px',
            left: this.posLeft + 'px',
        };
    }
    get view() {
        return this.editor.view;
    }
    onMouseDown(e) {
        if (this.el.nativeElement.contains(e.target)) {
            e.preventDefault();
            return;
        }
        this.dragging = true;
    }
    onKeyDown() {
        this.dragging = true;
        this.hide();
    }
    onMouseUp() {
        this.dragging = false;
        this.useUpdate();
    }
    onKeyUp() {
        this.dragging = false;
        this.useUpdate();
    }
    useUpdate() {
        if (!this.view) {
            return;
        }
        this.update(this.view);
    }
    getIcon(name) {
        const icon = Icon.getPath(name);
        return this.sanitizeHTML.transform(icon);
    }
    hide() {
        this.showMenu = false;
    }
    show() {
        this.showMenu = true;
    }
    calculateBubblePosition(view) {
        const { state: { selection } } = view;
        const { from } = selection;
        // the floating bubble itself
        const bubbleEl = this.el.nativeElement;
        const bubble = bubbleEl.getBoundingClientRect();
        // The box in which the tooltip is positioned, to use as base
        const box = bubbleEl.parentElement.getBoundingClientRect();
        const start = view.coordsAtPos(from);
        let left = start.left - box.left;
        const overflowsRight = (box.right < (start.left + bubble.width) ||
            bubble.right > box.right);
        if (overflowsRight) {
            left = box.width - bubble.width;
        }
        if (left < 0) {
            left = 0;
        }
        const bubbleHeight = bubble.height + parseInt(getComputedStyle(bubbleEl).marginBottom, 10);
        const top = (start.top - box.top) - bubbleHeight;
        return {
            left,
            top
        };
    }
    update(view) {
        const { state } = view;
        const { selection } = state;
        const { empty } = selection;
        if (selection instanceof NodeSelection) {
            if (selection.node.type.name === 'image') {
                this.hide();
                return;
            }
        }
        const hasFocus = this.view.hasFocus();
        if (!hasFocus || empty || this.dragging) {
            this.hide();
            return;
        }
        const { top, left } = this.calculateBubblePosition(this.view);
        this.posLeft = left;
        this.posTop = top;
        this.show();
    }
    ngOnInit() {
        if (!this.editor) {
            throw new Error('NgxEditor: Required editor instance');
        }
        this.updateSubscription = this.editor.update
            .subscribe((view) => {
            this.update(view);
        });
        this.resizeSubscription = fromEvent(window, 'resize').pipe(throttleTime(500, asyncScheduler, { leading: true, trailing: true })).subscribe(() => {
            this.useUpdate();
        });
    }
    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
        this.resizeSubscription.unsubscribe();
    }
}
FloatingMenuComponent.ɵfac = function FloatingMenuComponent_Factory(t) { return new (t || FloatingMenuComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.SanitizeHtmlPipe)); };
FloatingMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: FloatingMenuComponent, selectors: [["ngx-editor-floating-menu"]], hostVars: 2, hostBindings: function FloatingMenuComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mousedown", function FloatingMenuComponent_mousedown_HostBindingHandler($event) { return ctx.onMouseDown($event); }, false, i0.ɵɵresolveDocument)("keydown", function FloatingMenuComponent_keydown_HostBindingHandler() { return ctx.onKeyDown(); }, false, i0.ɵɵresolveDocument)("mouseup", function FloatingMenuComponent_mouseup_HostBindingHandler() { return ctx.onMouseUp(); }, false, i0.ɵɵresolveDocument)("keyup", function FloatingMenuComponent_keyup_HostBindingHandler() { return ctx.onKeyUp(); }, false, i0.ɵɵresolveDocument);
    } if (rf & 2) {
        i0.ɵɵstyleMap(ctx.display);
    } }, inputs: { editor: "editor" }, ngContentSelectors: _c0, decls: 4, vars: 1, consts: [["ref", ""], [4, "ngIf"], [3, "editor"]], template: function FloatingMenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", null, 0);
        i0.ɵɵprojection(2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, FloatingMenuComponent_ng_container_3_Template, 2, 1, "ng-container", 1);
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(1);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", _r0.children.length === 0);
    } }, directives: [i2.NgIf, i3.BubbleComponent], styles: ["*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before{box-sizing:border-box}[_nghost-%COMP%]{position:absolute;z-index:20;margin-bottom:.35rem;visibility:hidden;opacity:0}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FloatingMenuComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-editor-floating-menu',
                templateUrl: './floating-menu.component.html',
                styleUrls: ['./floating-menu.component.scss']
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.SanitizeHtmlPipe }]; }, { display: [{
            type: HostBinding,
            args: ['style']
        }], editor: [{
            type: Input
        }], onMouseDown: [{
            type: HostListener,
            args: ['document:mousedown', ['$event']]
        }], onKeyDown: [{
            type: HostListener,
            args: ['document:keydown']
        }], onMouseUp: [{
            type: HostListener,
            args: ['document:mouseup']
        }], onKeyUp: [{
            type: HostListener,
            args: ['document:keyup']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvbW9kdWxlcy9tZW51L2Zsb2F0aW5nLW1lbnUvZmxvYXRpbmctbWVudS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvbW9kdWxlcy9tZW51L2Zsb2F0aW5nLW1lbnUvZmxvYXRpbmctbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFjLFdBQVcsRUFDbEMsWUFBWSxFQUFFLEtBQUssRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxELE9BQU8sRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUMsT0FBTyxJQUFJLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztJQ1JsQyw2QkFBZ0Q7SUFDOUMsZ0NBQTJDO0lBQzdDLDBCQUFlOzs7SUFERCxlQUFpQjtJQUFqQixzQ0FBaUI7OztBRHFCL0IsTUFBTSxPQUFPLHFCQUFxQjtJQUVoQyxZQUFtQixFQUEyQixFQUFVLFlBQThCO1FBQW5FLE9BQUUsR0FBRixFQUFFLENBQXlCO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWtCO1FBaUI5RSxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUV6QixvQkFBZSxHQUFjLEVBQUUsQ0FBQztRQUNoQyxnQkFBVyxHQUFjLEVBQUUsQ0FBQztJQXhCOEQsQ0FBQztJQUUzRixJQUEwQixPQUFP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Z0MsQ0FBQzthQUM5Qzs0RkFLMkIsT0FBTztrQkFBaEMsV0FBVzttQkFBQyxPQUFPO1lBYVgsTUFBTTtrQkFBZCxLQUFLO1lBVzBDLFdBQVc7a0JBQTFELFlBQVk7bUJBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFRWixTQUFTO2tCQUExQyxZQUFZO21CQUFDLGtCQUFrQjtZQUtFLFNBQVM7a0JBQTFDLFlBQVk7bUJBQUMsa0JBQWtCO1lBS0EsT0FBTztrQkFBdEMsWUFBWTttQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBOb2RlU2VsZWN0aW9uIH0gZnJvbSAncHJvc2VtaXJyb3Itc3RhdGUnO1xuaW1wb3J0IHsgRWRpdG9yVmlldyB9IGZyb20gJ3Byb3NlbWlycm9yLXZpZXcnO1xuaW1wb3J0IHsgYXN5bmNTY2hlZHVsZXIsIGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0aHJvdHRsZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCBFZGl0b3IgZnJvbSAnLi4vLi4vLi4vRWRpdG9yJztcbmltcG9ydCBJY29uIGZyb20gJy4uLy4uLy4uL2ljb25zJztcbmltcG9ydCB7IFRCSXRlbXMgfSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBTYW5pdGl6ZUh0bWxQaXBlIH0gZnJvbSAnLi4vLi4vLi4vcGlwZXMvc2FuaXRpemUvc2FuaXRpemUtaHRtbC5waXBlJztcblxuaW50ZXJmYWNlIEJ1YmJsZVBvc2l0aW9uIHtcbiAgdG9wOiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWVkaXRvci1mbG9hdGluZy1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zsb2F0aW5nLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mbG9hdGluZy1tZW51LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgc2FuaXRpemVIVE1MOiBTYW5pdGl6ZUh0bWxQaXBlKSB7IH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlJykgZ2V0IGRpc3BsYXkoKTogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZpc2liaWxpdHk6IHRoaXMuc2hvd01lbnUgPyAndmlzaWJsZScgOiAnaGlkZGVuJyxcbiAgICAgIG9wYWNpdHk6IHRoaXMuc2hvd01lbnUgPyAnMScgOiAnMCcsXG4gICAgICB0b3A6IHRoaXMucG9zVG9wICsgJ3B4JyxcbiAgICAgIGxlZnQ6IHRoaXMucG9zTGVmdCArICdweCcsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHZpZXcoKTogRWRpdG9yVmlldyB7XG4gICAgcmV0dXJuIHRoaXMuZWRpdG9yLnZpZXc7XG4gIH1cblxuICBASW5wdXQoKSBlZGl0b3I6IEVkaXRvcjtcblxuICBwcml2YXRlIHBvc0xlZnQgPSAwO1xuICBwcml2YXRlIHBvc1RvcCA9IDA7XG4gIHByaXZhdGUgc2hvd01lbnUgPSBmYWxzZTtcbiAgcHJpdmF0ZSB1cGRhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBkcmFnZ2luZyA9IGZhbHNlO1xuICBwcml2YXRlIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBleGVjdWxhYmxlSXRlbXM6IFRCSXRlbXNbXSA9IFtdO1xuICBhY3RpdmVJdGVtczogVEJJdGVtc1tdID0gW107XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2Vkb3duJywgWyckZXZlbnQnXSkgb25Nb3VzZURvd24oZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZS50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJykgb25LZXlEb3duKCk6IHZvaWQge1xuICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2V1cCcpIG9uTW91c2VVcCgpOiB2b2lkIHtcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgdGhpcy51c2VVcGRhdGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleXVwJykgb25LZXlVcCgpOiB2b2lkIHtcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgdGhpcy51c2VVcGRhdGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXNlVXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy52aWV3KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUodGhpcy52aWV3KTtcbiAgfVxuXG4gIGdldEljb24obmFtZTogVEJJdGVtcyk6IFNhZmVIdG1sIHtcbiAgICBjb25zdCBpY29uID0gSWNvbi5nZXRQYXRoKG5hbWUpO1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplSFRNTC50cmFuc2Zvcm0oaWNvbik7XG4gIH1cblxuICBwcml2YXRlIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93TWVudSA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd01lbnUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCdWJibGVQb3NpdGlvbih2aWV3OiBFZGl0b3JWaWV3KTogQnViYmxlUG9zaXRpb24ge1xuICAgIGNvbnN0IHsgc3RhdGU6IHsgc2VsZWN0aW9uIH0gfSA9IHZpZXc7XG4gICAgY29uc3QgeyBmcm9tIH0gPSBzZWxlY3Rpb247XG5cbiAgICAvLyB0aGUgZmxvYXRpbmcgYnViYmxlIGl0c2VsZlxuICAgIGNvbnN0IGJ1YmJsZUVsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGJ1YmJsZSA9IGJ1YmJsZUVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gVGhlIGJveCBpbiB3aGljaCB0aGUgdG9vbHRpcCBpcyBwb3NpdGlvbmVkLCB0byB1c2UgYXMgYmFzZVxuICAgIGNvbnN0IGJveCA9IGJ1YmJsZUVsLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBzdGFydCA9IHZpZXcuY29vcmRzQXRQb3MoZnJvbSk7XG5cbiAgICBsZXQgbGVmdCA9IHN0YXJ0LmxlZnQgLSBib3gubGVmdDtcblxuICAgIGNvbnN0IG92ZXJmbG93c1JpZ2h0ID0gKFxuICAgICAgYm94LnJpZ2h0IDwgKHN0YXJ0LmxlZnQgKyBidWJibGUud2lkdGgpIHx8XG4gICAgICBidWJibGUucmlnaHQgPiBib3gucmlnaHRcbiAgICApO1xuXG4gICAgaWYgKG92ZXJmbG93c1JpZ2h0KSB7XG4gICAgICBsZWZ0ID0gYm94LndpZHRoIC0gYnViYmxlLndpZHRoO1xuICAgIH1cblxuICAgIGlmIChsZWZ0IDwgMCkge1xuICAgICAgbGVmdCA9IDA7XG4gICAgfVxuXG4gICAgY29uc3QgYnViYmxlSGVpZ2h0ID0gYnViYmxlLmhlaWdodCArIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoYnViYmxlRWwpLm1hcmdpbkJvdHRvbSwgMTApO1xuICAgIGNvbnN0IHRvcCA9IChzdGFydC50b3AgLSBib3gudG9wKSAtIGJ1YmJsZUhlaWdodDtcblxuICAgIHJldHVybiB7XG4gICAgICBsZWZ0LFxuICAgICAgdG9wXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKHZpZXc6IEVkaXRvclZpZXcpOiB2b2lkIHtcbiAgICBjb25zdCB7IHN0YXRlIH0gPSB2aWV3O1xuICAgIGNvbnN0IHsgc2VsZWN0aW9uIH0gPSBzdGF0ZTtcbiAgICBjb25zdCB7IGVtcHR5IH0gPSBzZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0aW9uIGluc3RhbmNlb2YgTm9kZVNlbGVjdGlvbikge1xuICAgICAgaWYgKHNlbGVjdGlvbi5ub2RlLnR5cGUubmFtZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhc0ZvY3VzID0gdGhpcy52aWV3Lmhhc0ZvY3VzKCk7XG5cbiAgICBpZiAoIWhhc0ZvY3VzIHx8IGVtcHR5IHx8IHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSB0aGlzLmNhbGN1bGF0ZUJ1YmJsZVBvc2l0aW9uKHRoaXMudmlldyk7XG5cbiAgICB0aGlzLnBvc0xlZnQgPSBsZWZ0O1xuICAgIHRoaXMucG9zVG9wID0gdG9wO1xuXG4gICAgdGhpcy5zaG93KCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZWRpdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05neEVkaXRvcjogUmVxdWlyZWQgZWRpdG9yIGluc3RhbmNlJyk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVTdWJzY3JpcHRpb24gPSB0aGlzLmVkaXRvci51cGRhdGVcbiAgICAgIC5zdWJzY3JpYmUoKHZpZXcpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGUodmlldyk7XG4gICAgICB9KTtcblxuICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpLnBpcGUoXG4gICAgICB0aHJvdHRsZVRpbWUoNTAwLCBhc3luY1NjaGVkdWxlciwgeyBsZWFkaW5nOiB0cnVlLCB0cmFpbGluZzogdHJ1ZSB9KVxuICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudXNlVXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxkaXYgI3JlZj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG48bmctY29udGFpbmVyICpuZ0lmPVwicmVmLmNoaWxkcmVuLmxlbmd0aCA9PT0gMFwiPlxuICA8bmd4LWJ1YmJsZSBbZWRpdG9yXT1cImVkaXRvclwiPjwvbmd4LWJ1YmJsZT5cbjwvbmctY29udGFpbmVyPlxuIl19