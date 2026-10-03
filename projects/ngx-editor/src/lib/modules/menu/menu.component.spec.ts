import { Component, ComponentRef, DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TextSelection } from 'prosemirror-state';

import { SanitizeHtmlPipe } from '../../pipes/sanitize/sanitize-html.pipe';

import Editor from '../../Editor';
import { NgxEditorComponent } from '../../editor.component';
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
  let componentRef: ComponentRef<NgxEditorMenuComponent>;

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
    const { componentRef: ref, componentInstance: instance } = fixture;
    component = instance;
    componentRef = ref;
    componentRef.setInput('editor', new Editor());
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

    componentRef.setInput('dropdownPlacement', 'top');
    fixture.detectChanges();
    expect(compiled.query(By.css('.NgxEditor__MenuBar.NgxEditor__MenuBar--Reverse'))).toBeTruthy();

    componentRef.setInput('dropdownPlacement', 'bottom');
    fixture.detectChanges();
    expect(compiled.query(By.css('.NgxEditor__MenuBar.NgxEditor__MenuBar--Reverse'))).toBeFalsy();
  });
});

@Component({
  imports: [NgxEditorMenuComponent, NgxEditorComponent],
  template: `
    <ngx-editor-menu [editor]="editor" [customMenuRef]="customMenu" />
    <ngx-editor [editor]="editor" />
    <ng-template #customMenu><button class="custom-item">Custom</button></ng-template>
  `,
})
class HostComponent {
  editor = new Editor();
}

describe('NgxEditorMenuComponent (zoneless)', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.componentInstance.editor.destroy();
  });

  it('should update the active state when the selection changes', async () => {
    const { editor } = fixture.componentInstance;
    const el: HTMLElement = fixture.nativeElement;

    editor.setContent('<p><strong>Bold</strong> text</p>');
    await fixture.whenStable();

    const bold = el.querySelector('button[title="Bold"]');

    // move the cursor outside of change detection, like a user click
    const { view } = editor;
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, 3)));
    await fixture.whenStable();
    expect(bold.classList.contains('NgxEditor__MenuItem--Active')).toBe(true);

    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, 8)));
    await fixture.whenStable();
    expect(bold.classList.contains('NgxEditor__MenuItem--Active')).toBe(false);
  });

  it('should render the custom menu template after the toolbar items', () => {
    const menubar: HTMLElement = fixture.nativeElement.querySelector('.NgxEditor__MenuBar');
    const custom = menubar.querySelector('.custom-item');

    expect(custom).toBeTruthy();
    expect(menubar.lastElementChild).toBe(custom);
  });
});
