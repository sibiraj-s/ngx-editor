import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["imgEl"];
function ImageViewComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 4);
    i0.ɵɵelementStart(1, "span", 5);
    i0.ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_1_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.startResizing($event, "left"); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 6);
    i0.ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_2_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.startResizing($event, "right"); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 7);
    i0.ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_3_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.startResizing($event, "left"); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 8);
    i0.ɵɵlistener("mousedown", function ImageViewComponent_span_1_Template_span_mousedown_4_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.startResizing($event, "right"); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
const _c1 = function (a0) { return { "NgxEditor__Resizer--Active": a0 }; };
export class ImageViewComponent {
    constructor() {
        this.alt = '';
        this.title = '';
        this.outerWidth = '';
        this.selected = false;
        this.imageResize = new EventEmitter();
    }
    startResizing(e, direction) {
        e.preventDefault();
        this.resizeImage(e, direction);
    }
    resizeImage(evt, direction) {
        const startX = evt.pageX;
        const startWidth = this.imgEl.nativeElement.clientWidth;
        const isLeftResize = direction === 'left';
        const { width } = window.getComputedStyle(this.view.dom);
        const editorWidth = parseInt(width, 10);
        const onMouseMove = (e) => {
            const currentX = e.pageX;
            const diffInPx = currentX - startX;
            const computedWidth = isLeftResize ? startWidth - diffInPx : startWidth + diffInPx;
            // prevent image overflow the editor
            // prevent resizng below 20px
            if (computedWidth > editorWidth || computedWidth < 20) {
                return;
            }
            this.outerWidth = `${computedWidth}px`;
        };
        const onMouseUp = (e) => {
            e.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            this.imageResize.emit();
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
}
ImageViewComponent.ɵfac = function ImageViewComponent_Factory(t) { return new (t || ImageViewComponent)(); };
ImageViewComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ImageViewComponent, selectors: [["ngx-image-view"]], viewQuery: function ImageViewComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 3);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.imgEl = _t.first);
    } }, inputs: { src: "src", alt: "alt", title: "title", outerWidth: "outerWidth", selected: "selected", view: "view" }, outputs: { imageResize: "imageResize" }, decls: 4, vars: 9, consts: [[1, "NgxEditor__ImageWrapper", 3, "ngClass"], ["class", "NgxEditor__ResizeHandle", 4, "ngIf"], [3, "src", "alt", "title"], ["imgEl", ""], [1, "NgxEditor__ResizeHandle"], [1, "NgxEditor__ResizeHandle--TL", 3, "mousedown"], [1, "NgxEditor__ResizeHandle--TR", 3, "mousedown"], [1, "NgxEditor__ResizeHandle--BL", 3, "mousedown"], [1, "NgxEditor__ResizeHandle--BR", 3, "mousedown"]], template: function ImageViewComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtemplate(1, ImageViewComponent_span_1_Template, 5, 0, "span", 1);
        i0.ɵɵelement(2, "img", 2, 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵstyleProp("width", ctx.outerWidth);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c1, ctx.selected));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.selected);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("src", ctx.src, i0.ɵɵsanitizeUrl)("alt", ctx.alt)("title", ctx.title);
    } }, directives: [i1.NgClass, i1.NgIf], styles: ["*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before{box-sizing:border-box}img[_ngcontent-%COMP%]{width:100%;height:100%}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]{position:relative;display:inline-block;line-height:0;padding:2px}.NgxEditor__ImageWrapper.NgxEditor__Resizer--Active[_ngcontent-%COMP%]{padding:1px;border:1px solid #1a73e8}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]{position:absolute;height:100%;width:100%}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BL[_ngcontent-%COMP%], .NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BR[_ngcontent-%COMP%], .NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TL[_ngcontent-%COMP%], .NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TR[_ngcontent-%COMP%]{position:absolute;width:7px;height:7px;background-color:#1a73e8;border:1px solid #fff}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BR[_ngcontent-%COMP%]{bottom:-5px;right:-5px;cursor:se-resize}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TR[_ngcontent-%COMP%]{top:-5px;right:-5px;cursor:ne-resize}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--TL[_ngcontent-%COMP%]{top:-5px;left:-5px;cursor:nw-resize}.NgxEditor__ImageWrapper[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle[_ngcontent-%COMP%]   .NgxEditor__ResizeHandle--BL[_ngcontent-%COMP%]{bottom:-5px;left:-5px;cursor:sw-resize}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ImageViewComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-image-view',
                templateUrl: './image-view.component.html',
                styleUrls: ['./image-view.component.scss']
            }]
    }], function () { return []; }, { src: [{
            type: Input
        }], alt: [{
            type: Input
        }], title: [{
            type: Input
        }], outerWidth: [{
            type: Input
        }], selected: [{
            type: Input
        }], view: [{
            type: Input
        }], imageResize: [{
            type: Output
        }], imgEl: [{
            type: ViewChild,
            args: ['imgEl', { static: true }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvY29tcG9uZW50cy9pbWFnZS12aWV3L2ltYWdlLXZpZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWVkaXRvci9zcmMvbGliL2NvbXBvbmVudHMvaW1hZ2Utdmlldy9pbWFnZS12aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQWMsWUFBWSxFQUNuQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFDekIsTUFBTSxlQUFlLENBQUM7Ozs7OztJQ0ZyQiwrQkFBdUQ7SUFDckQsK0JBQXVGO0lBQTVDLHlNQUFtQyxNQUFNLEtBQUU7SUFBQyxpQkFBTztJQUM5RiwrQkFBdUY7SUFBN0MseU1BQW1DLE9BQU8sS0FBRTtJQUFDLGlCQUFPO0lBQzlGLCtCQUFzRjtJQUE1Qyx5TUFBbUMsTUFBTSxLQUFFO0lBQUMsaUJBQU87SUFDN0YsK0JBQXVGO0lBQTdDLHlNQUFtQyxPQUFPLEtBQUU7SUFBQyxpQkFBTztJQUNoRyxpQkFBTzs7O0FETVQsTUFBTSxPQUFPLGtCQUFrQjtJQVk3QjtRQVZTLFFBQUcsR0FBRyxFQUFFLENBQUM7UUFDVCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2hCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUkzQixDQUFDO0lBRWpCLGFBQWEsQ0FBQyxDQUFhLEVBQUUsU0FBaUI7UUFDNUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBZSxFQUFFLFNBQWlCO1FBQzVDLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDekIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBRXhELE1BQU0sWUFBWSxHQUFHLFNBQVMsS0FBSyxNQUFNLENBQUM7UUFFMUMsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFeEMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFhLEVBQUUsRUFBRTtZQUNwQyxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3pCLE1BQU0sUUFBUSxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDbkMsTUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1lBRW5GLG9DQUFvQztZQUNwQyw2QkFBNkI7WUFDN0IsSUFBSSxhQUFhLEdBQUcsV0FBVyxJQUFJLGFBQWEsR0FBRyxFQUFFLEVBQUU7Z0JBQ3JELE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxhQUFhLElBQUksQ0FBQztRQUN6QyxDQUFDLENBQUM7UUFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQWEsRUFBRSxFQUFFO1lBQ2xDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUVuQixRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUM7UUFFRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7b0ZBckRVLGtCQUFrQjt1REFBbEIsa0JBQWtCOzs7Ozs7UUNaL0IsK0JBQXNIO1FBQ3BILHFFQUtPO1FBQ1AsNEJBQXNEO1FBQ3hELGlCQUFPOztRQVJvRix1Q0FBMEI7UUFBL0Usa0VBQW9EO1FBQ2pELGVBQWM7UUFBZCxtQ0FBYztRQU1oRCxlQUFXO1FBQVgsK0NBQVcsZ0JBQUEsb0JBQUE7O3VGREtMLGtCQUFrQjtjQU45QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsV0FBVyxFQUFFLDZCQUE2QjtnQkFDMUMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7YUFDM0M7c0NBR1UsR0FBRztrQkFBWCxLQUFLO1lBQ0csR0FBRztrQkFBWCxLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFFSSxXQUFXO2tCQUFwQixNQUFNO1lBRStCLEtBQUs7a0JBQTFDLFNBQVM7bUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZGl0b3JWaWV3IH0gZnJvbSAncHJvc2VtaXJyb3Itdmlldyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1pbWFnZS12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ltYWdlLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pbWFnZS12aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBJbWFnZVZpZXdDb21wb25lbnQge1xuICBASW5wdXQoKSBzcmM6IHN0cmluZztcbiAgQElucHV0KCkgYWx0ID0gJyc7XG4gIEBJbnB1dCgpIHRpdGxlID0gJyc7XG4gIEBJbnB1dCgpIG91dGVyV2lkdGggPSAnJztcbiAgQElucHV0KCkgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdmlldzogRWRpdG9yVmlldztcblxuICBAT3V0cHV0KCkgaW1hZ2VSZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnaW1nRWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSBpbWdFbDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHN0YXJ0UmVzaXppbmcoZTogTW91c2VFdmVudCwgZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5yZXNpemVJbWFnZShlLCBkaXJlY3Rpb24pO1xuICB9XG5cbiAgcmVzaXplSW1hZ2UoZXZ0OiBNb3VzZUV2ZW50LCBkaXJlY3Rpb246IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0WCA9IGV2dC5wYWdlWDtcbiAgICBjb25zdCBzdGFydFdpZHRoID0gdGhpcy5pbWdFbC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgY29uc3QgaXNMZWZ0UmVzaXplID0gZGlyZWN0aW9uID09PSAnbGVmdCc7XG5cbiAgICBjb25zdCB7IHdpZHRoIH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnZpZXcuZG9tKTtcbiAgICBjb25zdCBlZGl0b3JXaWR0aCA9IHBhcnNlSW50KHdpZHRoLCAxMCk7XG5cbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50WCA9IGUucGFnZVg7XG4gICAgICBjb25zdCBkaWZmSW5QeCA9IGN1cnJlbnRYIC0gc3RhcnRYO1xuICAgICAgY29uc3QgY29tcHV0ZWRXaWR0aCA9IGlzTGVmdFJlc2l6ZSA/IHN0YXJ0V2lkdGggLSBkaWZmSW5QeCA6IHN0YXJ0V2lkdGggKyBkaWZmSW5QeDtcblxuICAgICAgLy8gcHJldmVudCBpbWFnZSBvdmVyZmxvdyB0aGUgZWRpdG9yXG4gICAgICAvLyBwcmV2ZW50IHJlc2l6bmcgYmVsb3cgMjBweFxuICAgICAgaWYgKGNvbXB1dGVkV2lkdGggPiBlZGl0b3JXaWR0aCB8fCBjb21wdXRlZFdpZHRoIDwgMjApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm91dGVyV2lkdGggPSBgJHtjb21wdXRlZFdpZHRofXB4YDtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZVVwID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCk7XG5cbiAgICAgIHRoaXMuaW1hZ2VSZXNpemUuZW1pdCgpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gIH1cbn1cbiIsIjxzcGFuIGNsYXNzPVwiTmd4RWRpdG9yX19JbWFnZVdyYXBwZXJcIiBbbmdDbGFzc109XCJ7J05neEVkaXRvcl9fUmVzaXplci0tQWN0aXZlJzogc2VsZWN0ZWR9XCIgW3N0eWxlLndpZHRoXT1cIm91dGVyV2lkdGhcIj5cbiAgPHNwYW4gY2xhc3M9XCJOZ3hFZGl0b3JfX1Jlc2l6ZUhhbmRsZVwiICpuZ0lmPVwic2VsZWN0ZWRcIj5cbiAgICA8c3BhbiBjbGFzcz1cIk5neEVkaXRvcl9fUmVzaXplSGFuZGxlLS1UTFwiICAobW91c2Vkb3duKT1cInN0YXJ0UmVzaXppbmcoJGV2ZW50LCAnbGVmdCcpXCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiTmd4RWRpdG9yX19SZXNpemVIYW5kbGUtLVRSXCIgKG1vdXNlZG93bik9XCJzdGFydFJlc2l6aW5nKCRldmVudCwgJ3JpZ2h0JylcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJOZ3hFZGl0b3JfX1Jlc2l6ZUhhbmRsZS0tQkxcIiAobW91c2Vkb3duKT1cInN0YXJ0UmVzaXppbmcoJGV2ZW50LCAnbGVmdCcpXCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiTmd4RWRpdG9yX19SZXNpemVIYW5kbGUtLUJSXCIgKG1vdXNlZG93bik9XCJzdGFydFJlc2l6aW5nKCRldmVudCwgJ3JpZ2h0JylcIj48L3NwYW4+XG4gIDwvc3Bhbj5cbiAgPGltZyBbc3JjXT1cInNyY1wiIFthbHRdPVwiYWx0XCIgW3RpdGxlXT1cInRpdGxlXCIgI2ltZ0VsIC8+XG48L3NwYW4+XG4iXX0=