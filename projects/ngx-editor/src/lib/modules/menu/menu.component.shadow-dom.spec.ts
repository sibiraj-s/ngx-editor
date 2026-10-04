import { Component, ViewEncapsulation, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import Editor from '../../Editor';
import { NgxEditorComponent } from '../../editor.component';
import { NgxEditorFloatingMenuComponent } from './floating-menu/floating-menu.component';
import { NgxEditorMenuComponent } from './menu.component';

@Component({
  imports: [NgxEditorMenuComponent, NgxEditorComponent, NgxEditorFloatingMenuComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <ngx-editor-menu [editor]="editor" />
    <ngx-editor [editor]="editor">
      <ngx-editor-floating-menu [editor]="editor">
        <div class="custom-tools"></div>
      </ngx-editor-floating-menu>
    </ngx-editor>
  `,
})
class ShadowHostComponent {
  editor = new Editor();
}

describe('NgxEditorMenuComponent (shadow dom)', () => {
  let fixture: ComponentFixture<ShadowHostComponent>;
  let root: ShadowRoot;

  const mousedown = (target: EventTarget): MouseEvent => {
    const event = new MouseEvent('mousedown', { bubbles: true, composed: true, cancelable: true });
    target.dispatchEvent(event);
    return event;
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ShadowHostComponent],
      providers: [provideZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(ShadowHostComponent);
    document.body.appendChild(fixture.nativeElement);
    await fixture.whenStable();
    root = fixture.nativeElement.shadowRoot;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fixture.componentInstance.editor.destroy();
    fixture.nativeElement.remove();
  });

  const spyOnMousedownListeners = () => {
    const add = vi.spyOn(document, 'addEventListener');
    const remove = vi.spyOn(document, 'removeEventListener');
    const calls = (spy: typeof add) => spy.mock.calls.filter(([type]) => type === 'mousedown');

    return { added: () => calls(add), removed: () => calls(remove) };
  };

  const popups = [
    { name: 'link', toggle: 'ngx-link button', popup: 'ngx-link .NgxEditor__Popup' },
    { name: 'image', toggle: 'ngx-image button', popup: 'ngx-image .NgxEditor__Popup' },
    { name: 'table', toggle: 'ngx-table button', popup: 'ngx-table .NgxEditor__Popup' },
    { name: 'color picker', toggle: 'ngx-color-picker button', popup: 'ngx-color-picker .NgxEditor__Popup' },
    { name: 'dropdown', toggle: 'ngx-dropdown button', popup: 'ngx-dropdown .NgxEditor__Dropdown--DropdownMenu' },
  ];

  popups.forEach(({ name, toggle, popup }) => {
    it(`should keep the ${name} popup open when clicking inside it`, async () => {
      mousedown(root.querySelector(toggle));
      await fixture.whenStable();

      const el = root.querySelector(popup);
      expect(el).toBeTruthy();

      mousedown(el);
      await fixture.whenStable();
      expect(root.querySelector(popup)).toBeTruthy();

      mousedown(document.body);
      await fixture.whenStable();
      expect(root.querySelector(popup)).toBeFalsy();
    });

    it(`should only listen for document clicks while the ${name} popup is open`, async () => {
      const listeners = spyOnMousedownListeners();

      mousedown(root.querySelector(toggle));
      await fixture.whenStable();
      expect(listeners.added()).toHaveLength(1);

      mousedown(document.body);
      await fixture.whenStable();
      expect(listeners.removed()).toHaveLength(1);
      expect(listeners.removed()[0][1]).toBe(listeners.added()[0][1]);
    });

    it(`should stop listening for document clicks when destroyed with the ${name} popup open`, async () => {
      const listeners = spyOnMousedownListeners();

      mousedown(root.querySelector(toggle));
      await fixture.whenStable();
      expect(listeners.added()).toHaveLength(1);

      fixture.destroy();
      expect(listeners.removed().map(([, listener]) => listener)).toContain(listeners.added()[0][1]);
    });
  });

  it('should keep the selection when clicking a floating menu item inside a nested shadow root', () => {
    const tools = root.querySelector('.custom-tools');
    const button = document.createElement('button');
    tools.attachShadow({ mode: 'open' }).appendChild(button);

    expect(mousedown(button).defaultPrevented).toBe(true);
    expect(mousedown(document.body).defaultPrevented).toBe(false);
  });
});
