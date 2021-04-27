import { Component, HostBinding, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NodeSelection } from 'prosemirror-state';
import Icon from '../../../icons';
import { Image as ImageCommand } from '../MenuCommands';
import * as i0 from "@angular/core";
import * as i1 from "../../../editor.service";
import * as i2 from "../menu.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "../../../pipes/sanitize/sanitize-html.pipe";
function ImageComponent_div_2_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", (ctx_r1.src.errors == null ? null : ctx_r1.src.errors.pattern) && "Please enter valid url.", " ");
} }
function ImageComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelementStart(1, "form", 3);
    i0.ɵɵlistener("ngSubmit", function ImageComponent_div_2_Template_form_ngSubmit_1_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.insertLink($event); });
    i0.ɵɵelementStart(2, "div", 4);
    i0.ɵɵelementStart(3, "div", 5);
    i0.ɵɵelementStart(4, "label", 6);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "input", 7);
    i0.ɵɵtemplate(7, ImageComponent_div_2_div_7_Template, 2, 1, "div", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 4);
    i0.ɵɵelementStart(9, "div", 5);
    i0.ɵɵelementStart(10, "label", 6);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 4);
    i0.ɵɵelementStart(14, "div", 5);
    i0.ɵɵelementStart(15, "label", 6);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "input", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 11);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.getLabel("url"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.src.touched && ctx_r0.src.invalid);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.getLabel("altText"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.getLabel("title"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r0.form.valid || !ctx_r0.form.dirty);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.getLabel("insert"));
} }
export class ImageComponent {
    constructor(el, ngxeService, menuService) {
        this.el = el;
        this.ngxeService = ngxeService;
        this.menuService = menuService;
        this.showPopup = false;
        this.isActive = false;
        this.form = new FormGroup({
            src: new FormControl('', [
                Validators.required,
                Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
            ]),
            alt: new FormControl(''),
            title: new FormControl('')
        });
        this.update = (view) => {
            const { state } = view;
            this.isActive = ImageCommand.isActive(state);
        };
    }
    get valid() {
        return this.isActive || this.showPopup;
    }
    get icon() {
        return Icon.get('image');
    }
    get src() {
        return this.form.get('src');
    }
    onDocumentClick(e) {
        if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
            this.hideForm();
        }
    }
    getLabel(key) {
        return this.ngxeService.locals.get(key);
    }
    hideForm() {
        this.showPopup = false;
        this.form.reset({
            src: '',
            alt: '',
            title: ''
        });
    }
    onMouseDown(e) {
        e.preventDefault();
        if (e.button !== 0) {
            return;
        }
        this.showPopup = !this.showPopup;
        if (this.showPopup) {
            this.fillForm();
        }
    }
    fillForm() {
        const { state } = this.editorView;
        const { selection } = state;
        if (selection instanceof NodeSelection && this.isActive) {
            const { src, alt = '', title = '' } = selection.node.attrs;
            this.form.setValue({
                src,
                alt,
                title
            });
        }
    }
    insertLink(e) {
        e.preventDefault();
        const { src, alt, title } = this.form.getRawValue();
        const { dispatch, state } = this.editorView;
        const attrs = {
            alt,
            title
        };
        ImageCommand.insert(src, attrs)(state, dispatch);
        this.editorView.focus();
        this.hideForm();
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
ImageComponent.ɵfac = function ImageComponent_Factory(t) { return new (t || ImageComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.NgxEditorService), i0.ɵɵdirectiveInject(i2.MenuService)); };
ImageComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ImageComponent, selectors: [["ngx-image"]], hostVars: 2, hostBindings: function ImageComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mousedown", function ImageComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, i0.ɵɵresolveDocument);
    } if (rf & 2) {
        i0.ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.valid);
    } }, decls: 3, vars: 4, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "mousedown"], ["class", "NgxEditor__Popup", 4, "ngIf"], [1, "NgxEditor__Popup"], [1, "NgxEditor__Popup--Form", 3, "formGroup", "ngSubmit"], [1, "NgxEditor__Popup--FormGroup"], [1, "NgxEditor__Popup--Col"], [1, "NgxEditor__Popup--Label"], ["type", "href", "id", "href", "formControlName", "src", "autofocus", "", "autocomplete", "off"], ["class", "NgxEditor__HelpText NgxEditor__HelpText--Error", 4, "ngIf"], ["type", "text", "formControlName", "alt", "autocomplete", "off"], ["type", "text", "formControlName", "title", "autocomplete", "off"], ["type", "submit", 3, "disabled"], [1, "NgxEditor__HelpText", "NgxEditor__HelpText--Error"]], template: function ImageComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("mousedown", function ImageComponent_Template_div_mousedown_0_listener($event) { return ctx.onMouseDown($event); });
        i0.ɵɵpipe(1, "sanitizeHtml");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(2, ImageComponent_div_2_Template, 20, 7, "div", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 2, ctx.icon), i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.showPopup);
    } }, directives: [i3.NgIf, i4.ɵangular_packages_forms_forms_ba, i4.NgControlStatusGroup, i4.FormGroupDirective, i4.DefaultValueAccessor, i4.NgControlStatus, i4.FormControlName], pipes: [i5.SanitizeHtmlPipe], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ImageComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-image',
                templateUrl: './image.component.html',
                styleUrls: ['./image.component.scss']
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.NgxEditorService }, { type: i2.MenuService }]; }, { valid: [{
            type: HostBinding,
            args: ['class.NgxEditor__MenuItem--Active']
        }], onDocumentClick: [{
            type: HostListener,
            args: ['document:mousedown', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWVkaXRvci9zcmMvbGliL21vZHVsZXMvbWVudS9pbWFnZS9pbWFnZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvbW9kdWxlcy9tZW51L2ltYWdlL2ltYWdlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQWMsV0FBVyxFQUNsQyxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU1sRCxPQUFPLElBQUksTUFBTSxnQkFBZ0IsQ0FBQztBQUNsQyxPQUFPLEVBQUUsS0FBSyxJQUFJLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7OztJQ0RoRCwrQkFBK0Y7SUFDN0YsWUFDRjtJQUFBLGlCQUFNOzs7SUFESixlQUNGO0lBREUsNEhBQ0Y7Ozs7SUFUUiw4QkFBZ0Q7SUFDOUMsK0JBQXdGO0lBQWhDLGtNQUErQjtJQUVyRiw4QkFBeUM7SUFDdkMsOEJBQW1DO0lBQ2pDLGdDQUF1QztJQUFBLFlBQW1CO0lBQUEsaUJBQVE7SUFDbEUsMkJBQWtGO0lBQ2xGLHFFQUVNO0lBQ1IsaUJBQU07SUFDUixpQkFBTTtJQUVOLDhCQUF5QztJQUN2Qyw4QkFBbUM7SUFDakMsaUNBQXVDO0lBQUEsYUFBdUI7SUFBQSxpQkFBUTtJQUN0RSw0QkFBOEQ7SUFDaEUsaUJBQU07SUFDUixpQkFBTTtJQUVOLCtCQUF5QztJQUN2QywrQkFBbUM7SUFDakMsaUNBQXVDO0lBQUEsYUFBcUI7SUFBQSxpQkFBUTtJQUNwRSw2QkFBZ0U7SUFDbEUsaUJB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LENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs0RUFqSFUsY0FBYzttREFBZCxjQUFjO3lHQUFkLDJCQUF1Qjs7OztRQ25CcEMsOEJBQW9IO1FBQWxDLHNHQUFhLHVCQUFtQixJQUFDOztRQUNuSCxpQkFBTTtRQUdOLGdFQThCTTs7UUFsQzBDLDZFQUFpQztRQUkzRSxlQUFlO1FBQWYsb0NBQWU7O3VGRGVSLGNBQWM7Y0FMMUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQzthQUN0QztzSEF5QnVELEtBQUs7a0JBQTFELFdBQVc7bUJBQUMsbUNBQW1DO1lBWUEsZUFBZTtrQkFBOUQsWUFBWTttQkFBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb2RlU2VsZWN0aW9uIH0gZnJvbSAncHJvc2VtaXJyb3Itc3RhdGUnO1xuaW1wb3J0IHsgRWRpdG9yVmlldyB9IGZyb20gJ3Byb3NlbWlycm9yLXZpZXcnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE5neEVkaXRvclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9lZGl0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBNZW51U2VydmljZSB9IGZyb20gJy4uL21lbnUuc2VydmljZSc7XG5pbXBvcnQgSWNvbiBmcm9tICcuLi8uLi8uLi9pY29ucyc7XG5pbXBvcnQgeyBJbWFnZSBhcyBJbWFnZUNvbW1hbmQgfSBmcm9tICcuLi9NZW51Q29tbWFuZHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtaW1hZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vaW1hZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pbWFnZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBzaG93UG9wdXAgPSBmYWxzZTtcbiAgaXNBY3RpdmUgPSBmYWxzZTtcbiAgcHJpdmF0ZSB1cGRhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBmb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgc3JjOiBuZXcgRm9ybUNvbnRyb2woJycsIFtcbiAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oJyhodHRwcz86Ly8pPyhbXFxcXGRhLXouLV0rKVxcXFwuKFthLXouXXsyLDZ9KVsvXFxcXHcgLi1dKi8/JylcbiAgICBdKSxcbiAgICBhbHQ6IG5ldyBGb3JtQ29udHJvbCgnJyksXG4gICAgdGl0bGU6IG5ldyBGb3JtQ29udHJvbCgnJylcbiAgfSk7XG5cbiAgcHJpdmF0ZSBlZGl0b3JWaWV3OiBFZGl0b3JWaWV3O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBuZ3hlU2VydmljZTogTmd4RWRpdG9yU2VydmljZSxcbiAgICBwcml2YXRlIG1lbnVTZXJ2aWNlOiBNZW51U2VydmljZVxuICApIHtcblxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5OZ3hFZGl0b3JfX01lbnVJdGVtLS1BY3RpdmUnKSBnZXQgdmFsaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBY3RpdmUgfHwgdGhpcy5zaG93UG9wdXA7XG4gIH1cblxuICBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiBJY29uLmdldCgnaW1hZ2UnKTtcbiAgfVxuXG4gIGdldCBzcmMoKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmdldCgnc3JjJyk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZWRvd24nLCBbJyRldmVudCddKSBvbkRvY3VtZW50Q2xpY2soZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSAmJiB0aGlzLnNob3dQb3B1cCkge1xuICAgICAgdGhpcy5oaWRlRm9ybSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldExhYmVsKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5uZ3hlU2VydmljZS5sb2NhbHMuZ2V0KGtleSk7XG4gIH1cblxuICBwcml2YXRlIGhpZGVGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd1BvcHVwID0gZmFsc2U7XG4gICAgdGhpcy5mb3JtLnJlc2V0KHtcbiAgICAgIHNyYzogJycsXG4gICAgICBhbHQ6ICcnLFxuICAgICAgdGl0bGU6ICcnXG4gICAgfSk7XG4gIH1cblxuICBvbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKGUuYnV0dG9uICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zaG93UG9wdXAgPSAhdGhpcy5zaG93UG9wdXA7XG5cbiAgICBpZiAodGhpcy5zaG93UG9wdXApIHtcbiAgICAgIHRoaXMuZmlsbEZvcm0oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbGxGb3JtKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgc3RhdGUgfSA9IHRoaXMuZWRpdG9yVmlldztcbiAgICBjb25zdCB7IHNlbGVjdGlvbiB9ID0gc3RhdGU7XG4gICAgaWYgKHNlbGVjdGlvbiBpbnN0YW5jZW9mIE5vZGVTZWxlY3Rpb24gJiYgdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgY29uc3QgeyBzcmMsIGFsdCA9ICcnLCB0aXRsZSA9ICcnIH0gPSBzZWxlY3Rpb24ubm9kZS5hdHRycztcblxuICAgICAgdGhpcy5mb3JtLnNldFZhbHVlKHtcbiAgICAgICAgc3JjLFxuICAgICAgICBhbHQsXG4gICAgICAgIHRpdGxlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZSA9ICh2aWV3OiBFZGl0b3JWaWV3KSA9PiB7XG4gICAgY29uc3QgeyBzdGF0ZSB9ID0gdmlldztcbiAgICB0aGlzLmlzQWN0aXZlID0gSW1hZ2VDb21tYW5kLmlzQWN0aXZlKHN0YXRlKTtcbiAgfVxuXG4gIGluc2VydExpbmsoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB7IHNyYywgYWx0LCB0aXRsZSB9ID0gdGhpcy5mb3JtLmdldFJhd1ZhbHVlKCk7XG4gICAgY29uc3QgeyBkaXNwYXRjaCwgc3RhdGUgfSA9IHRoaXMuZWRpdG9yVmlldztcblxuICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgYWx0LFxuICAgICAgdGl0bGVcbiAgICB9O1xuXG4gICAgSW1hZ2VDb21tYW5kLmluc2VydChzcmMsIGF0dHJzKShzdGF0ZSwgZGlzcGF0Y2gpO1xuICAgIHRoaXMuZWRpdG9yVmlldy5mb2N1cygpO1xuICAgIHRoaXMuaGlkZUZvcm0oKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZWRpdG9yVmlldyA9IHRoaXMubWVudVNlcnZpY2UuZWRpdG9yLnZpZXc7XG5cbiAgICB0aGlzLnVwZGF0ZVN1YnNjcmlwdGlvbiA9IHRoaXMubWVudVNlcnZpY2UuZWRpdG9yLnVwZGF0ZS5zdWJzY3JpYmUoKHZpZXc6IEVkaXRvclZpZXcpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlKHZpZXcpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIk5neEVkaXRvcl9fTWVudUl0ZW0tLUljb25Db250YWluZXJcIiBbaW5uZXJIVE1MXT1cImljb24gfCBzYW5pdGl6ZUh0bWxcIiAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudClcIj5cbjwvZGl2PlxuXG48IS0tIHBvcHVwIC0tPlxuPGRpdiAqbmdJZj1cInNob3dQb3B1cFwiIGNsYXNzPVwiTmd4RWRpdG9yX19Qb3B1cFwiPlxuICA8Zm9ybSBjbGFzcz1cIk5neEVkaXRvcl9fUG9wdXAtLUZvcm1cIiBbZm9ybUdyb3VwXT1cImZvcm1cIiAobmdTdWJtaXQpPVwiaW5zZXJ0TGluaygkZXZlbnQpXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiTmd4RWRpdG9yX19Qb3B1cC0tRm9ybUdyb3VwXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiTmd4RWRpdG9yX19Qb3B1cC0tQ29sXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cIk5neEVkaXRvcl9fUG9wdXAtLUxhYmVsXCI+e3tnZXRMYWJlbCgndXJsJyl9fTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiaHJlZlwiIGlkPVwiaHJlZlwiIGZvcm1Db250cm9sTmFtZT1cInNyY1wiIGF1dG9mb2N1cyBhdXRvY29tcGxldGU9XCJvZmZcIiAvPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic3JjLnRvdWNoZWQgJiYgc3JjLmludmFsaWRcIiBjbGFzcz1cIk5neEVkaXRvcl9fSGVscFRleHQgTmd4RWRpdG9yX19IZWxwVGV4dC0tRXJyb3JcIj5cbiAgICAgICAgICB7eyBzcmMuZXJyb3JzPy5wYXR0ZXJuICYmICdQbGVhc2UgZW50ZXIgdmFsaWQgdXJsLicgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJOZ3hFZGl0b3JfX1BvcHVwLS1Gb3JtR3JvdXBcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJOZ3hFZGl0b3JfX1BvcHVwLS1Db2xcIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiTmd4RWRpdG9yX19Qb3B1cC0tTGFiZWxcIj57e2dldExhYmVsKCdhbHRUZXh0Jyl9fTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cImFsdFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJOZ3hFZGl0b3JfX1BvcHVwLS1Gb3JtR3JvdXBcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJOZ3hFZGl0b3JfX1BvcHVwLS1Db2xcIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiTmd4RWRpdG9yX19Qb3B1cC0tTGFiZWxcIj57e2dldExhYmVsKCd0aXRsZScpfX08L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBmb3JtQ29udHJvbE5hbWU9XCJ0aXRsZVwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIFtkaXNhYmxlZF09XCIhZm9ybS52YWxpZCB8fCAhZm9ybS5kaXJ0eVwiPnt7Z2V0TGFiZWwoJ2luc2VydCcpfX08L2J1dHRvbj5cblxuICA8L2Zvcm0+XG48L2Rpdj5cbiJdfQ==