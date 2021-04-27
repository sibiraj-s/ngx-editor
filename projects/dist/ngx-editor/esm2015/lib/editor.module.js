import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorComponent } from './editor.component';
import { NgxEditorService, NgxEditorServiceConfig, provideMyServiceOptions } from './editor.service';
import { MenuModule } from './modules/menu/menu.module';
import { MenuComponent } from './modules/menu/menu.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { FloatingMenuComponent } from './modules/menu/floating-menu/floating-menu.component';
import * as i0 from "@angular/core";
const NGX_EDITOR_CONFIG_TOKEN = new InjectionToken('NgxEditorConfig');
export class NgxEditorModule {
    static forRoot(config) {
        return {
            ngModule: NgxEditorModule,
            providers: [
                {
                    provide: NGX_EDITOR_CONFIG_TOKEN,
                    useValue: config
                },
                {
                    provide: NgxEditorServiceConfig,
                    useFactory: provideMyServiceOptions,
                    deps: [NGX_EDITOR_CONFIG_TOKEN]
                }
            ]
        };
    }
    static forChild(config) {
        return {
            ngModule: NgxEditorModule,
            providers: [
                {
                    provide: NGX_EDITOR_CONFIG_TOKEN,
                    useValue: config
                },
                {
                    provide: NgxEditorServiceConfig,
                    useFactory: provideMyServiceOptions,
                    deps: [NGX_EDITOR_CONFIG_TOKEN]
                },
                NgxEditorService,
            ]
        };
    }
}
NgxEditorModule.ɵfac = function NgxEditorModule_Factory(t) { return new (t || NgxEditorModule)(); };
NgxEditorModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxEditorModule });
NgxEditorModule.ɵinj = i0.ɵɵdefineInjector({ providers: [], imports: [[
            CommonModule,
            MenuModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxEditorModule, { declarations: [NgxEditorComponent,
        ImageViewComponent], imports: [CommonModule,
        MenuModule], exports: [NgxEditorComponent,
        MenuComponent,
        FloatingMenuComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxEditorModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    MenuModule,
                ],
                providers: [],
                declarations: [
                    NgxEditorComponent,
                    ImageViewComponent
                ],
                exports: [
                    NgxEditorComponent,
                    MenuComponent,
                    FloatingMenuComponent
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25neC1lZGl0b3Ivc3JjL2xpYi9lZGl0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFJL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHNCQUFzQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXhELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQzs7QUFFN0YsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLGNBQWMsQ0FBa0IsaUJBQWlCLENBQUMsQ0FBQztBQW1CdkYsTUFBTSxPQUFPLGVBQWU7SUFDMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUF1QjtRQUVwQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSx1QkFBdUI7b0JBQ2hDLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixVQUFVLEVBQUUsdUJBQXVCO29CQUNuQyxJQUFJLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDaEM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUF1QjtRQUNyQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSx1QkFBdUI7b0JBQ2hDLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixVQUFVLEVBQUUsdUJBQXVCO29CQUNuQyxJQUFJLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDaEM7Z0JBQ0QsZ0JBQWdCO2FBQ2pCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzhFQW5DVSxlQUFlO21EQUFmLGVBQWU7d0RBWmYsRUFBRSxZQUpKO1lBQ1AsWUFBWTtZQUNaLFVBQVU7U0FDWDt3RkFhVSxlQUFlLG1CQVZ4QixrQkFBa0I7UUFDbEIsa0JBQWtCLGFBTmxCLFlBQVk7UUFDWixVQUFVLGFBUVYsa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixxQkFBcUI7dUZBSVosZUFBZTtjQWpCM0IsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFVBQVU7aUJBQ1g7Z0JBQ0QsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFO29CQUNaLGtCQUFrQjtvQkFDbEIsa0JBQWtCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asa0JBQWtCO29CQUNsQixhQUFhO29CQUNiLHFCQUFxQjtpQkFDdEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTmd4RWRpdG9yQ29uZmlnIH0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCB7IE5neEVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hFZGl0b3JTZXJ2aWNlLCBOZ3hFZGl0b3JTZXJ2aWNlQ29uZmlnLCBwcm92aWRlTXlTZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4vZWRpdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVudU1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9tZW51L21lbnUubW9kdWxlJztcblxuaW1wb3J0IHsgTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbW9kdWxlcy9tZW51L21lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9pbWFnZS12aWV3L2ltYWdlLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IEZsb2F0aW5nTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbW9kdWxlcy9tZW51L2Zsb2F0aW5nLW1lbnUvZmxvYXRpbmctbWVudS5jb21wb25lbnQnO1xuXG5jb25zdCBOR1hfRURJVE9SX0NPTkZJR19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxOZ3hFZGl0b3JDb25maWc+KCdOZ3hFZGl0b3JDb25maWcnKTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNZW51TW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ3hFZGl0b3JDb21wb25lbnQsXG4gICAgSW1hZ2VWaWV3Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ3hFZGl0b3JDb21wb25lbnQsXG4gICAgTWVudUNvbXBvbmVudCxcbiAgICBGbG9hdGluZ01lbnVDb21wb25lbnRcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIE5neEVkaXRvck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogTmd4RWRpdG9yQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ3hFZGl0b3JNb2R1bGU+IHtcblxuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4RWRpdG9yTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOR1hfRURJVE9SX0NPTkZJR19UT0tFTixcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOZ3hFZGl0b3JTZXJ2aWNlQ29uZmlnLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IHByb3ZpZGVNeVNlcnZpY2VPcHRpb25zLFxuICAgICAgICAgIGRlcHM6IFtOR1hfRURJVE9SX0NPTkZJR19UT0tFTl1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoY29uZmlnOiBOZ3hFZGl0b3JDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5neEVkaXRvck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4RWRpdG9yTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOR1hfRURJVE9SX0NPTkZJR19UT0tFTixcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOZ3hFZGl0b3JTZXJ2aWNlQ29uZmlnLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IHByb3ZpZGVNeVNlcnZpY2VPcHRpb25zLFxuICAgICAgICAgIGRlcHM6IFtOR1hfRURJVE9SX0NPTkZJR19UT0tFTl1cbiAgICAgICAgfSxcbiAgICAgICAgTmd4RWRpdG9yU2VydmljZSxcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=