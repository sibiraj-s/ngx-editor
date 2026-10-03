import { Component, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { undo } from 'prosemirror-history';

import Editor from './Editor';
import { NgxEditorComponent } from './editor.component';

describe('NgxEditorComponent', () => {
  let component: NgxEditorComponent;
  let componentRef: ComponentRef<NgxEditorComponent>;
  let fixture: ComponentFixture<NgxEditorComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NgxEditorComponent],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEditorComponent);
    const { componentRef: ref, componentInstance: instance } = fixture;
    component = instance;
    componentRef = ref;
    componentRef.setInput('editor', new Editor());
    fixture.detectChanges();
  });

  afterEach(() => {
    component.editor().destroy();
  });

  it('should create the editor component correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should render the editor component', () => {
    expect(fixture.debugElement.query(By.css('.NgxEditor'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.ProseMirror'))).toBeTruthy();
  });

  it('should render the placeholder with no content', () => {
    expect(fixture.debugElement.query(By.css('.NgxEditor__Placeholder'))).toBeTruthy();
  });

  it('should disable/enable the component via Froms API', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.ProseMirror[contenteditable=false]'))).toBeTruthy();

    component.setDisabledState(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.ProseMirror[contenteditable=true]'))).toBeTruthy();
  });

  it('should be able to reset the editor with FormsAPI', () => {
    component.writeValue('Hello world!');
    fixture.detectChanges();
    expect(component.editor().view.state.doc.textContent).toBe('Hello world!');

    component.writeValue(null);
    fixture.detectChanges();
    expect(component.editor().view.state.doc.textContent).toBe('');
  });

  it('should not clear initial value on undo', () => {
    component.writeValue('Hello world!');
    fixture.detectChanges();
    expect(component.editor().view.state.doc.textContent).toBe('Hello world!');

    // undo with no user edits should not clear content
    undo(component.editor().view.state, component.editor().view.dispatch);
    fixture.detectChanges();
    expect(component.editor().view.state.doc.textContent).toBe('Hello world!');

    // simulate a user edit by inserting text via a transaction
    const { state } = component.editor().view;
    const tr = state.tr.insertText(' Goodbye!', state.doc.content.size - 1);
    component.editor().view.dispatch(tr);
    fixture.detectChanges();
    expect(component.editor().view.state.doc.textContent).toBe('Hello world! Goodbye!');

    // undo should revert the user edit back to the initial value
    undo(component.editor().view.state, component.editor().view.dispatch);
    fixture.detectChanges();
    expect(component.editor().view.state.doc.textContent).toBe('Hello world!');
  });

  it('should not clear the value written after an initial null on undo', () => {
    // ngModel writes null first and the actual value later
    component.writeValue(null);
    component.writeValue('Hello world!');

    undo(component.editor().view.state, component.editor().view.dispatch);
    expect(component.editor().view.state.doc.textContent).toBe('Hello world!');
  });

  it('should allow undoing values written after the initial value', () => {
    component.writeValue('Initial');
    component.writeValue('Replaced');

    undo(component.editor().view.state, component.editor().view.dispatch);
    expect(component.editor().view.state.doc.textContent).toBe('Initial');
  });

  describe('output format', () => {
    const typeText = (text: string): void => {
      const { view } = component.editor();
      view.dispatch(view.state.tr.insertText(text, view.state.doc.content.size - 1));
    };

    it('should output html when the value is html and no format is given', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);

      component.writeValue('<p>Hello</p>');
      typeText('!');

      expect(onChange).toHaveBeenLastCalledWith('<p>Hello!</p>');
    });

    it('should output a json doc when the value is a json doc and no format is given', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);

      component.writeValue(component.editor().view.state.doc.toJSON());
      typeText('Hello');

      expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'doc' }));
    });

    it('should prefer the given format over the inferred one', () => {
      componentRef.setInput('outputFormat', 'doc');
      fixture.detectChanges();

      const onChange = vi.fn();
      component.registerOnChange(onChange);

      component.writeValue('<p>Hello</p>');
      typeText('!');

      expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'doc' }));
    });
  });
});

describe('NgxEditorComponent: Reactive Forms API', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <ngx-editor [editor]="editor" formControlName="content"></ngx-editor>
      </form>
    `,
    imports: [ReactiveFormsModule, NgxEditorComponent],
  })
  class TestComponent {
    editor!: Editor;

    form = new FormGroup({
      content: new FormControl({ value: 'Hello world!', disabled: false }),
    });

    get doc(): AbstractControl {
      return this.form.get('content');
    }
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TestComponent, NgxEditorComponent],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.editor = new Editor();
    fixture.detectChanges();
  });

  it('should be able to set value via forms API', () => {
    component.form.setValue({ content: 'Hey there!' });
    fixture.detectChanges();
    expect(component.editor.view.state.doc.textContent).toBe('Hey there!');

    component.doc.setValue('Hey.');
    fixture.detectChanges();
    expect(component.editor.view.state.doc.textContent).toBe('Hey.');
  });

  it('should clear editor content with form reset API', () => {
    expect(component.editor.view.state.doc.textContent).toBe('Hello world!');

    component.form.reset();
    fixture.detectChanges();
    expect(component.editor.view.state.doc.textContent).toBe('');

    component.doc.setValue('Hey.');
    fixture.detectChanges();
    expect(component.editor.view.state.doc.textContent).toBe('Hey.');

    component.doc.reset();
    fixture.detectChanges();
    expect(component.editor.view.state.doc.textContent).toBe('');
  });

  it('should not undo the initial value but allow undoing later values', () => {
    const { view } = component.editor;

    undo(view.state, view.dispatch);
    expect(view.state.doc.textContent).toBe('Hello world!');

    component.doc.setValue('Hey.');
    fixture.detectChanges();
    expect(view.state.doc.textContent).toBe('Hey.');

    undo(view.state, view.dispatch);
    expect(view.state.doc.textContent).toBe('Hello world!');
  });
});
