import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu.component';
import { ToggleCommandComponent } from './toggle-command/toggle-command.component';
import { LinkComponent } from './link/link.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ImageComponent } from './image/image.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';
import { BubbleComponent } from './bubble/bubble.component';
import { SanitizeHtmlPipe } from '../../pipes/sanitize/sanitize-html.pipe';
import * as i0 from "@angular/core";
export class MenuModule {
}
MenuModule.ɵfac = function MenuModule_Factory(t) { return new (t || MenuModule)(); };
MenuModule.ɵmod = i0.ɵɵdefineNgModule({ type: MenuModule });
MenuModule.ɵinj = i0.ɵɵdefineInjector({ providers: [
        SanitizeHtmlPipe,
    ], imports: [[
            CommonModule,
            ReactiveFormsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MenuModule, { declarations: [
        // pipes
        SanitizeHtmlPipe,
        // components
        MenuComponent,
        ToggleCommandComponent,
        LinkComponent,
        DropdownComponent,
        ImageComponent,
        ColorPickerComponent,
        FloatingMenuComponent,
        BubbleComponent], imports: [CommonModule,
        ReactiveFormsModule], exports: [MenuComponent,
        FloatingMenuComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MenuModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule
                ],
                declarations: [
                    // pipes
                    SanitizeHtmlPipe,
                    // components
                    MenuComponent,
                    ToggleCommandComponent,
                    LinkComponent,
                    DropdownComponent,
                    ImageComponent,
                    ColorPickerComponent,
                    FloatingMenuComponent,
                    BubbleComponent
                ],
                providers: [
                    SanitizeHtmlPipe,
                ],
                exports: [
                    MenuComponent,
                    FloatingMenuComponent
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NyYy9saWIvbW9kdWxlcy9tZW51L21lbnUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUErQjNFLE1BQU0sT0FBTyxVQUFVOztvRUFBVixVQUFVOzhDQUFWLFVBQVU7bURBVFY7UUFDVCxnQkFBZ0I7S0FDakIsWUFyQlE7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1NBQ3BCO3dGQXlCVSxVQUFVO1FBdkJuQixRQUFRO1FBQ1IsZ0JBQWdCO1FBRWhCLGFBQWE7UUFDYixhQUFhO1FBQ2Isc0JBQXNCO1FBQ3RCLGFBQWE7UUFDYixpQkFBaUI7UUFDakIsY0FBYztRQUNkLG9CQUFvQjtRQUVwQixxQkFBcUI7UUFDckIsZUFBZSxhQWhCZixZQUFZO1FBQ1osbUJBQW1CLGFBcUJuQixhQUFhO1FBQ2IscUJBQXFCO3VGQUlaLFVBQVU7Y0E3QnRCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixtQkFBbUI7aUJBQ3BCO2dCQUNELFlBQVksRUFBRTtvQkFDWixRQUFRO29CQUNSLGdCQUFnQjtvQkFFaEIsYUFBYTtvQkFDYixhQUFhO29CQUNiLHNCQUFzQjtvQkFDdEIsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUVwQixxQkFBcUI7b0JBQ3JCLGVBQWU7aUJBQ2hCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxnQkFBZ0I7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxhQUFhO29CQUNiLHFCQUFxQjtpQkFDdEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9nZ2xlQ29tbWFuZENvbXBvbmVudCB9IGZyb20gJy4vdG9nZ2xlLWNvbW1hbmQvdG9nZ2xlLWNvbW1hbmQuY29tcG9uZW50JztcbmltcG9ydCB7IExpbmtDb21wb25lbnQgfSBmcm9tICcuL2xpbmsvbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2UvaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXIvY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbG9hdGluZ01lbnVDb21wb25lbnQgfSBmcm9tICcuL2Zsb2F0aW5nLW1lbnUvZmxvYXRpbmctbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnViYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9idWJibGUvYnViYmxlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFNhbml0aXplSHRtbFBpcGUgfSBmcm9tICcuLi8uLi9waXBlcy9zYW5pdGl6ZS9zYW5pdGl6ZS1odG1sLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLy8gcGlwZXNcbiAgICBTYW5pdGl6ZUh0bWxQaXBlLFxuXG4gICAgLy8gY29tcG9uZW50c1xuICAgIE1lbnVDb21wb25lbnQsXG4gICAgVG9nZ2xlQ29tbWFuZENvbXBvbmVudCxcbiAgICBMaW5rQ29tcG9uZW50LFxuICAgIERyb3Bkb3duQ29tcG9uZW50LFxuICAgIEltYWdlQ29tcG9uZW50LFxuICAgIENvbG9yUGlja2VyQ29tcG9uZW50LFxuXG4gICAgRmxvYXRpbmdNZW51Q29tcG9uZW50LFxuICAgIEJ1YmJsZUNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTYW5pdGl6ZUh0bWxQaXBlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWVudUNvbXBvbmVudCxcbiAgICBGbG9hdGluZ01lbnVDb21wb25lbnRcbiAgXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBNZW51TW9kdWxlIHsgfVxuIl19