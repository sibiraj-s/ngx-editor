import { Component, Input } from '@angular/core';
import Icon from '../../../icons';
import { ToggleCommands } from '../MenuCommands';
import * as i0 from "@angular/core";
import * as i1 from "../../../pipes/sanitize/sanitize-html.pipe";
import * as i2 from "../../../editor.service";
import * as i3 from "@angular/common";
const _c0 = function (a0, a1) { return { "NgxBubbleMenu__Icon--Active": a0, "NgxEditor--Disabled": a1 }; };
function BubbleComponent_ng_container_0_ng_container_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵlistener("mousedown", function BubbleComponent_ng_container_0_ng_container_1_div_1_Template_div_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r10); const item_r4 = i0.ɵɵnextContext().$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.onClick($event, item_r4); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(1, "svg", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(3, _c0, ctx_r6.activeItems.includes(item_r4), !ctx_r6.execulableItems.includes(item_r4)))("title", ctx_r6.getTitle(item_r4));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", ctx_r6.getIcon(item_r4), i0.ɵɵsanitizeHtml);
} }
function BubbleComponent_ng_container_0_ng_container_1_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 5);
} }
function BubbleComponent_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BubbleComponent_ng_container_0_ng_container_1_div_1_Template, 2, 6, "div", 1);
    i0.ɵɵtemplate(2, BubbleComponent_ng_container_0_ng_container_1_div_2_Template, 1, 0, "div", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const lastItem_r5 = ctx.last;
    const lastToolbarItem_r2 = i0.ɵɵnextContext().last;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.toggleCommands.includes(item_r4));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", lastItem_r5 && !lastToolbarItem_r2);
} }
function BubbleComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BubbleComponent_ng_container_0_ng_container_1_Template, 3, 2, "ng-container", 0);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const toolbarItem_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", toolbarItem_r1);
} }
export class BubbleComponent {
    constructor(sanitizeHTML, ngxeService) {
        this.sanitizeHTML = sanitizeHTML;
        this.ngxeService = ngxeService;
        this.execulableItems = [];
        this.activeItems = [];
        this.toolbar = [
            ['bold', 'italic', 'underline', 'strike'],
            ['ordered_list', 'bullet_list', 'blockquote', 'code'],
            ['align_left', 'align_center', 'align_right', 'align_justify']
        ];
        this.toggleCommands = [
            'bold', 'italic', 'underline', 'strike',
            'ordered_list', 'bullet_list', 'blockquote', 'code',
            'align_left', 'align_center', 'align_right', 'align_justify'
        ];
    }
    get view() {
        return this.editor.view;
    }
    getIcon(name) {
        const icon = Icon.getPath(name);
        return this.sanitizeHTML.transform(icon);
    }
    getTitle(name) {
        return this.ngxeService.locals.get(name);
    }
    onClick(e, commandName) {
        e.preventDefault();
        e.stopPropagation();
        if (e.button !== 0) {
            return;
        }
        const { state, dispatch } = this.view;
        const command = ToggleCommands[commandName];
        command.toggle()(state, dispatch);
    }
    update(view) {
        this.activeItems = [];
        this.execulableItems = [];
        const { state } = view;
        this.toggleCommands.forEach(toolbarItem => {
            const command = ToggleCommands[toolbarItem];
            const isActive = command.isActive(state);
            if (isActive) {
                this.activeItems.push(toolbarItem);
            }
            const canExecute = command.canExecute(state);
            if (canExecute) {
                this.execulableItems.push(toolbarItem);
            }
        });
    }
    ngOnInit() {
        this.updateSubscription = this.editor.update
            .subscribe((view) => {
            this.update(view);
        });
    }
    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }
}
BubbleComponent.ɵfac = function BubbleComponent_Factory(t) { return new (t || BubbleComponent)(i0.ɵɵdirectiveInject(i1.SanitizeHtmlPipe), i0.ɵɵdirectiveInject(i2.NgxEditorService)); };
BubbleComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BubbleComponent, selectors: [["ngx-bubble"]], inputs: { editor: "editor" }, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "NgxBubbleMenu__Icon", 3, "ngClass", "title", "mousedown", 4, "ngIf"], ["class", "NgxBubbleMenu__Seperator", 4, "ngIf"], [1, "NgxBubbleMenu__Icon", 3, "ngClass", "title", "mousedown"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "height", "20", "width", "20", 3, "innerHTML"], [1, "NgxBubbleMenu__Seperator"]], template: function BubbleComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BubbleComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.toolbar);
    } }, directives: [i3.NgForOf, i3.NgIf, i3.NgClass], styles: ["*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before{box-sizing:border-box}[_nghost-%COMP%]{display:flex;background-color:#000;color:#fff;padding:.3rem;border-radius:4px}.NgxBubbleMenu__Icon[_ngcontent-%COMP%]{height:1.8rem;width:1.8rem;transition:.3s ease-in-out;border-radius:2px;display:flex;align-items:center;justify-content:center}.NgxBubbleMenu__Icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#fff}.NgxBubbleMenu__Icon[_ngcontent-%COMP%]:hover{background-color:#636262}.NgxBubbleMenu__Icon[_ngcontent-%COMP%] + .NgxBubbleMenu__Icon[_ngcontent-%COMP%]{margin-left:.3rem}.NgxBubbleMenu__Icon.NgxBubbleMenu__Icon--Active[_ngcontent-%COMP%]{background-color:#fff}.NgxBubbleMenu__Icon.NgxBubbleMenu__Icon--Active[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:#000}.NgxBubbleMenu__Seperator[_ngcontent-%COMP%]{border-left:1px solid #fff;margin:0 5px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BubbleComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-bubble',
                templateUrl: './bubble.component.html',
                styleUrls: ['./bubble.component.scss']
            }]
    }], function () { return [{ type: i1.SanitizeHtmlPipe }, { type: i2.NgxEditorService }]; }, { editor: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL25neC1lZGl0b3Ivc3JjL2xpYi9tb2R1bGVzL21lbnUvYnViYmxlL2J1YmJsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvbW9kdWxlcy9tZW51L2J1YmJsZS9idWJibGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxLQUFLLEVBRWpCLE1BQU0sZUFBZSxDQUFDO0FBTXZCLE9BQU8sSUFBSSxNQUFNLGdCQUFnQixDQUFDO0FBR2xDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7SUNWM0MsOEJBRW1FO0lBRFQsd1JBQW1DO0lBRXpGLG1CQUNnQztJQURoQyx5QkFDc0M7SUFDMUMsaUJBQU07Ozs7SUFMMkIscUlBQ3dCLG1DQUFBO0lBR2pELGVBQTJCO0lBQTNCLHNFQUEyQjs7O0lBRW5DLHlCQUFpRjs7O0lBUHJGLDZCQUFvRTtJQUNoRSw4RkFLTTtJQUNOLDhGQUFpRjtJQUNyRiwwQkFBZTs7Ozs7O0lBTE4sZUFBbUM7SUFBbkMsOERBQW1DO0lBSUQsZUFBa0M7SUFBbEMseURBQWtDOzs7SUFSL0UsNkJBQThFO0lBQzVFLGlHQVFlO0lBQ2pCLDBCQUFlOzs7SUFUa0IsZUFBZ0I7SUFBaEIsd0NBQWdCOztBRG1CakQsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFBb0IsWUFBOEIsRUFBVSxXQUE2QjtRQUFyRSxpQkFBWSxHQUFaLFlBQVksQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFTekYsb0JBQWUsR0FBYyxFQUFFLENBQUM7UUFDaEMsZ0JBQVcsR0FBYyxFQUFFLENBQUM7UUFFNUIsWUFBTyxHQUFnQjtZQUNyQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQztZQUN6QyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQztZQUNyRCxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQztTQUMvRCxDQUFDO1FBRUYsbUJBQWMsR0FBYztZQUMxQixNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRO1lBQ3ZDLGNBQWMsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU07WUFDbkQsWUFBWSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsZUFBZTtTQUM3RCxDQUFDO0lBdEIyRixDQUFDO0lBRTlGLElBQVksSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQW9CRCxPQUFPLENBQUMsSUFBYTtRQUNuQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFZO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBYSxFQUFFLFdBQW9CO1FBQ3pDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQixPQUFPO1NBQ1I7UUFFRCxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFdEMsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVPLE1BQU0sQ0FBQyxJQUFnQjtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3hDLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU1QyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksUUFBUSxFQUFFO2dCQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3BDO1lBRUQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUU3QyxJQUFJLFVBQVUsRUFBRTtnQkFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN4QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ3pDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs4RUE5RVUsZUFBZTtvREFBZixlQUFlO1FDcEI1QixrRkFVZTs7UUFWdUIscUNBQVk7O3VGRG9CckMsZUFBZTtjQUwzQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFdBQVcsRUFBRSx5QkFBeUI7Z0JBQ3RDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2FBQ3ZDO2tHQVFVLE1BQU07a0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSxcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEVkaXRvclZpZXcgfSBmcm9tICdwcm9zZW1pcnJvci12aWV3JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgRWRpdG9yIGZyb20gJy4uLy4uLy4uL0VkaXRvcic7XG5pbXBvcnQgSWNvbiBmcm9tICcuLi8uLi8uLi9pY29ucyc7XG5pbXBvcnQgeyBUQkl0ZW1zIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgU2FuaXRpemVIdG1sUGlwZSB9IGZyb20gJy4uLy4uLy4uL3BpcGVzL3Nhbml0aXplL3Nhbml0aXplLWh0bWwucGlwZSc7XG5pbXBvcnQgeyBUb2dnbGVDb21tYW5kcyB9IGZyb20gJy4uL01lbnVDb21tYW5kcyc7XG5pbXBvcnQgeyBOZ3hFZGl0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZWRpdG9yLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtYnViYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2J1YmJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2J1YmJsZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJ1YmJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZUhUTUw6IFNhbml0aXplSHRtbFBpcGUsIHByaXZhdGUgbmd4ZVNlcnZpY2U6IE5neEVkaXRvclNlcnZpY2UpIHsgfVxuXG4gIHByaXZhdGUgZ2V0IHZpZXcoKTogRWRpdG9yVmlldyB7XG4gICAgcmV0dXJuIHRoaXMuZWRpdG9yLnZpZXc7XG4gIH1cblxuICBASW5wdXQoKSBlZGl0b3I6IEVkaXRvcjtcblxuICBwcml2YXRlIHVwZGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBleGVjdWxhYmxlSXRlbXM6IFRCSXRlbXNbXSA9IFtdO1xuICBhY3RpdmVJdGVtczogVEJJdGVtc1tdID0gW107XG5cbiAgdG9vbGJhcjogVEJJdGVtc1tdW10gPSBbXG4gICAgWydib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCAnc3RyaWtlJ10sXG4gICAgWydvcmRlcmVkX2xpc3QnLCAnYnVsbGV0X2xpc3QnLCAnYmxvY2txdW90ZScsICdjb2RlJ10sXG4gICAgWydhbGlnbl9sZWZ0JywgJ2FsaWduX2NlbnRlcicsICdhbGlnbl9yaWdodCcsICdhbGlnbl9qdXN0aWZ5J11cbiAgXTtcblxuICB0b2dnbGVDb21tYW5kczogVEJJdGVtc1tdID0gW1xuICAgICdib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCAnc3RyaWtlJyxcbiAgICAnb3JkZXJlZF9saXN0JywgJ2J1bGxldF9saXN0JywgJ2Jsb2NrcXVvdGUnLCAnY29kZScsXG4gICAgJ2FsaWduX2xlZnQnLCAnYWxpZ25fY2VudGVyJywgJ2FsaWduX3JpZ2h0JywgJ2FsaWduX2p1c3RpZnknXG4gIF07XG5cbiAgZ2V0SWNvbihuYW1lOiBUQkl0ZW1zKTogU2FmZUh0bWwge1xuICAgIGNvbnN0IGljb24gPSBJY29uLmdldFBhdGgobmFtZSk7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVIVE1MLnRyYW5zZm9ybShpY29uKTtcbiAgfVxuXG4gIGdldFRpdGxlKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubmd4ZVNlcnZpY2UubG9jYWxzLmdldChuYW1lKTtcbiAgfVxuXG4gIG9uQ2xpY2soZTogTW91c2VFdmVudCwgY29tbWFuZE5hbWU6IFRCSXRlbXMpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc3RhdGUsIGRpc3BhdGNoIH0gPSB0aGlzLnZpZXc7XG5cbiAgICBjb25zdCBjb21tYW5kID0gVG9nZ2xlQ29tbWFuZHNbY29tbWFuZE5hbWVdO1xuICAgIGNvbW1hbmQudG9nZ2xlKCkoc3RhdGUsIGRpc3BhdGNoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKHZpZXc6IEVkaXRvclZpZXcpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZUl0ZW1zID0gW107XG4gICAgdGhpcy5leGVjdWxhYmxlSXRlbXMgPSBbXTtcbiAgICBjb25zdCB7IHN0YXRlIH0gPSB2aWV3O1xuXG4gICAgdGhpcy50b2dnbGVDb21tYW5kcy5mb3JFYWNoKHRvb2xiYXJJdGVtID0+IHtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBUb2dnbGVDb21tYW5kc1t0b29sYmFySXRlbV07XG5cbiAgICAgIGNvbnN0IGlzQWN0aXZlID0gY29tbWFuZC5pc0FjdGl2ZShzdGF0ZSk7XG4gICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtcy5wdXNoKHRvb2xiYXJJdGVtKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2FuRXhlY3V0ZSA9IGNvbW1hbmQuY2FuRXhlY3V0ZShzdGF0ZSk7XG5cbiAgICAgIGlmIChjYW5FeGVjdXRlKSB7XG4gICAgICAgIHRoaXMuZXhlY3VsYWJsZUl0ZW1zLnB1c2godG9vbGJhckl0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVTdWJzY3JpcHRpb24gPSB0aGlzLmVkaXRvci51cGRhdGVcbiAgICAgIC5zdWJzY3JpYmUoKHZpZXcpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGUodmlldyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHRvb2xiYXJJdGVtIG9mIHRvb2xiYXI7IGxldCBsYXN0VG9vbGJhckl0ZW0gPSBsYXN0XCI+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdG9vbGJhckl0ZW07IGxldCBsYXN0SXRlbSA9IGxhc3RcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJOZ3hCdWJibGVNZW51X19JY29uXCIgW25nQ2xhc3NdPVwieydOZ3hCdWJibGVNZW51X19JY29uLS1BY3RpdmUnOiB0aGlzLmFjdGl2ZUl0ZW1zLmluY2x1ZGVzKGl0ZW0pLFxuICAnTmd4RWRpdG9yLS1EaXNhYmxlZCc6ICF0aGlzLmV4ZWN1bGFibGVJdGVtcy5pbmNsdWRlcyhpdGVtKX1cIiAobW91c2Vkb3duKT1cIm9uQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgICAgKm5nSWY9XCJ0b2dnbGVDb21tYW5kcy5pbmNsdWRlcyhpdGVtKVwiIFt0aXRsZV09XCJnZXRUaXRsZShpdGVtKVwiPlxuICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBoZWlnaHQ9XCIyMFwiIHdpZHRoPVwiMjBcIlxuICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cImdldEljb24oaXRlbSlcIj48L3N2Zz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIk5neEJ1YmJsZU1lbnVfX1NlcGVyYXRvclwiICpuZ0lmPVwibGFzdEl0ZW0gJiYgIWxhc3RUb29sYmFySXRlbVwiPjwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuIl19