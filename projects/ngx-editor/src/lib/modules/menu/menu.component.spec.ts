import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SanitizeHtmlPipe } from '../../pipes/sanitize/sanitize-html.pipe';

import { MenuComponent } from './menu.component';
import { ToggleCommandComponent } from './toggle-command/toggle-command.component';
import { LinkComponent } from './link/link.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ImageComponent } from './image/image.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import Editor from '../../Editor';
import { MenuService } from './menu.service';

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
        ColorPickerComponent,
      ],
      providers: [MenuService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    component.editor = new Editor();
    fixture.detectChanges();
  });

  afterEach(() => {
    component.editor.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render menubar', () => {
    const compiled: DebugElement = fixture.debugElement;
    expect(compiled.query(By.css('.NgxEditor__MenuBar'))).toBeTruthy();
  });

  it('should position the dropdown correctly', () => {
    const compiled: DebugElement = fixture.debugElement;
    expect(compiled.query(By.css('.NgxEditor__MenuBar.NgxEditor__MenuBar--Reverse'))).toBeFalsy();

    component.dropdownPlacement = 'top';
    fixture.detectChanges();
    expect(compiled.query(By.css('.NgxEditor__MenuBar.NgxEditor__MenuBar--Reverse'))).toBeTruthy();

    component.dropdownPlacement = 'bottom';
    fixture.detectChanges();
    expect(compiled.query(By.css('.NgxEditor__MenuBar.NgxEditor__MenuBar--Reverse'))).toBeFalsy();
  });
});
