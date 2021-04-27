import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { ToggleCommands } from '../MenuCommands';
import * as i0 from "@angular/core";
import * as i1 from "../../../editor.service";
import * as i2 from "../menu.service";
import * as i3 from "@angular/common";
const _c0 = function (a0, a1) { return { "NgxEditor__Dropdown--Active": a0, "NgxEditor--Disabled": a1 }; };
function DropdownComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵlistener("mousedown", function DropdownComponent_div_2_div_1_Template_div_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r4); const item_r2 = ctx.$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return ctx_r3.onClick($event, item_r2); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(2, _c0, item_r2 === ctx_r1.activeItem, ctx_r1.disabledItems.includes(item_r2)));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getName(item_r2), " ");
} }
function DropdownComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, DropdownComponent_div_2_div_1_Template, 2, 5, "div", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.items);
} }
export class DropdownComponent {
    constructor(ngxeService, menuService, el) {
        this.ngxeService = ngxeService;
        this.menuService = menuService;
        this.el = el;
        this.isDropdownOpen = false;
        this.activeItems = [];
        this.disabledItems = [];
        this.update = (view) => {
            const { state } = view;
            this.activeItems = [];
            this.disabledItems = [];
            this.items.forEach((item) => {
                const command = ToggleCommands[item];
                const isActive = command.isActive(state);
                if (isActive) {
                    this.activeItems.push(item);
                }
                if (!command.canExecute(state)) {
                    this.disabledItems.push(item);
                }
            });
            if (this.activeItems.length === 1) {
                this.activeItem = this.activeItems[0];
            }
            else {
                this.activeItem = null;
            }
        };
    }
    get isSelected() {
        return Boolean(this.activeItem || this.isDropdownOpen);
    }
    get isDropdownDisabled() {
        return this.disabledItems.length === this.items.length;
    }
    onDocumentClick(target) {
        if (!this.el.nativeElement.contains(target) && this.isDropdownOpen) {
            this.isDropdownOpen = false;
        }
    }
    getName(key) {
        return this.ngxeService.locals.get(key);
    }
    toggleDropdown(e) {
        e.preventDefault();
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    onClick(e, item) {
        e.preventDefault();
        // consider only left click
        if (e.button !== 0) {
            return;
        }
        const command = ToggleCommands[item];
        const { state, dispatch } = this.editorView;
        command.toggle()(state, dispatch);
        this.isDropdownOpen = false;
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
DropdownComponent.ɵfac = function DropdownComponent_Factory(t) { return new (t || DropdownComponent)(i0.ɵɵdirectiveInject(i1.NgxEditorService), i0.ɵɵdirectiveInject(i2.MenuService), i0.ɵɵdirectiveInject(i0.ElementRef)); };
DropdownComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DropdownComponent, selectors: [["ngx-dropdown"]], hostVars: 4, hostBindings: function DropdownComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mousedown", function DropdownComponent_mousedown_HostBindingHandler($event) { return ctx.onDocumentClick($event.target); }, false, i0.ɵɵresolveDocument);
    } if (rf & 2) {
        i0.ɵɵclassProp("NgxEditor__Dropdown--Selected", ctx.isSelected)("NgxEditor--Disabled", ctx.isDropdownDisabled);
    } }, inputs: { group: "group", items: "items" }, decls: 3, vars: 2, consts: [[1, "NgxEditor__Dropdown--Text", 3, "mousedown"], ["class", "NgxEditor__Dropdown--DropdownMenu", 4, "ngIf"], [1, "NgxEditor__Dropdown--DropdownMenu"], ["class", "NgxEditor__Dropdown--Item", 3, "ngClass", "mousedown", 4, "ngFor", "ngForOf"], [1, "NgxEditor__Dropdown--Item", 3, "ngClass", "mousedown"]], template: function DropdownComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("mousedown", function DropdownComponent_Template_div_mousedown_0_listener($event) { return ctx.toggleDropdown($event); });
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(2, DropdownComponent_div_2_Template, 2, 1, "div", 1);
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.getName(ctx.activeItem || ctx.group), "\n");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isDropdownOpen);
    } }, directives: [i3.NgIf, i3.NgForOf, i3.NgClass], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DropdownComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-dropdown',
                templateUrl: './dropdown.component.html',
                styleUrls: ['./dropdown.component.scss']
            }]
    }], function () { return [{ type: i1.NgxEditorService }, { type: i2.MenuService }, { type: i0.ElementRef }]; }, { group: [{
            type: Input
        }], items: [{
            type: Input
        }], isSelected: [{
            type: HostBinding,
            args: ['class.NgxEditor__Dropdown--Selected']
        }], isDropdownDisabled: [{
            type: HostBinding,
            args: ['class.NgxEditor--Disabled']
        }], onDocumentClick: [{
            type: HostListener,
            args: ['document:mousedown', ['$event.target']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWVkaXRvci9zcmMvbGliL21vZHVsZXMvbWVudS9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvbW9kdWxlcy9tZW51L2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQWMsV0FBVyxFQUNsQyxZQUFZLEVBQUUsS0FBSyxFQUNwQixNQUFNLGVBQWUsQ0FBQztBQU12QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0lDSi9DLDhCQUN1SDtJQURyRCxrUEFBbUM7SUFFbkcsWUFDRjtJQUFBLGlCQUFNOzs7O0lBRkosMkhBQW9IO0lBQ3BILGVBQ0Y7SUFERSx3REFDRjs7O0lBSkYsOEJBQXNFO0lBQ3BFLHdFQUdNO0lBQ1IsaUJBQU07OztJQUpvRCxlQUFRO0lBQVIsc0NBQVE7O0FEWWxFLE1BQU0sT0FBTyxpQkFBaUI7SUFhNUIsWUFDVSxXQUE2QixFQUM3QixXQUF3QixFQUN4QixFQUFjO1FBRmQsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFUeEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFZixnQkFBVyxHQUFxQixFQUFFLENBQUM7UUFDM0Msa0JBQWEsR0FBYSxFQUFFLENBQUM7UUE4Q3JCLFdBQU0sR0FBRyxDQUFDLElBQWdCLEVBQUUsRUFBRTtZQUNwQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEdB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VSxpQkFBaUI7c0RBQWpCLGlCQUFpQjs0R0FBakIsa0NBQThCOzs7O1FDakIzQyw4QkFBNEU7UUFBckMseUdBQWEsMEJBQXNCLElBQUM7UUFDekUsWUFDRjtRQUFBLGlCQUFNO1FBRU4sa0VBS007O1FBUkosZUFDRjtRQURFLDBFQUNGO1FBRWdELGVBQW9CO1FBQXBCLHlDQUFvQjs7dUZEYXZELGlCQUFpQjtjQUw3QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFdBQVcsRUFBRSwyQkFBMkI7Z0JBQ3hDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2FBQ3pDO3NIQUtVLEtBQUs7a0JBQWIsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQWNrRCxVQUFVO2tCQUFqRSxXQUFXO21CQUFDLHFDQUFxQztZQUlKLGtCQUFrQjtrQkFBL0QsV0FBVzttQkFBQywyQkFBMkI7WUFJZSxlQUFlO2tCQUFyRSxZQUFZO21CQUFDLG9CQUFvQixFQUFFLENBQUMsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZGl0b3JWaWV3IH0gZnJvbSAncHJvc2VtaXJyb3Itdmlldyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTmd4RWRpdG9yU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2VkaXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IFRvZ2dsZUNvbW1hbmRzIH0gZnJvbSAnLi4vTWVudUNvbW1hbmRzJztcbmltcG9ydCB7IFRCSGVhZGluZ0l0ZW1zIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZHJvcGRvd24nLFxuICB0ZW1wbGF0ZVVybDogJy4vZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kcm9wZG93bi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGVkaXRvclZpZXc6IEVkaXRvclZpZXc7XG4gIHByaXZhdGUgdXBkYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KCkgZ3JvdXA6IHN0cmluZztcbiAgQElucHV0KCkgaXRlbXM6IFRCSGVhZGluZ0l0ZW1zW107XG5cbiAgaXNEcm9wZG93bk9wZW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGFjdGl2ZUl0ZW1zOiBUQkhlYWRpbmdJdGVtc1tdID0gW107XG4gIGRpc2FibGVkSXRlbXM6IHN0cmluZ1tdID0gW107XG4gIGFjdGl2ZUl0ZW06IHN0cmluZyB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ3hlU2VydmljZTogTmd4RWRpdG9yU2VydmljZSxcbiAgICBwcml2YXRlIG1lbnVTZXJ2aWNlOiBNZW51U2VydmljZSxcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmXG4gICkgeyB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5OZ3hFZGl0b3JfX0Ryb3Bkb3duLS1TZWxlY3RlZCcpIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuYWN0aXZlSXRlbSB8fCB0aGlzLmlzRHJvcGRvd25PcGVuKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuTmd4RWRpdG9yLS1EaXNhYmxlZCcpIGdldCBpc0Ryb3Bkb3duRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRJdGVtcy5sZW5ndGggPT09IHRoaXMuaXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2Vkb3duJywgWyckZXZlbnQudGFyZ2V0J10pIG9uRG9jdW1lbnRDbGljayh0YXJnZXQ6IE5vZGUpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXQpICYmIHRoaXMuaXNEcm9wZG93bk9wZW4pIHtcbiAgICAgIHRoaXMuaXNEcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnZXROYW1lKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5uZ3hlU2VydmljZS5sb2NhbHMuZ2V0KGtleSk7XG4gIH1cblxuICB0b2dnbGVEcm9wZG93bihlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuaXNEcm9wZG93bk9wZW4gPSAhdGhpcy5pc0Ryb3Bkb3duT3BlbjtcbiAgfVxuXG4gIG9uQ2xpY2soZTogTW91c2VFdmVudCwgaXRlbTogVEJIZWFkaW5nSXRlbXMpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBjb25zaWRlciBvbmx5IGxlZnQgY2xpY2tcbiAgICBpZiAoZS5idXR0b24gIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb21tYW5kID0gVG9nZ2xlQ29tbWFuZHNbaXRlbV07XG4gICAgY29uc3QgeyBzdGF0ZSwgZGlzcGF0Y2ggfSA9IHRoaXMuZWRpdG9yVmlldztcbiAgICBjb21tYW5kLnRvZ2dsZSgpKHN0YXRlLCBkaXNwYXRjaCk7XG4gICAgdGhpcy5pc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUgPSAodmlldzogRWRpdG9yVmlldykgPT4ge1xuICAgIGNvbnN0IHsgc3RhdGUgfSA9IHZpZXc7XG4gICAgdGhpcy5hY3RpdmVJdGVtcyA9IFtdO1xuICAgIHRoaXMuZGlzYWJsZWRJdGVtcyA9IFtdO1xuXG4gICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtOiBUQkhlYWRpbmdJdGVtcykgPT4ge1xuICAgICAgY29uc3QgY29tbWFuZCA9IFRvZ2dsZUNvbW1hbmRzW2l0ZW1dO1xuICAgICAgY29uc3QgaXNBY3RpdmUgPSBjb21tYW5kLmlzQWN0aXZlKHN0YXRlKTtcblxuICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjb21tYW5kLmNhbkV4ZWN1dGUoc3RhdGUpKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlSXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSB0aGlzLmFjdGl2ZUl0ZW1zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZWRpdG9yVmlldyA9IHRoaXMubWVudVNlcnZpY2UuZWRpdG9yLnZpZXc7XG5cbiAgICB0aGlzLnVwZGF0ZVN1YnNjcmlwdGlvbiA9IHRoaXMubWVudVNlcnZpY2UuZWRpdG9yLnVwZGF0ZS5zdWJzY3JpYmUoKHZpZXc6IEVkaXRvclZpZXcpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlKHZpZXcpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIk5neEVkaXRvcl9fRHJvcGRvd24tLVRleHRcIiAobW91c2Vkb3duKT1cInRvZ2dsZURyb3Bkb3duKCRldmVudClcIj5cbiAge3tnZXROYW1lKGFjdGl2ZUl0ZW0gfHwgZ3JvdXApfX1cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwiTmd4RWRpdG9yX19Ecm9wZG93bi0tRHJvcGRvd25NZW51XCIgKm5nSWY9XCJpc0Ryb3Bkb3duT3BlblwiPlxuICA8ZGl2IGNsYXNzPVwiTmd4RWRpdG9yX19Ecm9wZG93bi0tSXRlbVwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCIgKG1vdXNlZG93bik9XCJvbkNsaWNrKCRldmVudCwgaXRlbSlcIlxuICAgIFtuZ0NsYXNzXT1cInsnTmd4RWRpdG9yX19Ecm9wZG93bi0tQWN0aXZlJzogaXRlbSA9PT0gYWN0aXZlSXRlbSwgJ05neEVkaXRvci0tRGlzYWJsZWQnOmRpc2FibGVkSXRlbXMuaW5jbHVkZXMoaXRlbSl9XCI+XG4gICAge3tnZXROYW1lKGl0ZW0pfX1cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==