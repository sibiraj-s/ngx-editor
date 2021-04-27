import { Component, HostBinding, Input } from '@angular/core';
import Icon from '../../../icons';
import { ToggleCommands } from '../MenuCommands';
import * as i0 from "@angular/core";
import * as i1 from "../../../editor.service";
import * as i2 from "../menu.service";
import * as i3 from "../../../pipes/sanitize/sanitize-html.pipe";
export class ToggleCommandComponent {
    constructor(ngxeService, menuService) {
        this.ngxeService = ngxeService;
        this.menuService = menuService;
        this.isActive = false;
        this.disabled = false;
        this.update = (view) => {
            const { state } = view;
            const command = ToggleCommands[this.name];
            this.isActive = command.isActive(state);
            this.disabled = !command.canExecute(state);
        };
    }
    get name() {
        return this.toolbarItem;
    }
    toggle(e) {
        e.preventDefault();
        if (e.button !== 0) {
            return;
        }
        const { state, dispatch } = this.editorView;
        const command = ToggleCommands[this.name];
        command.toggle()(state, dispatch);
    }
    getTitle(name) {
        return this.ngxeService.locals.get(name);
    }
    ngOnInit() {
        this.html = Icon.get(this.name);
        this.editorView = this.menuService.editor.view;
        this.updateSubscription = this.menuService.editor.update.subscribe((view) => {
            this.update(view);
        });
    }
    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }
}
ToggleCommandComponent.ɵfac = function ToggleCommandComponent_Factory(t) { return new (t || ToggleCommandComponent)(i0.ɵɵdirectiveInject(i1.NgxEditorService), i0.ɵɵdirectiveInject(i2.MenuService)); };
ToggleCommandComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ToggleCommandComponent, selectors: [["ngx-toggle-command"]], hostVars: 4, hostBindings: function ToggleCommandComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("NgxEditor__MenuItem--Active", ctx.isActive)("NgxEditor--Disabled", ctx.disabled);
    } }, inputs: { toolbarItem: "toolbarItem" }, decls: 2, vars: 4, consts: [[1, "NgxEditor__MenuItem--IconContainer", 3, "innerHTML", "title", "mousedown"]], template: function ToggleCommandComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("mousedown", function ToggleCommandComponent_Template_div_mousedown_0_listener($event) { return ctx.toggle($event); });
        i0.ɵɵpipe(1, "sanitizeHtml");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 2, ctx.html), i0.ɵɵsanitizeHtml)("title", ctx.getTitle(ctx.name));
    } }, pipes: [i3.SanitizeHtmlPipe], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToggleCommandComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-toggle-command',
                templateUrl: './toggle-command.component.html',
                styleUrls: ['./toggle-command.component.scss']
            }]
    }], function () { return [{ type: i1.NgxEditorService }, { type: i2.MenuService }]; }, { toolbarItem: [{
            type: Input
        }], isActive: [{
            type: HostBinding,
            args: ['class.NgxEditor__MenuItem--Active']
        }], disabled: [{
            type: HostBinding,
            args: ['class.NgxEditor--Disabled']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWNvbW1hbmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWVkaXRvci9zcmMvbGliL21vZHVsZXMvbWVudS90b2dnbGUtY29tbWFuZC90b2dnbGUtY29tbWFuZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvbW9kdWxlcy9tZW51L3RvZ2dsZS1jb21tYW5kL3RvZ2dsZS1jb21tYW5kLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFJakYsT0FBTyxJQUFJLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7OztBQVdqRCxNQUFNLE9BQU8sc0JBQXNCO0lBV2pDLFlBQ1UsV0FBNkIsRUFDN0IsV0FBd0I7UUFEeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBR2dCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDekIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQWMzRCxXQUFNLEdBQUcsQ0FBQyxJQUFnQixFQUFFLEVBQUU7WUFDNUIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQztZQUN2QixNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUE7SUF0QkksQ0FBQztJQVhOLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFdBQXNCLENBQUM7SUFDckMsQ0FBQztJQWNELE1BQU0sQ0FBQyxDQUFhO1FBQ2xCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUVELE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1QyxNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQVNELFFBQVEsQ0FBQyxJQUFZO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUUvQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQWdCLEVBQUUsRUFBRTtZQUN0RixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQzs7NEZBdERVLHNCQUFzQjsyREFBdEIsc0JBQXNCOzs7UUNoQm5DLDhCQUMyQjtRQUR1RCw4R0FBYSxrQkFBYyxJQUFDOztRQUU5RyxpQkFBTTs7UUFGMEMsNkVBQWlDLGlDQUFBOzt1RkRnQnBFLHNCQUFzQjtjQU5sQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsU0FBUyxFQUFFLENBQUMsaUNBQWlDLENBQUM7YUFDL0M7NkZBR1UsV0FBVztrQkFBbkIsS0FBSztZQWU0QyxRQUFRO2tCQUF6RCxXQUFXO21CQUFDLG1DQUFtQztZQUNOLFFBQVE7a0JBQWpELFdBQVc7bUJBQUMsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZGl0b3JWaWV3IH0gZnJvbSAncHJvc2VtaXJyb3Itdmlldyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IEljb24gZnJvbSAnLi4vLi4vLi4vaWNvbnMnO1xuaW1wb3J0IHsgVG9nZ2xlQ29tbWFuZHMgfSBmcm9tICcuLi9NZW51Q29tbWFuZHMnO1xuaW1wb3J0IHsgTmd4RWRpdG9yU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2VkaXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IFRCSXRlbXMsIFRvb2xiYXJJdGVtIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdG9nZ2xlLWNvbW1hbmQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdG9nZ2xlLWNvbW1hbmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90b2dnbGUtY29tbWFuZC5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgVG9nZ2xlQ29tbWFuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgdG9vbGJhckl0ZW06IFRvb2xiYXJJdGVtO1xuXG4gIGdldCBuYW1lKCk6IFRCSXRlbXMge1xuICAgIHJldHVybiB0aGlzLnRvb2xiYXJJdGVtIGFzIFRCSXRlbXM7XG4gIH1cblxuICBodG1sOiBzdHJpbmc7XG4gIGVkaXRvclZpZXc6IEVkaXRvclZpZXc7XG4gIHByaXZhdGUgdXBkYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ3hlU2VydmljZTogTmd4RWRpdG9yU2VydmljZSxcbiAgICBwcml2YXRlIG1lbnVTZXJ2aWNlOiBNZW51U2VydmljZVxuICApIHsgIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLk5neEVkaXRvcl9fTWVudUl0ZW0tLUFjdGl2ZScpIGlzQWN0aXZlID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuTmd4RWRpdG9yLS1EaXNhYmxlZCcpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgdG9nZ2xlKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoZS5idXR0b24gIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IHN0YXRlLCBkaXNwYXRjaCB9ID0gdGhpcy5lZGl0b3JWaWV3O1xuICAgIGNvbnN0IGNvbW1hbmQgPSBUb2dnbGVDb21tYW5kc1t0aGlzLm5hbWVdO1xuICAgIGNvbW1hbmQudG9nZ2xlKCkoc3RhdGUsIGRpc3BhdGNoKTtcbiAgfVxuXG4gIHVwZGF0ZSA9ICh2aWV3OiBFZGl0b3JWaWV3KSA9PiB7XG4gICAgY29uc3QgeyBzdGF0ZSB9ID0gdmlldztcbiAgICBjb25zdCBjb21tYW5kID0gVG9nZ2xlQ29tbWFuZHNbdGhpcy5uYW1lXTtcbiAgICB0aGlzLmlzQWN0aXZlID0gY29tbWFuZC5pc0FjdGl2ZShzdGF0ZSk7XG4gICAgdGhpcy5kaXNhYmxlZCA9ICFjb21tYW5kLmNhbkV4ZWN1dGUoc3RhdGUpO1xuICB9XG5cbiAgZ2V0VGl0bGUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5uZ3hlU2VydmljZS5sb2NhbHMuZ2V0KG5hbWUpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5odG1sID0gSWNvbi5nZXQodGhpcy5uYW1lKTtcblxuICAgIHRoaXMuZWRpdG9yVmlldyA9IHRoaXMubWVudVNlcnZpY2UuZWRpdG9yLnZpZXc7XG5cbiAgICB0aGlzLnVwZGF0ZVN1YnNjcmlwdGlvbiA9IHRoaXMubWVudVNlcnZpY2UuZWRpdG9yLnVwZGF0ZS5zdWJzY3JpYmUoKHZpZXc6IEVkaXRvclZpZXcpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlKHZpZXcpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIk5neEVkaXRvcl9fTWVudUl0ZW0tLUljb25Db250YWluZXJcIiBbaW5uZXJIVE1MXT1cImh0bWwgfCBzYW5pdGl6ZUh0bWxcIiAobW91c2Vkb3duKT1cInRvZ2dsZSgkZXZlbnQpXCJcbiAgW3RpdGxlXT1cImdldFRpdGxlKG5hbWUpXCI+XG48L2Rpdj5cbiJdfQ==