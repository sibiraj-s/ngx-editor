import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class MenuService {
    constructor() {
        this.customMenuRefChange = new Subject();
    }
    setCustomMenuRef(c) {
        this.customMenuRefChange.next(c);
    }
}
MenuService.ɵfac = function MenuService_Factory(t) { return new (t || MenuService)(); };
MenuService.ɵprov = i0.ɵɵdefineInjectable({ token: MenuService, factory: MenuService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MenuService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWVkaXRvci9zcmMvbGliL21vZHVsZXMvbWVudS9tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQU8vQixNQUFNLE9BQU8sV0FBVztJQUl0QjtRQUZBLHdCQUFtQixHQUE4QixJQUFJLE9BQU8sRUFBb0IsQ0FBQztJQUVqRSxDQUFDO0lBRWpCLGdCQUFnQixDQUFDLENBQW1CO1FBQ2xDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7c0VBUlUsV0FBVzttREFBWCxXQUFXLFdBQVgsV0FBVyxtQkFGVixNQUFNO3VGQUVQLFdBQVc7Y0FIdkIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVkaXRvclZpZXcgfSBmcm9tICdwcm9zZW1pcnJvci12aWV3JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IEVkaXRvciBmcm9tICcuLi8uLi9FZGl0b3InO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNZW51U2VydmljZSB7XG4gIGVkaXRvcjogRWRpdG9yO1xuICBjdXN0b21NZW51UmVmQ2hhbmdlOiBTdWJqZWN0PFRlbXBsYXRlUmVmPGFueT4+ID0gbmV3IFN1YmplY3Q8VGVtcGxhdGVSZWY8YW55Pj4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHNldEN1c3RvbU1lbnVSZWYoYzogVGVtcGxhdGVSZWY8YW55Pik6IHZvaWQge1xuICAgIHRoaXMuY3VzdG9tTWVudVJlZkNoYW5nZS5uZXh0KGMpO1xuICB9XG59XG4iXX0=