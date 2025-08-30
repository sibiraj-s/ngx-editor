import { Component, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

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
});
