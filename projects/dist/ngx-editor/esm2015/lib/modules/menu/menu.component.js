import { Component, Input } from '@angular/core';
import { MenuService } from './menu.service';
import * as i0 from "@angular/core";
import * as i1 from "./menu.service";
import * as i2 from "@angular/common";
import * as i3 from "./toggle-command/toggle-command.component";
import * as i4 from "./link/link.component";
import * as i5 from "./image/image.component";
import * as i6 from "./dropdown/dropdown.component";
import * as i7 from "./color-picker/color-picker.component";
function MenuComponent_ng_container_1_ng_container_1_ngx_toggle_command_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ngx-toggle-command", 7);
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r7.iconContainerClass);
    i0.ɵɵproperty("toolbarItem", item_r5);
} }
function MenuComponent_ng_container_1_ng_container_1_ngx_link_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ngx-link");
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMap(ctx_r8.iconContainerClass);
} }
function MenuComponent_ng_container_1_ng_container_1_ngx_image_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ngx-image");
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMap(ctx_r9.iconContainerClass);
} }
function MenuComponent_ng_container_1_ng_container_1_ng_container_4_ngx_dropdown_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ngx-dropdown", 9);
} if (rf & 2) {
    const dropdownItem_r16 = ctx.$implicit;
    const ctx_r15 = i0.ɵɵnextContext(4);
    i0.ɵɵclassMap(ctx_r15.dropdownContainerClass);
    i0.ɵɵproperty("group", dropdownItem_r16.key)("items", dropdownItem_r16.value);
} }
function MenuComponent_ng_container_1_ng_container_1_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MenuComponent_ng_container_1_ng_container_1_ng_container_4_ngx_dropdown_1_Template, 1, 4, "ngx-dropdown", 8);
    i0.ɵɵpipe(2, "keyvalue");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 1, ctx_r10.getDropdownItems(item_r5)));
} }
function MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ngx-color-picker", 10);
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMap(ctx_r11.iconContainerClass);
    i0.ɵɵproperty("presets", ctx_r11.presets);
} }
function MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ngx-color-picker", 11);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMap(ctx_r12.iconContainerClass);
    i0.ɵɵproperty("presets", ctx_r12.presets);
} }
function MenuComponent_ng_container_1_ng_container_1_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div");
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(3);
    i0.ɵɵclassMap(ctx_r13.seperatorClass);
} }
function MenuComponent_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MenuComponent_ng_container_1_ng_container_1_ngx_toggle_command_1_Template, 1, 3, "ngx-toggle-command", 3);
    i0.ɵɵtemplate(2, MenuComponent_ng_container_1_ng_container_1_ngx_link_2_Template, 1, 2, "ngx-link", 4);
    i0.ɵɵtemplate(3, MenuComponent_ng_container_1_ng_container_1_ngx_image_3_Template, 1, 2, "ngx-image", 4);
    i0.ɵɵtemplate(4, MenuComponent_ng_container_1_ng_container_1_ng_container_4_Template, 3, 3, "ng-container", 2);
    i0.ɵɵtemplate(5, MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_5_Template, 1, 3, "ngx-color-picker", 5);
    i0.ɵɵtemplate(6, MenuComponent_ng_container_1_ng_container_1_ngx_color_picker_6_Template, 1, 3, "ngx-color-picker", 6);
    i0.ɵɵtemplate(7, MenuComponent_ng_container_1_ng_container_1_div_7_Template, 1, 2, "div", 4);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const lastItem_r6 = ctx.last;
    const lastToolbarItem_r3 = i0.ɵɵnextContext().last;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.toggleCommands.includes(item_r5));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r5 === "link");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r5 === "image");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.isDropDown(item_r5));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r5 === "text_color");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", item_r5 === "background_color");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", lastItem_r6 && !lastToolbarItem_r3);
} }
function MenuComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MenuComponent_ng_container_1_ng_container_1_Template, 8, 7, "ng-container", 1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const toolbarItem_r2 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", toolbarItem_r2);
} }
function MenuComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementContainer(1, 12);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r1.customMenuRef);
} }
const _c0 = function (a0) { return { "NgxEditor--Disabled": a0 }; };
const DEFAULT_TOOLBAR = [
    ['bold', 'italic'],
    ['code', 'blockquote'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
];
const DEFAULT_COLOR_PRESETS = [
    '#b60205',
    '#d93f0b',
    '#fbca04',
    '#0e8a16',
    '#006b75',
    '#1d76db',
    '#0052cc',
    '#5319e7',
    '#e99695',
    '#f9d0c4',
    '#fef2c0',
    '#c2e0c6',
    '#bfdadc',
    '#c5def5',
    '#bfd4f2',
    '#d4c5f9'
];
export class MenuComponent {
    constructor(menuService) {
        this.menuService = menuService;
        this.toolbar = DEFAULT_TOOLBAR;
        this.colorPresets = DEFAULT_COLOR_PRESETS;
        this.disabled = false;
        this.customMenuRef = null;
        this.toggleCommands = [
            'bold', 'italic',
            'underline', 'strike',
            'code', 'blockquote',
            'ordered_list', 'bullet_list',
            'align_left', 'align_center', 'align_right', 'align_justify'
        ];
        this.iconContainerClass = ['NgxEditor__MenuItem', 'NgxEditor__MenuItem--Icon'];
        this.dropdownContainerClass = ['NgxEditor__Dropdown'];
        this.seperatorClass = ['NgxEditor__Seperator'];
    }
    get presets() {
        const col = 8;
        const colors = [];
        this.colorPresets.forEach((color, index) => {
            const row = Math.floor(index / col);
            if (!colors[row]) {
                colors.push([]);
            }
            colors[row].push(color);
        });
        return colors;
    }
    isDropDown(item) {
        var _a;
        if ((_a = item) === null || _a === void 0 ? void 0 : _a.heading) {
            return true;
        }
        return false;
    }
    getDropdownItems(item) {
        return item;
    }
    ngOnInit() {
        if (!this.editor) {
            throw new Error('NgxEditor: Required editor instance');
        }
        this.menuService.editor = this.editor;
    }
}
MenuComponent.ɵfac = function MenuComponent_Factory(t) { return new (t || MenuComponent)(i0.ɵɵdirectiveInject(i1.MenuService)); };
MenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MenuComponent, selectors: [["ngx-editor-menu"]], inputs: { toolbar: "toolbar", colorPresets: "colorPresets", disabled: "disabled", editor: "editor", customMenuRef: "customMenuRef" }, features: [i0.ɵɵProvidersFeature([MenuService])], decls: 3, vars: 5, consts: [[1, "NgxEditor__MenuBar", 3, "ngClass"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "toolbarItem", "class", 4, "ngIf"], [3, "class", 4, "ngIf"], ["type", "text_color", 3, "class", "presets", 4, "ngIf"], ["type", "background_color", 3, "class", "presets", 4, "ngIf"], [3, "toolbarItem"], [3, "class", "group", "items", 4, "ngFor", "ngForOf"], [3, "group", "items"], ["type", "text_color", 3, "presets"], ["type", "background_color", 3, "presets"], [3, "ngTemplateOutlet"]], template: function MenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, MenuComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
        i0.ɵɵtemplate(2, MenuComponent_ng_container_2_Template, 2, 1, "ng-container", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c0, ctx.disabled));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.toolbar);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.customMenuRef);
    } }, directives: [i2.NgClass, i2.NgForOf, i2.NgIf, i3.ToggleCommandComponent, i4.LinkComponent, i5.ImageComponent, i6.DropdownComponent, i7.ColorPickerComponent, i2.NgTemplateOutlet], pipes: [i2.KeyValuePipe], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MenuComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-editor-menu',
                templateUrl: './menu.component.html',
                styleUrls: ['./menu.component.scss'],
                providers: [MenuService]
            }]
    }], function () { return [{ type: i1.MenuService }]; }, { toolbar: [{
            type: Input
        }], colorPresets: [{
            type: Input
        }], disabled: [{
            type: Input
        }], editor: [{
            type: Input
        }], customMenuRef: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvbW9kdWxlcy9tZW51L21lbnUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWVkaXRvci9zcmMvbGliL21vZHVsZXMvbWVudS9tZW51LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBSyxFQUVqQixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7SUNEdkMsd0NBQ3FCOzs7O0lBRG9CLHdDQUE0QjtJQUFqRCxxQ0FBb0I7OztJQUl4QywyQkFBMEU7OztJQUFoRSx3Q0FBNEI7OztJQUd0Qyw0QkFDWTs7O0lBREQsd0NBQTRCOzs7SUFLckMsa0NBRWU7Ozs7SUFGOEQsNkNBQWdDO0lBQzNHLDRDQUEwQixpQ0FBQTs7O0lBRjlCLDZCQUF1QztJQUNyQyw2SEFFZTs7SUFDakIsMEJBQWU7Ozs7SUFIMEIsZUFBb0M7SUFBcEMsaUZBQW9DOzs7SUFNN0UsdUNBRW1COzs7SUFGRCx5Q0FBNEI7SUFDNUMseUNBQW1COzs7SUFHckIsdUNBRW1COzs7SUFGRCx5Q0FBNEI7SUFDNUMseUNBQW1COzs7SUFJckIsc0JBQXlFOzs7SUFBcEUscUNBQXdCOzs7SUE5Qi9CLDZCQUFvRTtJQUdsRSwwSEFDcUI7SUFHckIsc0dBQTBFO0lBRzFFLHdHQUNZO0lBR1osOEdBSWU7SUFHZixzSEFFbUI7SUFFbkIsc0hBRW1CO0lBR25CLDRGQUF5RTtJQUMzRSwwQkFBZTs7Ozs7O0lBNUIwRCxlQUFtQztJQUFuQyw4REFBbUM7SUFJbEUsZUFBcUI7SUFBckIseUNBQXFCO0lBR3BCLGVBQXNCO0lBQXRCLDBDQUFzQjtJQUloRCxlQUFzQjtJQUF0QixpREFBc0I7SUFPVyxlQUEyQjtJ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LENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN4QyxDQUFDOzswRUF4RFUsYUFBYTtrREFBYixhQUFhLDJNQUhiLENBQUMsV0FBVyxDQUFDO1FDNUMxQiw4QkFBOEU7UUFFNUUsZ0ZBaUNlO1FBR2YsZ0ZBRWU7UUFFakIsaUJBQU07O1FBMUMwQixrRUFBNkM7UUFFckMsZUFBWTtRQUFaLHFDQUFZO1FBb0NuQyxlQUFtQjtRQUFuQix3Q0FBbUI7O3VGRFN2QixhQUFhO2NBUHpCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixXQUFXLEVBQUUsdUJBQXVCO2dCQUNwQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDcEMsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO2FBQ3pCOzhEQUdVLE9BQU87a0JBQWYsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csTUFBTTtrQkFBZCxLQUFLO1lBQ0csYUFBYTtrQkFBckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsXG4gIE9uSW5pdCwgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRvb2xiYXIsIFRvb2xiYXJJdGVtLCBUb29sYmFyRHJvcGRvd24gfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmltcG9ydCB7IE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9tZW51LnNlcnZpY2UnO1xuaW1wb3J0IEVkaXRvciBmcm9tICcuLi8uLi9FZGl0b3InO1xuXG5jb25zdCBERUZBVUxUX1RPT0xCQVI6IFRvb2xiYXIgPSBbXG4gIFsnYm9sZCcsICdpdGFsaWMnXSxcbiAgWydjb2RlJywgJ2Jsb2NrcXVvdGUnXSxcbiAgWyd1bmRlcmxpbmUnLCAnc3RyaWtlJ10sXG4gIFsnb3JkZXJlZF9saXN0JywgJ2J1bGxldF9saXN0J10sXG4gIFt7IGhlYWRpbmc6IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnXSB9XSxcbiAgWydsaW5rJywgJ2ltYWdlJ10sXG4gIFsndGV4dF9jb2xvcicsICdiYWNrZ3JvdW5kX2NvbG9yJ10sXG4gIFsnYWxpZ25fbGVmdCcsICdhbGlnbl9jZW50ZXInLCAnYWxpZ25fcmlnaHQnLCAnYWxpZ25fanVzdGlmeSddLFxuXTtcblxuY29uc3QgREVGQVVMVF9DT0xPUl9QUkVTRVRTID0gW1xuICAnI2I2MDIwNScsXG4gICcjZDkzZjBiJyxcbiAgJyNmYmNhMDQnLFxuICAnIzBlOGExNicsXG4gICcjMDA2Yjc1JyxcbiAgJyMxZDc2ZGInLFxuICAnIzAwNTJjYycsXG4gICcjNTMxOWU3JyxcbiAgJyNlOTk2OTUnLFxuICAnI2Y5ZDBjNCcsXG4gICcjZmVmMmMwJyxcbiAgJyNjMmUwYzYnLFxuICAnI2JmZGFkYycsXG4gICcjYzVkZWY1JyxcbiAgJyNiZmQ0ZjInLFxuICAnI2Q0YzVmOSdcbl07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1lZGl0b3ItbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVudS5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtNZW51U2VydmljZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgdG9vbGJhcjogVG9vbGJhciA9IERFRkFVTFRfVE9PTEJBUjtcbiAgQElucHV0KCkgY29sb3JQcmVzZXRzOiBzdHJpbmdbXSA9IERFRkFVTFRfQ09MT1JfUFJFU0VUUztcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgZWRpdG9yOiBFZGl0b3I7XG4gIEBJbnB1dCgpIGN1c3RvbU1lbnVSZWY6IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsID0gbnVsbDtcblxuICB0b2dnbGVDb21tYW5kczogYW55W10gPSBbXG4gICAgJ2JvbGQnLCAnaXRhbGljJyxcbiAgICAndW5kZXJsaW5lJywgJ3N0cmlrZScsXG4gICAgJ2NvZGUnLCAnYmxvY2txdW90ZScsXG4gICAgJ29yZGVyZWRfbGlzdCcsICdidWxsZXRfbGlzdCcsXG4gICAgJ2FsaWduX2xlZnQnLCAnYWxpZ25fY2VudGVyJywgJ2FsaWduX3JpZ2h0JywgJ2FsaWduX2p1c3RpZnknXG4gIF07XG5cbiAgaWNvbkNvbnRhaW5lckNsYXNzID0gWydOZ3hFZGl0b3JfX01lbnVJdGVtJywgJ05neEVkaXRvcl9fTWVudUl0ZW0tLUljb24nXTtcbiAgZHJvcGRvd25Db250YWluZXJDbGFzcyA9IFsnTmd4RWRpdG9yX19Ecm9wZG93biddO1xuICBzZXBlcmF0b3JDbGFzcyA9IFsnTmd4RWRpdG9yX19TZXBlcmF0b3InXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1lbnVTZXJ2aWNlOiBNZW51U2VydmljZSkgeyB9XG5cbiAgZ2V0IHByZXNldHMoKTogc3RyaW5nW11bXSB7XG4gICAgY29uc3QgY29sID0gODtcbiAgICBjb25zdCBjb2xvcnM6IHN0cmluZ1tdW10gPSBbXTtcblxuICAgIHRoaXMuY29sb3JQcmVzZXRzLmZvckVhY2goKGNvbG9yLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihpbmRleCAvIGNvbCk7XG5cbiAgICAgIGlmICghY29sb3JzW3Jvd10pIHtcbiAgICAgICAgY29sb3JzLnB1c2goW10pO1xuICAgICAgfVxuXG4gICAgICBjb2xvcnNbcm93XS5wdXNoKGNvbG9yKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb2xvcnM7XG4gIH1cblxuICBpc0Ryb3BEb3duKGl0ZW06IFRvb2xiYXJJdGVtKTogYm9vbGVhbiB7XG4gICAgaWYgKChpdGVtIGFzIFRvb2xiYXJEcm9wZG93bik/LmhlYWRpbmcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldERyb3Bkb3duSXRlbXMoaXRlbTogVG9vbGJhckl0ZW0pOiBUb29sYmFyRHJvcGRvd24ge1xuICAgIHJldHVybiBpdGVtIGFzIFRvb2xiYXJEcm9wZG93bjtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5lZGl0b3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmd4RWRpdG9yOiBSZXF1aXJlZCBlZGl0b3IgaW5zdGFuY2UnKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnVTZXJ2aWNlLmVkaXRvciA9IHRoaXMuZWRpdG9yO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiTmd4RWRpdG9yX19NZW51QmFyXCIgW25nQ2xhc3NdPVwieydOZ3hFZGl0b3ItLURpc2FibGVkJzogZGlzYWJsZWR9XCI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdG9vbGJhckl0ZW0gb2YgdG9vbGJhcjsgbGV0IGxhc3RUb29sYmFySXRlbSA9IGxhc3RcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIHRvb2xiYXJJdGVtOyBsZXQgbGFzdEl0ZW0gPSBsYXN0XCI+XG5cbiAgICAgIDwhLS0gdG9nZ2xlIGljb25zIC0tPlxuICAgICAgPG5neC10b2dnbGUtY29tbWFuZCBbdG9vbGJhckl0ZW1dPVwiaXRlbVwiIFtjbGFzc109XCJpY29uQ29udGFpbmVyQ2xhc3NcIiAqbmdJZj1cInRvZ2dsZUNvbW1hbmRzLmluY2x1ZGVzKGl0ZW0pXCI+XG4gICAgICA8L25neC10b2dnbGUtY29tbWFuZD5cblxuICAgICAgPCEtLSBsaW5rIC0tPlxuICAgICAgPG5neC1saW5rIFtjbGFzc109XCJpY29uQ29udGFpbmVyQ2xhc3NcIiAqbmdJZj1cIml0ZW0gPT09ICdsaW5rJ1wiPjwvbmd4LWxpbms+XG5cbiAgICAgIDwhLS0gaW1hZ2UgLS0+XG4gICAgICA8bmd4LWltYWdlIFtjbGFzc109XCJpY29uQ29udGFpbmVyQ2xhc3NcIiAqbmdJZj1cIml0ZW0gPT09ICdpbWFnZSdcIj5cbiAgICAgIDwvbmd4LWltYWdlPlxuXG4gICAgICA8IS0tIGRyb3Bkb3duIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzRHJvcERvd24oaXRlbSlcIj5cbiAgICAgICAgPG5neC1kcm9wZG93biAqbmdGb3I9XCJsZXQgZHJvcGRvd25JdGVtIG9mIGdldERyb3Bkb3duSXRlbXMoaXRlbSkgfCBrZXl2YWx1ZVwiIFtjbGFzc109XCJkcm9wZG93bkNvbnRhaW5lckNsYXNzXCJcbiAgICAgICAgICBbZ3JvdXBdPVwiZHJvcGRvd25JdGVtLmtleVwiIFtpdGVtc109XCJkcm9wZG93bkl0ZW0udmFsdWVcIj5cbiAgICAgICAgPC9uZ3gtZHJvcGRvd24+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPCEtLSB0ZXh0IGNvbG9yIHBpY2tlciAtLT5cbiAgICAgIDxuZ3gtY29sb3ItcGlja2VyIFtjbGFzc109XCJpY29uQ29udGFpbmVyQ2xhc3NcIiAqbmdJZj1cIml0ZW0gPT09ICd0ZXh0X2NvbG9yJ1wiIHR5cGU9XCJ0ZXh0X2NvbG9yXCJcbiAgICAgICAgW3ByZXNldHNdPVwicHJlc2V0c1wiPlxuICAgICAgPC9uZ3gtY29sb3ItcGlja2VyPlxuICAgICAgPCEtLSBiYWNrZ3JvdW5kIGNvbG9yIHBpY2tlciAtLT5cbiAgICAgIDxuZ3gtY29sb3ItcGlja2VyIFtjbGFzc109XCJpY29uQ29udGFpbmVyQ2xhc3NcIiAqbmdJZj1cIml0ZW0gPT09ICdiYWNrZ3JvdW5kX2NvbG9yJ1wiIHR5cGU9XCJiYWNrZ3JvdW5kX2NvbG9yXCJcbiAgICAgICAgW3ByZXNldHNdPVwicHJlc2V0c1wiPlxuICAgICAgPC9uZ3gtY29sb3ItcGlja2VyPlxuXG4gICAgICA8IS0tIHNlcGVyYXRvciAtLT5cbiAgICAgIDxkaXYgW2NsYXNzXT1cInNlcGVyYXRvckNsYXNzXCIgKm5nSWY9XCJsYXN0SXRlbSAmJiAhbGFzdFRvb2xiYXJJdGVtXCI+PC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDwhLS0gY3VzdG9tIG1lbnUgLS0+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJjdXN0b21NZW51UmVmXCI+XG4gICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21NZW51UmVmXCI+PC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuXG48L2Rpdj5cbiJdfQ==