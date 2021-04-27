import { Component, HostBinding, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Icon from '../../../icons';
import { Link as LinkCommand } from '../MenuCommands';
import * as i0 from "@angular/core";
import * as i1 from "../../../editor.service";
import * as i2 from "../menu.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "../../../pipes/sanitize/sanitize-html.pipe";
function LinkComponent_div_2_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", (ctx_r1.href.errors == null ? null : ctx_r1.href.errors.pattern) && "Please enter valid url.", " ");
} }
function LinkComponent_div_2_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", (ctx_r2.text.errors == null ? null : ctx_r2.text.errors.required) && "This is required", " ");
} }
function LinkComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelementStart(1, "form", 3);
    i0.ɵɵlistener("ngSubmit", function LinkComponent_div_2_Template_form_ngSubmit_1_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.insertLink($event); });
    i0.ɵɵelementStart(2, "div", 4);
    i0.ɵɵelementStart(3, "div", 5);
    i0.ɵɵelementStart(4, "label", 6);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "input", 7);
    i0.ɵɵtemplate(7, LinkComponent_div_2_div_7_Template, 2, 1, "div", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 4);
    i0.ɵɵelementStart(9, "div", 5);
    i0.ɵɵelementStart(10, "label", 6);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 9);
    i0.ɵɵtemplate(13, LinkComponent_div_2_div_13_Template, 2, 1, "div", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 4);
    i0.ɵɵelementStart(15, "div", 5);
    i0.ɵɵelementStart(16, "label");
    i0.ɵɵelement(17, "input", 10);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 11);
    i0.ɵɵtext(20);
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
    i0.ɵɵproperty("ngIf", ctx_r0.href.touched && ctx_r0.href.invalid);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.getLabel("text"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.text.touched && ctx_r0.text.invalid);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getLabel("openInNewTab"), " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r0.form.valid);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.getLabel("insert"));
} }
export class LinkComponent {
    constructor(el, ngxeService, menuService) {
        this.el = el;
        this.ngxeService = ngxeService;
        this.menuService = menuService;
        this.showPopup = false;
        this.isActive = false;
        this.canExecute = true;
        this.form = new FormGroup({
            href: new FormControl('', [
                Validators.required,
                Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
            ]),
            text: new FormControl('', [Validators.required]),
            openInNewTab: new FormControl(true)
        });
        this.setText = () => {
            const { state: { selection, doc } } = this.editorView;
            const { empty, from, to } = selection;
            const selectedText = !empty ? doc.textBetween(from, to) : '';
            if (selectedText) {
                this.text.patchValue(selectedText);
                this.text.disable();
            }
        };
        this.update = (view) => {
            const { state } = view;
            this.isActive = LinkCommand.isActive(state, { strict: false });
            this.canExecute = LinkCommand.canExecute(state);
        };
    }
    get valid() {
        return this.isActive || this.showPopup;
    }
    get disabled() {
        return !this.canExecute;
    }
    get icon() {
        return Icon.get(this.isActive ? 'unlink' : 'link');
    }
    get href() {
        return this.form.get('href');
    }
    get text() {
        return this.form.get('text');
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
            href: '',
            text: '',
            openInNewTab: true
        });
        this.text.enable();
    }
    onMouseDown(e) {
        e.preventDefault();
        if (e.button !== 0) {
            return;
        }
        const { state, dispatch } = this.editorView;
        if (this.isActive) {
            LinkCommand.remove(state, dispatch);
            return;
        }
        this.showPopup = !this.showPopup;
        if (this.showPopup) {
            this.setText();
        }
    }
    insertLink(e) {
        e.preventDefault();
        const { text, href, openInNewTab } = this.form.getRawValue();
        const { dispatch, state } = this.editorView;
        const { selection } = state;
        const attrs = {
            title: href,
            href,
            target: openInNewTab ? '_blank' : '_self'
        };
        if (selection.empty) {
            LinkCommand.insert(text, attrs)(state, dispatch);
            this.editorView.focus();
        }
        else {
            LinkCommand.update(attrs)(state, dispatch);
        }
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
LinkComponent.ɵfac = function LinkComponent_Factory(t) { return new (t || LinkComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.NgxEditorService), i0.ɵɵdirectiveInject(i2.MenuService)); };
LinkComponent.ɵcmp = i0.ɵɵdefineComponent({ type: LinkComponent, selectors: [["ngx-link"]], hostVars: 4, hostBindings: function LinkComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mousedown", function LinkComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, false, i0.ɵɵresolveDocument);
    } if (rf & 2) {
        i0.ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.valid)("NgxEditor--Disabled", ctx.disabled);
    } }, decls: 3, vars: 4, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "mousedown"], ["class", "NgxEditor__Popup", 4, "ngIf"], [1, "NgxEditor__Popup"], [1, "NgxEditor__Popup--Form", 3, "formGroup", "ngSubmit"], [1, "NgxEditor__Popup--FormGroup"], [1, "NgxEditor__Popup--Col"], [1, "NgxEditor__Popup--Label"], ["type", "href", "id", "href", "formControlName", "href", "autofocus", "", "autocomplete", "off"], ["class", "NgxEditor__HelpText NgxEditor__HelpText--Error", 4, "ngIf"], ["type", "text", "formControlName", "text", "autocomplete", "off"], ["type", "checkbox", "formControlName", "openInNewTab"], ["type", "submit", 3, "disabled"], [1, "NgxEditor__HelpText", "NgxEditor__HelpText--Error"]], template: function LinkComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("mousedown", function LinkComponent_Template_div_mousedown_0_listener($event) { return ctx.onMouseDown($event); });
        i0.ɵɵpipe(1, "sanitizeHtml");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(2, LinkComponent_div_2_Template, 21, 8, "div", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 2, ctx.icon), i0.ɵɵsanitizeHtml);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.showPopup);
    } }, directives: [i3.NgIf, i4.ɵangular_packages_forms_forms_ba, i4.NgControlStatusGroup, i4.FormGroupDirective, i4.DefaultValueAccessor, i4.NgControlStatus, i4.FormControlName, i4.CheckboxControlValueAccessor], pipes: [i5.SanitizeHtmlPipe], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-link',
                templateUrl: './link.component.html',
                styleUrls: ['./link.component.scss']
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.NgxEditorService }, { type: i2.MenuService }]; }, { valid: [{
            type: HostBinding,
            args: ['class.NgxEditor__MenuItem--Active']
        }], disabled: [{
            type: HostBinding,
            args: ['class.NgxEditor--Disabled']
        }], onDocumentClick: [{
            type: HostListener,
            args: ['document:mousedown', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvbW9kdWxlcy9tZW51L2xpbmsvbGluay5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvbW9kdWxlcy9tZW51L2xpbmsvbGluay5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFjLFdBQVcsRUFDbEMsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBbUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU1yRixPQUFPLElBQUksTUFBTSxnQkFBZ0IsQ0FBQztBQUNsQyxPQUFPLEVBQUUsSUFBSSxJQUFJLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7OztJQ0E5QywrQkFBaUc7SUFDL0YsWUFDRjtJQUFBLGlCQUFNOzs7SUFESixlQUNGO0lBREUsOEhBQ0Y7OztJQVFBLCtCQUFpRztJQUMvRixZQUNGO0lBQUEsaUJBQU07OztJQURKLGVBQ0Y7SUFERSx3SEFDRjs7OztJQW5CUiw4QkFBZ0Q7SUFDOUMsK0JBQXdGO0lBQWhDLGlNQUErQjtJQUVyRiw4QkFBeUM7SUFDdkMsOEJBQW1DO0lBQ2pDLGdDQUF1QztJQUFBLFlBQW1CO0lBQUEsaUJBQVE7SUFDbEUsMkJBQW1GO0lBQ25GLG9FQUVNO0lBQ1IsaUJBQU07SUFDUixpQkFBTTtJQUVOLDhCQUF5QztJQUN2Qyw4QkFBbUM7SUFDakMsaUNBQXVDO0lBQUEsYUFBb0I7SUFBQSxpQkFBUTtJQUNuRSw0QkFBK0Q7SUFDL0Qsc0VBRU07SUFDUixpQkFBTTtJQUNSLGlCQUFNO0lBRU4sK0JBQXlDO0lBQ3ZDLCtCQUFtQztJQUNqQyw4QkFBTztJQUNMLDZCQUF3RDtJQUN4RCxhQUNGO0lBQUEsaUJBQVE7SUFDVixpQkFBTTtJQUNSLGlCQUFNO0lBRU4sbUNBQStDO0lBQUEsYUFBc0I7SUFBQSxpQkFBUztJQUVoRixpQkFBTztJQUNULGlCQUFNOzs7SUFsQ2lDLGVBQWtCO0lBQWxCLHVDQUFrQjtJQUlWLGVBQW1CO0lBQW5CLDRDQUFtQjtJQUVwRCxlQUFrQztJQUFsQyxpRUFBa0M7SUFRRCxlQUFvQjtJQUFwQiw2Q0FBb0I7SUFFckQsZUFBa0M7SUFBbEMsaUVBQWtDO0lBVXRDLGVBQ0Y7SUFERSxnRUFDRjtJQUlrQixlQUF3QjtJQUF4Qiw2Q0FBd0I7SUFBQyxlQUFzQjtJQUF0QiwrQ0FBc0I7O0FEakJ6RSxNQUFNLE9BQU8sYUFBYTtJQWdCeEIsWUFDVSxFQUFjLEVBQ2QsV0FBNkIsRUFDN0IsV0FBd0I7UUFGeEIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWxCbEMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ1QsZUFBVSxHQUFHLElBQUksQ0FBQztRQUkxQixTQUFJLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDbkIsSUFBSSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsVUFBVSxDQUFDLFFBQVE7Z0JBQ25CLFVBQVUsQ0FBQyxPQUFPLENBQUMsdURBQXVELENBQUM7YUFDNUUsQ0FBQztZQUNGLElBQUksRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsWUFBWSxFQUFFLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQztTQUNwQyxDQUFDLENBQUM7UUFvRUssWUFBTyxHQUFHLEdBQUcsRUFBRTtZQUNyQixNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUN0RCxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxTQUFTLENBQUM7WUFDdEMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFN0QsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3JCO1FBQ0gsQ0FBQyxDQUFBO1FBRU8sV0FBTSxHQUFHLENBQUMsSUFBZ0IsRUFBRSxFQUFFO1lBQ3BDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUE7SUE3RUksQ0FBQztJQUVOLElBQXNELEtBQUs7UUFDekQsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDekMsQ0FBQztJQUVELElBQThDLFFBQVE7UUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFK0MsZUFBZSxDQUFDLENBQWE7UUFDM0UsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMvRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLFFBQVE7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNkLElBQUksRUFBRSxFQUFFO1lBQ1IsSUFBSSxFQUFFLEVBQUU7WUFDUixZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBYTtRQUN2QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQixPQUFPO1NBQ1I7UUFFRCxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFNUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7SUFDSCxDQUFDO0lBbUJELFVBQVUsQ0FBQyxDQUFhO1FBQ3RCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdELE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1QyxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBRTVCLE1BQU0sS0FBSyxHQUFHO1lBQ1osS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJO1lBQ0osTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPO1NBQzFDLENBQUM7UUFFRixJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDbkIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekI7YUFBTTtZQUNMLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFL0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUU7WUFDdEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7OzBFQWxJVSxhQUFhO2tEQUFiLGFBQWE7d0dBQWIsMkJBQXVCOzs7O1FDbkJwQyw4QkFBb0g7UUFBbEMscUdBQWEsdUJBQW1CLElBQUM7O1FBQ25ILGlCQUFNO1FBR04sK0RBbUNNOztRQXZDMEMsNkVBQWlDO1FBSTNFLGVBQWU7UUFBZixvQ0FBZTs7dUZEZVIsYUFBYTtjQU56QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFdBQVcsRUFBRSx1QkFBdUI7Z0JBQ3BDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2FBQ3JDO3NIQXdCdUQsS0FBSztrQkFBMUQsV0FBVzttQkFBQyxtQ0FBbUM7WUFJRixRQUFRO2tCQUFyRCxXQUFXO21CQUFDLDJCQUEyQjtZQWdCUSxlQUFlO2tCQUE5RCxZQUFZO21CQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEVkaXRvclZpZXcgfSBmcm9tICdwcm9zZW1pcnJvci12aWV3JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOZ3hFZGl0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZWRpdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVudVNlcnZpY2UgfSBmcm9tICcuLi9tZW51LnNlcnZpY2UnO1xuaW1wb3J0IEljb24gZnJvbSAnLi4vLi4vLi4vaWNvbnMnO1xuaW1wb3J0IHsgTGluayBhcyBMaW5rQ29tbWFuZCB9IGZyb20gJy4uL01lbnVDb21tYW5kcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1saW5rJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xpbmsuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saW5rLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBMaW5rQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBzaG93UG9wdXAgPSBmYWxzZTtcbiAgaXNBY3RpdmUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjYW5FeGVjdXRlID0gdHJ1ZTtcbiAgcHJpdmF0ZSBlZGl0b3JWaWV3OiBFZGl0b3JWaWV3O1xuICBwcml2YXRlIHVwZGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICBocmVmOiBuZXcgRm9ybUNvbnRyb2woJycsIFtcbiAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oJyhodHRwcz86Ly8pPyhbXFxcXGRhLXouLV0rKVxcXFwuKFthLXouXXsyLDZ9KVsvXFxcXHcgLi1dKi8/JylcbiAgICBdKSxcbiAgICB0ZXh0OiBuZXcgRm9ybUNvbnRyb2woJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXG4gICAgb3BlbkluTmV3VGFiOiBuZXcgRm9ybUNvbnRyb2wodHJ1ZSlcbiAgfSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIG5neGVTZXJ2aWNlOiBOZ3hFZGl0b3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgbWVudVNlcnZpY2U6IE1lbnVTZXJ2aWNlXG4gICkgeyAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuTmd4RWRpdG9yX19NZW51SXRlbS0tQWN0aXZlJykgZ2V0IHZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzQWN0aXZlIHx8IHRoaXMuc2hvd1BvcHVwO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5OZ3hFZGl0b3ItLURpc2FibGVkJykgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5jYW5FeGVjdXRlO1xuICB9XG5cbiAgZ2V0IGljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gSWNvbi5nZXQodGhpcy5pc0FjdGl2ZSA/ICd1bmxpbmsnIDogJ2xpbmsnKTtcbiAgfVxuXG4gIGdldCBocmVmKCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5nZXQoJ2hyZWYnKTtcbiAgfVxuXG4gIGdldCB0ZXh0KCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5nZXQoJ3RleHQnKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNlZG93bicsIFsnJGV2ZW50J10pIG9uRG9jdW1lbnRDbGljayhlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZS50YXJnZXQpICYmIHRoaXMuc2hvd1BvcHVwKSB7XG4gICAgICB0aGlzLmhpZGVGb3JtKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGFiZWwoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5neGVTZXJ2aWNlLmxvY2Fscy5nZXQoa2V5KTtcbiAgfVxuXG4gIHByaXZhdGUgaGlkZUZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5zaG93UG9wdXAgPSBmYWxzZTtcbiAgICB0aGlzLmZvcm0ucmVzZXQoe1xuICAgICAgaHJlZjogJycsXG4gICAgICB0ZXh0OiAnJyxcbiAgICAgIG9wZW5Jbk5ld1RhYjogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMudGV4dC5lbmFibGUoKTtcbiAgfVxuXG4gIG9uTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoZS5idXR0b24gIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IHN0YXRlLCBkaXNwYXRjaCB9ID0gdGhpcy5lZGl0b3JWaWV3O1xuXG4gICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIExpbmtDb21tYW5kLnJlbW92ZShzdGF0ZSwgZGlzcGF0Y2gpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2hvd1BvcHVwID0gIXRoaXMuc2hvd1BvcHVwO1xuICAgIGlmICh0aGlzLnNob3dQb3B1cCkge1xuICAgICAgdGhpcy5zZXRUZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRUZXh0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc3RhdGU6IHsgc2VsZWN0aW9uLCBkb2MgfSB9ID0gdGhpcy5lZGl0b3JWaWV3O1xuICAgIGNvbnN0IHsgZW1wdHksIGZyb20sIHRvIH0gPSBzZWxlY3Rpb247XG4gICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gIWVtcHR5ID8gZG9jLnRleHRCZXR3ZWVuKGZyb20sIHRvKSA6ICcnO1xuXG4gICAgaWYgKHNlbGVjdGVkVGV4dCkge1xuICAgICAgdGhpcy50ZXh0LnBhdGNoVmFsdWUoc2VsZWN0ZWRUZXh0KTtcbiAgICAgIHRoaXMudGV4dC5kaXNhYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUgPSAodmlldzogRWRpdG9yVmlldykgPT4ge1xuICAgIGNvbnN0IHsgc3RhdGUgfSA9IHZpZXc7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IExpbmtDb21tYW5kLmlzQWN0aXZlKHN0YXRlLCB7IHN0cmljdDogZmFsc2UgfSk7XG4gICAgdGhpcy5jYW5FeGVjdXRlID0gTGlua0NvbW1hbmQuY2FuRXhlY3V0ZShzdGF0ZSk7XG4gIH1cblxuICBpbnNlcnRMaW5rKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyB0ZXh0LCBocmVmLCBvcGVuSW5OZXdUYWIgfSA9IHRoaXMuZm9ybS5nZXRSYXdWYWx1ZSgpO1xuICAgIGNvbnN0IHsgZGlzcGF0Y2gsIHN0YXRlIH0gPSB0aGlzLmVkaXRvclZpZXc7XG4gICAgY29uc3QgeyBzZWxlY3Rpb24gfSA9IHN0YXRlO1xuXG4gICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICB0aXRsZTogaHJlZixcbiAgICAgIGhyZWYsXG4gICAgICB0YXJnZXQ6IG9wZW5Jbk5ld1RhYiA/ICdfYmxhbmsnIDogJ19zZWxmJ1xuICAgIH07XG5cbiAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KSB7XG4gICAgICBMaW5rQ29tbWFuZC5pbnNlcnQodGV4dCwgYXR0cnMpKHN0YXRlLCBkaXNwYXRjaCk7XG4gICAgICB0aGlzLmVkaXRvclZpZXcuZm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgTGlua0NvbW1hbmQudXBkYXRlKGF0dHJzKShzdGF0ZSwgZGlzcGF0Y2gpO1xuICAgIH1cbiAgICB0aGlzLmhpZGVGb3JtKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmVkaXRvclZpZXcgPSB0aGlzLm1lbnVTZXJ2aWNlLmVkaXRvci52aWV3O1xuXG4gICAgdGhpcy51cGRhdGVTdWJzY3JpcHRpb24gPSB0aGlzLm1lbnVTZXJ2aWNlLmVkaXRvci51cGRhdGUuc3Vic2NyaWJlKCh2aWV3OiBFZGl0b3JWaWV3KSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZSh2aWV3KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJOZ3hFZGl0b3JfX01lbnVJdGVtLS1JY29uQ29udGFpbmVyXCIgW2lubmVySFRNTF09XCJpY29uIHwgc2FuaXRpemVIdG1sXCIgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQpXCI+XG48L2Rpdj5cblxuPCEtLSBwb3B1cCAtLT5cbjxkaXYgKm5nSWY9XCJzaG93UG9wdXBcIiBjbGFzcz1cIk5neEVkaXRvcl9fUG9wdXBcIj5cbiAgPGZvcm0gY2xhc3M9XCJOZ3hFZGl0b3JfX1BvcHVwLS1Gb3JtXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCIgKG5nU3VibWl0KT1cImluc2VydExpbmsoJGV2ZW50KVwiPlxuXG4gICAgPGRpdiBjbGFzcz1cIk5neEVkaXRvcl9fUG9wdXAtLUZvcm1Hcm91cFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIk5neEVkaXRvcl9fUG9wdXAtLUNvbFwiPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJOZ3hFZGl0b3JfX1BvcHVwLS1MYWJlbFwiPnt7Z2V0TGFiZWwoJ3VybCcpfX08L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImhyZWZcIiBpZD1cImhyZWZcIiBmb3JtQ29udHJvbE5hbWU9XCJocmVmXCIgYXV0b2ZvY3VzIGF1dG9jb21wbGV0ZT1cIm9mZlwiIC8+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJocmVmLnRvdWNoZWQgJiYgaHJlZi5pbnZhbGlkXCIgY2xhc3M9XCJOZ3hFZGl0b3JfX0hlbHBUZXh0IE5neEVkaXRvcl9fSGVscFRleHQtLUVycm9yXCI+XG4gICAgICAgICAge3sgaHJlZi5lcnJvcnM/LnBhdHRlcm4gJiYgJ1BsZWFzZSBlbnRlciB2YWxpZCB1cmwuJyB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIk5neEVkaXRvcl9fUG9wdXAtLUZvcm1Hcm91cFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIk5neEVkaXRvcl9fUG9wdXAtLUNvbFwiPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJOZ3hFZGl0b3JfX1BvcHVwLS1MYWJlbFwiPnt7Z2V0TGFiZWwoJ3RleHQnKX19PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZm9ybUNvbnRyb2xOYW1lPVwidGV4dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIC8+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0ZXh0LnRvdWNoZWQgJiYgdGV4dC5pbnZhbGlkXCIgY2xhc3M9XCJOZ3hFZGl0b3JfX0hlbHBUZXh0IE5neEVkaXRvcl9fSGVscFRleHQtLUVycm9yXCI+XG4gICAgICAgICAge3sgdGV4dC5lcnJvcnM/LnJlcXVpcmVkICYmICdUaGlzIGlzIHJlcXVpcmVkJyB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIk5neEVkaXRvcl9fUG9wdXAtLUZvcm1Hcm91cFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIk5neEVkaXRvcl9fUG9wdXAtLUNvbFwiPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGZvcm1Db250cm9sTmFtZT1cIm9wZW5Jbk5ld1RhYlwiIC8+XG4gICAgICAgICAge3tnZXRMYWJlbCgnb3BlbkluTmV3VGFiJyl9fVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiIWZvcm0udmFsaWRcIj57e2dldExhYmVsKCdpbnNlcnQnKX19PC9idXR0b24+XG5cbiAgPC9mb3JtPlxuPC9kaXY+XG4iXX0=