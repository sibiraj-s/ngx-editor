import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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
    content = 'Hello world!';
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
});
