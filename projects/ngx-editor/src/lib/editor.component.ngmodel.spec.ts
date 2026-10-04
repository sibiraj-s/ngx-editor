import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { undo } from 'prosemirror-history';

import Editor from './Editor';
import { NgxEditorComponent } from './editor.component';

describe('NgxEditorComponent: Template Driven Forms API', () => {
  @Component({
    template: `
      <ngx-editor [editor]="editor" [(ngModel)]="content"></ngx-editor>
    `,
    imports: [FormsModule, NgxEditorComponent],
  })
  class TestComponent {
    editor!: Editor;
    content: unknown = 'Hello world!';
    model = viewChild.required(NgModel);
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestComponent, NgxEditorComponent],
    });

    await TestBed.compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.editor = new Editor();
    fixture.detectChanges();
    // ngModel writes the model value asynchronously
    await fixture.whenStable();
  });

  afterEach(() => {
    component.editor.destroy();
  });

  it('should not undo the initial value but allow undoing later values', async () => {
    const { view } = component.editor;
    expect(view.state.doc.textContent).toBe('Hello world!');

    undo(view.state, view.dispatch);
    expect(view.state.doc.textContent).toBe('Hello world!');

    component.content = 'Hey.';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(view.state.doc.textContent).toBe('Hey.');

    undo(view.state, view.dispatch);
    expect(view.state.doc.textContent).toBe('Hello world!');
  });

  describe('control state', () => {
    it('should keep the model pristine and unchanged on load', () => {
      expect(component.editor.view.state.doc.textContent).toBe('Hello world!');
      expect(component.model().pristine).toBe(true);
      expect(component.content).toBe('Hello world!');
    });

    it('should keep the model pristine when the bound value changes', async () => {
      component.content = '<p>Hey</p>';
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.editor.view.state.doc.textContent).toBe('Hey');
      expect(component.model().pristine).toBe(true);
      expect(component.content).toBe('<p>Hey</p>');
    });

    it('should mark the model dirty and update the bound value on edit', async () => {
      component.content = '<p>Hello world!</p>';
      fixture.detectChanges();
      await fixture.whenStable();

      const { view } = component.editor;
      view.dispatch(view.state.tr.insertText('!', view.state.doc.content.size - 1));

      expect(component.model().dirty).toBe(true);
      expect(component.content).toBe('<p>Hello world!!</p>');
    });
  });
});
