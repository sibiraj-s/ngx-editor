import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanitizeHtmlPipe } from '../../pipes/sanitize/sanitize-html.pipe';

import { MenuComponent } from './menu.component';
import { ToggleCommandComponent } from './toggle-command/toggle-command.component';
import { LinkComponent } from './link/link.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ImageComponent } from './image/image.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import Editor from '../../Editor';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SanitizeHtmlPipe,

        MenuComponent,
        ToggleCommandComponent,
        LinkComponent,
        DropdownComponent,
        ImageComponent,
        ColorPickerComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    component.editor = new Editor();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
