import { Component, HostBinding, HostListener, Input } from '@angular/core';
import Icon from '../../../icons';
import { TextColor, TextBackgroundColor } from '../MenuCommands';
import * as i0 from "@angular/core";
import * as i1 from "../menu.service";
import * as i2 from "../../../editor.service";
import * as i3 from "@angular/common";
import * as i4 from "../../../pipes/sanitize/sanitize-html.pipe";
const _c0 = function (a0, a1) { return { backgroundColor: a0, color: a1 }; };
const _c1 = function (a0) { return { "NgxEditor__Color--Active": a0 }; };
function ColorPickerComponent_div_2_div_1_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("mousedown", function ColorPickerComponent_div_2_div_1_button_1_Template_button_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r6); const color_r4 = ctx.$implicit; const ctx_r5 = i0.ɵɵnextContext(3); return ctx_r5.onColorSelect($event, color_r4); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(3, _c0, color_r4, ctx_r3.getContrastYIQ(color_r4)))("title", color_r4)("ngClass", i0.ɵɵpureFunction1(6, _c1, ctx_r3.activeColors.includes(color_r4)));
} }
function ColorPickerComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtemplate(1, ColorPickerComponent_div_2_div_1_button_1_Template, 1, 8, "button", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const colorGroup_r2 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", colorGroup_r2);
} }
function ColorPickerComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, ColorPickerComponent_div_2_div_1_Template, 2, 1, "div", 3);
    i0.ɵɵelementStart(2, "button", 4);
    i0.ɵɵlistener("mousedown", function ColorPickerComponent_div_2_Template_button_mousedown_2_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.remove($event); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.presets);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r0.isActive);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getLabel("remove"), " ");
} }
export class ColorPickerComponent {
    constructor(el, menuService, ngxeService) {
        this.el = el;
        this.menuService = menuService;
        this.ngxeService = ngxeService;
        this.showPopup = false;
        this.isActive = false;
        this.activeColors = [];
        this.canExecute = true;
        this.update = (view) => {
            const { state } = view;
            this.canExecute = this.command.canExecute(state);
            this.isActive = this.command.isActive(state);
            this.activeColors = [];
            if (this.isActive) {
                this.activeColors = this.command.getActiveColors(state);
            }
        };
    }
    get valid() {
        return this.isActive || this.showPopup;
    }
    get disabled() {
        return !this.canExecute;
    }
    get title() {
        return this.getLabel(this.type === 'text_color' ? 'text_color' : 'background_color');
    }
    get icon() {
        return Icon.get(this.type === 'text_color' ? 'text_color' : 'color_fill');
    }
    get command() {
        return this.type === 'text_color' ? TextColor : TextBackgroundColor;
    }
    getContrastYIQ(hexcolor) {
        hexcolor = hexcolor.replace('#', '');
        const r = parseInt(hexcolor.substr(0, 2), 16);
        const g = parseInt(hexcolor.substr(2, 2), 16);
        const b = parseInt(hexcolor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }
    onDocumentClick(e) {
        if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
            this.hidePopup();
        }
    }
    hidePopup() {
        this.showPopup = false;
    }
    togglePopup(e) {
        e.preventDefault();
        if (e.button !== 0) {
            return;
        }
        this.showPopup = !this.showPopup;
    }
    remove(e) {
        e.preventDefault();
        const { state, dispatch } = this.editorView;
        this.command.remove()(state, dispatch);
        this.hidePopup();
    }
    onColorSelect(e, color) {
        e.preventDefault();
        if (e.button !== 0) {
            return;
        }
        const { state, dispatch } = this.editorView;
        if (this.type === 'text_color') {
            const attrs = { color };
            this.command.apply(attrs)(state, dispatch);
        }
        else {
            const attrs = { backgroundColor: color };
            this.command.apply(attrs)(state, dispatch);
        }
        if (!this.editorView.hasFocus()) {
            this.editorView.focus();
        }
        this.hidePopup();
    }
    getLabel(key) {
        return this.ngxeService.locals.get(key);
    }
    ngOnInit() {
        this.editorView = this.menuService.editor.view;
        this.updateSubscription = this.menuService.editor.update.subscribe((view) => {
            this.update(view);
        });
    }
    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }
}
ColorPickerComponent.ɵfac = function ColorPickerComponent_Factory(t) { return new (t || ColorPickerComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.MenuService), i0.ɵɵdirectiveInject(i2.NgxEditorService)); };
ColorPickerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ColorPickerComponent, selectors: [["ngx-color-picker"]], hostVars: 4, hostBindings: function ColorPickerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mousedown", function ColorPickerComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, i0.ɵɵresolveDocument);
    } if (rf & 2) {
        i0.ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.valid)("NgxEditor--Disabled", ctx.disabled);
    } }, inputs: { presets: "presets", type: "type" }, decls: 3, vars: 5, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "title", "mousedown"], ["class", "NgxEditor__Popup", 4, "ngIf"], [1, "NgxEditor__Popup"], ["class", "NgxEditor__ColorContainer", 4, "ngFor", "ngForOf"], [1, "NgxEditor__MenuItem--Button", 3, "disabled", "mousedown"], [1, "NgxEditor__ColorContainer"], ["class", "NgxEditor__Color", 3, "ngStyle", "title", "ngClass", "mousedown", 4, "ngFor", "ngForOf"], [1, "NgxEditor__Color", 3, "ngStyle", "title", "ngClass", "mousedown"]], template: function ColorPickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("mousedown", function ColorPickerComponent_Template_div_mousedown_0_listener($event) { return ctx.togglePopup($event); });
        i0.ɵɵpipe(1, "sanitizeHtml");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(2, ColorPickerComponent_div_2_Template, 4, 3, "div", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 3, ctx.icon), i0.ɵɵsanitizeHtml)("title", ctx.title);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.showPopup);
    } }, directives: [i3.NgIf, i3.NgForOf, i3.NgStyle, i3.NgClass], pipes: [i4.SanitizeHtmlPipe], styles: ["@charset \"UTF-8\";.NgxEditor__Popup[_ngcontent-%COMP%]{width:230px}.NgxEditor__ColorContainer[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.NgxEditor__ColorContainer[_ngcontent-%COMP%] + .NgxEditor__ColorContainer[_ngcontent-%COMP%]{margin-top:5px}.NgxEditor__Color[_ngcontent-%COMP%]{border:none;outline:none;border-radius:6px;width:24px;height:24px;flex-shrink:0}.NgxEditor__Color--Active[_ngcontent-%COMP%]:after{content:\"\u2714\";font-size:90%}.NgxEditor__MenuItem--Button[_ngcontent-%COMP%]{margin-top:5px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ColorPickerComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-color-picker',
                templateUrl: './color-picker.component.html',
                styleUrls: ['./color-picker.component.scss']
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.MenuService }, { type: i2.NgxEditorService }]; }, { presets: [{
            type: Input
        }], type: [{
            type: Input
        }], valid: [{
            type: HostBinding,
            args: ['class.NgxEditor__MenuItem--Active']
        }], disabled: [{
            type: HostBinding,
            args: ['class.NgxEditor--Disabled']
        }], onDocumentClick: [{
            type: HostListener,
            args: ['document:mousedown', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL25neC1lZGl0b3Ivc3JjL2xpYi9tb2R1bGVzL21lbnUvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvbW9kdWxlcy9tZW51L2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFBYyxXQUFXLEVBQ2xDLFlBQVksRUFBYSxLQUFLLEVBQy9CLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sSUFBSSxNQUFNLGdCQUFnQixDQUFDO0FBR2xDLE9BQU8sRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7OztJQ0o3RCxpQ0FHeUU7SUFEdkUseVFBQTBDO0lBQzZCLGlCQUFTOzs7O0lBRmhGLCtGQUFpRSxtQkFBQSwrRUFBQTs7O0lBRnJFLDhCQUEwRTtJQUN4RSx1RkFHa0Y7SUFDcEYsaUJBQU07OztJQUorQyxlQUFhO0lBQWIsdUNBQWE7Ozs7SUFGcEUsOEJBQWdEO0lBQzlDLDJFQUtNO0lBRU4saUNBQWdHO0lBQXBELHdNQUE0QjtJQUN0RSxZQUNGO0lBQUEsaUJBQVM7SUFDWCxpQkFBTTs7O0lBVndCLGVBQVU7SUFBVix3Q0FBVTtJQU9tQyxlQUFzQjtJQUF0QiwyQ0FBc0I7SUFDN0YsZUFDRjtJQURFLDBEQUNGOztBREtGLE1BQU0sT0FBTyxvQkFBb0I7SUFJL0IsWUFDVSxFQUFjLEVBQ2QsV0FBd0IsRUFDeEIsV0FBNkI7UUFGN0IsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQXlCdkMsY0FBUyxH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LGVBQWU7a0JBQTlELFlBQVk7bUJBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgSW5wdXQsIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVkaXRvclZpZXcgfSBmcm9tICdwcm9zZW1pcnJvci12aWV3JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgSWNvbiBmcm9tICcuLi8uLi8uLi9pY29ucyc7XG5pbXBvcnQgeyBOZ3hFZGl0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZWRpdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVudVNlcnZpY2UgfSBmcm9tICcuLi9tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgVGV4dENvbG9yLCBUZXh0QmFja2dyb3VuZENvbG9yIH0gZnJvbSAnLi4vTWVudUNvbW1hbmRzJztcblxudHlwZSBDb21tYW5kID0gdHlwZW9mIFRleHRDb2xvciB8IHR5cGVvZiBUZXh0QmFja2dyb3VuZENvbG9yO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtY29sb3ItcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbG9yLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbG9yLXBpY2tlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwcmVzZXRzOiBzdHJpbmdbXVtdO1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIG1lbnVTZXJ2aWNlOiBNZW51U2VydmljZSxcbiAgICBwcml2YXRlIG5neGVTZXJ2aWNlOiBOZ3hFZGl0b3JTZXJ2aWNlXG4gICkgeyB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5OZ3hFZGl0b3JfX01lbnVJdGVtLS1BY3RpdmUnKSBnZXQgdmFsaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBY3RpdmUgfHwgdGhpcy5zaG93UG9wdXA7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLk5neEVkaXRvci0tRGlzYWJsZWQnKSBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmNhbkV4ZWN1dGU7XG4gIH1cblxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRMYWJlbCh0aGlzLnR5cGUgPT09ICd0ZXh0X2NvbG9yJyA/ICd0ZXh0X2NvbG9yJyA6ICdiYWNrZ3JvdW5kX2NvbG9yJyk7XG4gIH1cblxuICBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiBJY29uLmdldCh0aGlzLnR5cGUgPT09ICd0ZXh0X2NvbG9yJyA/ICd0ZXh0X2NvbG9yJyA6ICdjb2xvcl9maWxsJyk7XG4gIH1cblxuICBwcml2YXRlIGdldCBjb21tYW5kKCk6IENvbW1hbmQge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09ICd0ZXh0X2NvbG9yJyA/IFRleHRDb2xvciA6IFRleHRCYWNrZ3JvdW5kQ29sb3I7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGVkaXRvclZpZXc6IEVkaXRvclZpZXc7XG4gIHNob3dQb3B1cCA9IGZhbHNlO1xuICBpc0FjdGl2ZSA9IGZhbHNlO1xuICBhY3RpdmVDb2xvcnM6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgY2FuRXhlY3V0ZSA9IHRydWU7XG5cbiAgZ2V0Q29udHJhc3RZSVEoaGV4Y29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaGV4Y29sb3IgPSBoZXhjb2xvci5yZXBsYWNlKCcjJywgJycpO1xuICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXhjb2xvci5zdWJzdHIoMCwgMiksIDE2KTtcbiAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4Y29sb3Iuc3Vic3RyKDIsIDIpLCAxNik7XG4gICAgY29uc3QgYiA9IHBhcnNlSW50KGhleGNvbG9yLnN1YnN0cig0LCAyKSwgMTYpO1xuICAgIGNvbnN0IHlpcSA9ICgociAqIDI5OSkgKyAoZyAqIDU4NykgKyAoYiAqIDExNCkpIC8gMTAwMDtcbiAgICByZXR1cm4gKHlpcSA+PSAxMjgpID8gJ2JsYWNrJyA6ICd3aGl0ZSc7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZWRvd24nLCBbJyRldmVudCddKSBvbkRvY3VtZW50Q2xpY2soZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSAmJiB0aGlzLnNob3dQb3B1cCkge1xuICAgICAgdGhpcy5oaWRlUG9wdXAoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZGVQb3B1cCgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dQb3B1cCA9IGZhbHNlO1xuICB9XG5cbiAgdG9nZ2xlUG9wdXAoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2hvd1BvcHVwID0gIXRoaXMuc2hvd1BvcHVwO1xuICB9XG5cbiAgcmVtb3ZlKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyBzdGF0ZSwgZGlzcGF0Y2ggfSA9IHRoaXMuZWRpdG9yVmlldztcblxuICAgIHRoaXMuY29tbWFuZC5yZW1vdmUoKShzdGF0ZSwgZGlzcGF0Y2gpO1xuICAgIHRoaXMuaGlkZVBvcHVwKCk7XG4gIH1cblxuICBvbkNvbG9yU2VsZWN0KGU6IE1vdXNlRXZlbnQsIGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoZS5idXR0b24gIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IHN0YXRlLCBkaXNwYXRjaCB9ID0gdGhpcy5lZGl0b3JWaWV3O1xuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3RleHRfY29sb3InKSB7XG4gICAgICBjb25zdCBhdHRycyA9IHsgY29sb3IgfTtcbiAgICAgIHRoaXMuY29tbWFuZC5hcHBseShhdHRycykoc3RhdGUsIGRpc3BhdGNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYXR0cnMgPSB7IGJhY2tncm91bmRDb2xvcjogY29sb3IgfTtcbiAgICAgIHRoaXMuY29tbWFuZC5hcHBseShhdHRycykoc3RhdGUsIGRpc3BhdGNoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZWRpdG9yVmlldy5oYXNGb2N1cygpKSB7XG4gICAgICB0aGlzLmVkaXRvclZpZXcuZm9jdXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLmhpZGVQb3B1cCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUgPSAodmlldzogRWRpdG9yVmlldykgPT4ge1xuICAgIGNvbnN0IHsgc3RhdGUgfSA9IHZpZXc7XG4gICAgdGhpcy5jYW5FeGVjdXRlID0gdGhpcy5jb21tYW5kLmNhbkV4ZWN1dGUoc3RhdGUpO1xuICAgIHRoaXMuaXNBY3RpdmUgPSB0aGlzLmNvbW1hbmQuaXNBY3RpdmUoc3RhdGUpO1xuICAgIHRoaXMuYWN0aXZlQ29sb3JzID0gW107XG5cbiAgICBpZiAodGhpcy5pc0FjdGl2ZSkge1xuICAgICAgdGhpcy5hY3RpdmVDb2xvcnMgPSB0aGlzLmNvbW1hbmQuZ2V0QWN0aXZlQ29sb3JzKHN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBnZXRMYWJlbChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubmd4ZVNlcnZpY2UubG9jYWxzLmdldChrZXkpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5lZGl0b3JWaWV3ID0gdGhpcy5tZW51U2VydmljZS5lZGl0b3IudmlldztcblxuICAgIHRoaXMudXBkYXRlU3Vic2NyaXB0aW9uID0gdGhpcy5tZW51U2VydmljZS5lZGl0b3IudXBkYXRlLnN1YnNjcmliZSgodmlldzogRWRpdG9yVmlldykgPT4ge1xuICAgICAgdGhpcy51cGRhdGUodmlldyk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiTmd4RWRpdG9yX19NZW51SXRlbS0tSWNvbkNvbnRhaW5lclwiIFtpbm5lckhUTUxdPVwiaWNvbiB8IHNhbml0aXplSHRtbFwiIChtb3VzZWRvd24pPVwidG9nZ2xlUG9wdXAoJGV2ZW50KVwiXG4gIFt0aXRsZV09XCJ0aXRsZVwiPlxuPC9kaXY+XG5cbjxkaXYgKm5nSWY9XCJzaG93UG9wdXBcIiBjbGFzcz1cIk5neEVkaXRvcl9fUG9wdXBcIj5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgY29sb3JHcm91cCBvZiBwcmVzZXRzXCIgY2xhc3M9XCJOZ3hFZGl0b3JfX0NvbG9yQ29udGFpbmVyXCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cIk5neEVkaXRvcl9fQ29sb3JcIiAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JHcm91cFwiXG4gICAgICBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZENvbG9yOiBjb2xvciwgY29sb3I6Z2V0Q29udHJhc3RZSVEoY29sb3IpfVwiIFt0aXRsZV09XCJjb2xvclwiXG4gICAgICAobW91c2Vkb3duKT1cIm9uQ29sb3JTZWxlY3QoJGV2ZW50LCBjb2xvcilcIlxuICAgICAgW25nQ2xhc3NdPVwieydOZ3hFZGl0b3JfX0NvbG9yLS1BY3RpdmUnOiBhY3RpdmVDb2xvcnMuaW5jbHVkZXMoY29sb3IpfVwiPjwvYnV0dG9uPlxuICA8L2Rpdj5cblxuICA8YnV0dG9uIGNsYXNzPVwiTmd4RWRpdG9yX19NZW51SXRlbS0tQnV0dG9uXCIgKG1vdXNlZG93bik9XCJyZW1vdmUoJGV2ZW50KVwiIFtkaXNhYmxlZF09XCIhaXNBY3RpdmVcIj5cbiAgICB7e2dldExhYmVsKCdyZW1vdmUnKX19XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG4iXX0=