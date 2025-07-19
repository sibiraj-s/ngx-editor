import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SanitizeHtmlPipe } from '../../pipes/sanitize/sanitize-html.pipe';

import Editor from '../../Editor';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ImageComponent } from './image/image.component';
import { LinkComponent } from './link/link.component';
import { NgxEditorMenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { ToggleCommandComponent } from './toggle-command/toggle-command.component';

describe('NgxEditorMenuComponent', () => {
  let component: NgxEditorMenuComponent;
  let fixture: ComponentFixture<NgxEditorMenuComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        SanitizeHtmlPipe,
        NgxEditorMenuComponent,
        ToggleCommandComponent,
        LinkComponent,
        DropdownComponent,
        ImageComponent,
        ColorPickerComponent,
      ],
      providers: [
        MenuService,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEditorMenuComponent);
    component = fixture.componentInstance;
    component.editor = new Editor();
    fixture.detectChanges();
  });

  afterEach(() => {
    component.editor().destroy();
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
