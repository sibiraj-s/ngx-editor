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
    <ng-template #customMenu>
      <button class="custom-item">Custom</button>
      <div class="custom-role-item" role="button" tabindex="0">Custom</div>
    </ng-template>
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
    expect(custom.nextElementSibling).toBe(menubar.lastElementChild);
  });

  describe('keyboard navigation', () => {
    let buttons: HTMLElement[];

    const getFocusable = (): HTMLElement[] => buttons.filter((button) => button.tabIndex === 0);

    const press = (key: string): void => {
      document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    };

    beforeEach(() => {
      const menubar: HTMLElement = fixture.nativeElement.querySelector('.NgxEditor__MenuBar');
      buttons = Array.from(menubar.querySelectorAll('button, [role="button"]'));
    });

    it('should have the toolbar role', () => {
      const menubar: HTMLElement = fixture.nativeElement.querySelector('.NgxEditor__MenuBar');
      expect(menubar.getAttribute('role')).toBe('toolbar');
    });

    it('should only have one item in the tab order', () => {
      expect(getFocusable()).toEqual([buttons[0]]);
    });

    it('should move focus with the arrow keys', () => {
      buttons[0].focus();

      press('ArrowRight');
      expect(document.activeElement).toBe(buttons[1]);
      expect(getFocusable()).toEqual([buttons[1]]);

      press('ArrowLeft');
      expect(document.activeElement).toBe(buttons[0]);

      press('ArrowLeft');
      expect(document.activeElement).toBe(buttons.at(-1));

      press('ArrowRight');
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('should move focus to the first and last item with Home and End', () => {
      buttons[0].focus();

      press('End');
      expect(document.activeElement).toBe(buttons.at(-1));

      press('Home');
      expect(document.activeElement).toBe(buttons[0]);
    });

    it('should include custom menu items with the button role', () => {
      const custom: HTMLElement = fixture.nativeElement.querySelector('.custom-role-item');
      expect(custom.tabIndex).toBe(-1);

      buttons[0].focus();
      press('ArrowLeft');
      expect(document.activeElement).toBe(custom);
      expect(getFocusable()).toEqual([custom]);
    });

    it('should skip disabled custom menu items', () => {
      const custom: HTMLElement = fixture.nativeElement.querySelector('.custom-role-item');
      custom.setAttribute('aria-disabled', 'true');

      buttons[0].focus();
      press('ArrowLeft');
      expect(document.activeElement).toBe(fixture.nativeElement.querySelector('.custom-item'));
    });

    it('should move focus from a custom menu item that was disabled', () => {
      const custom: HTMLElement = fixture.nativeElement.querySelector('.custom-role-item');
      custom.focus();
      custom.setAttribute('aria-disabled', 'true');

      press('ArrowLeft');
      expect(document.activeElement).toBe(fixture.nativeElement.querySelector('.custom-item'));
    });

    it('should skip disabled items', () => {
      // table actions are disabled outside of a table
      const disabled = buttons.find((button) => (button as HTMLButtonElement).disabled);
      expect(disabled).toBeTruthy();

      const index = buttons.indexOf(disabled);
      buttons[index - 1].focus();

      press('ArrowRight');
      expect(document.activeElement).toBe(buttons[index + 1]);
    });
  });
});
