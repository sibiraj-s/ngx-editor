import { Injectable, Optional } from '@angular/core';
import Locals from './Locals';
import * as i0 from "@angular/core";
export class NgxEditorServiceConfig {
    constructor() {
        this.locals = {};
    }
}
NgxEditorServiceConfig.ɵfac = function NgxEditorServiceConfig_Factory(t) { return new (t || NgxEditorServiceConfig)(); };
NgxEditorServiceConfig.ɵprov = i0.ɵɵdefineInjectable({ token: NgxEditorServiceConfig, factory: NgxEditorServiceConfig.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxEditorServiceConfig, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
export class NgxEditorService {
    constructor(config) {
        this.config = config;
    }
    get locals() {
        return new Locals(this.config.locals);
    }
}
NgxEditorService.ɵfac = function NgxEditorService_Factory(t) { return new (t || NgxEditorService)(i0.ɵɵinject(NgxEditorServiceConfig, 8)); };
NgxEditorService.ɵprov = i0.ɵɵdefineInjectable({ token: NgxEditorService, factory: NgxEditorService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxEditorService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: NgxEditorServiceConfig, decorators: [{
                type: Optional
            }] }]; }, null); })();
export const provideMyServiceOptions = (config) => {
    var _a;
    return {
        locals: (_a = config.locals) !== null && _a !== void 0 ? _a : {}
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvZWRpdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckQsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDOztBQUs5QixNQUFNLE9BQU8sc0JBQXNCO0lBSG5DO1FBSVMsV0FBTSxHQUFHLEVBQUUsQ0FBQztLQUNwQjs7NEZBRlksc0JBQXNCOzhEQUF0QixzQkFBc0IsV0FBdEIsc0JBQXNCLG1CQUZyQixNQUFNO3VGQUVQLHNCQUFzQjtjQUhsQyxVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O0FBUUQsTUFBTSxPQUFPLGdCQUFnQjtJQUczQixZQUF3QixNQUErQjtRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O2dGQVRVLGdCQUFnQixjQUdNLHNCQUFzQjt3REFINUMsZ0JBQWdCLFdBQWhCLGdCQUFnQixtQkFGZixNQUFNO3VGQUVQLGdCQUFnQjtjQUg1QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7c0NBSWtDLHNCQUFzQjtzQkFBMUMsUUFBUTs7QUFTdkIsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxNQUF3QixFQUEwQixFQUFFOztJQUMxRixPQUFPO1FBQ0wsTUFBTSxRQUFFLE1BQU0sQ0FBQyxNQUFNLG1DQUFJLEVBQUU7S0FDNUIsQ0FBQztBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5neEVkaXRvckNvbmZpZ30gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgTG9jYWxzIGZyb20gJy4vTG9jYWxzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4RWRpdG9yU2VydmljZUNvbmZpZyB7XG4gIHB1YmxpYyBsb2NhbHMgPSB7fTtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4RWRpdG9yU2VydmljZSB7XG4gIGNvbmZpZzogTmd4RWRpdG9yU2VydmljZUNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBjb25maWc/OiBOZ3hFZGl0b3JTZXJ2aWNlQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICBnZXQgbG9jYWxzKCk6IExvY2FscyB7XG4gICAgcmV0dXJuIG5ldyBMb2NhbHModGhpcy5jb25maWcubG9jYWxzKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcHJvdmlkZU15U2VydmljZU9wdGlvbnMgPSAoY29uZmlnPzogTmd4RWRpdG9yQ29uZmlnKTogTmd4RWRpdG9yU2VydmljZUNvbmZpZyA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9jYWxzOiBjb25maWcubG9jYWxzID8/IHt9XG4gIH07XG59O1xuIl19