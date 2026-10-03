import { Component, ViewEncapsulation, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import Editor from '../../Editor';
import { NgxEditorComponent } from '../../editor.component';
import { NgxEditorMenuComponent } from './menu.component';

@Component({
  imports: [NgxEditorMenuComponent, NgxEditorComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <ngx-editor-menu [editor]="editor" />
    <ngx-editor [editor]="editor" />
  `,
})
class ShadowHostComponent {
  editor = new Editor();
}

describe('NgxEditorMenuComponent (shadow dom)', () => {
  let fixture: ComponentFixture<ShadowHostComponent>;
  let root: ShadowRoot;

  const mousedown = (target: EventTarget): void => {
    target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true }));
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
    fixture.componentInstance.editor.destroy();
    fixture.nativeElement.remove();
  });

  it('should keep the link popup open when clicking inside it', async () => {
    mousedown(root.querySelector('ngx-link button'));
    await fixture.whenStable();

    const input = root.querySelector('ngx-link .NgxEditor__Popup input');
    expect(input).toBeTruthy();

    mousedown(input);
    await fixture.whenStable();
    expect(root.querySelector('ngx-link .NgxEditor__Popup')).toBeTruthy();

    mousedown(document.body);
    await fixture.whenStable();
    expect(root.querySelector('ngx-link .NgxEditor__Popup')).toBeFalsy();
  });
});
