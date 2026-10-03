import { Component, ErrorHandler, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeSelection } from 'prosemirror-state';

import Editor from '../../Editor';
import { NgxEditorComponent } from '../../editor.component';
import { ImageViewComponent } from './image-view.component';

describe('ImageComponent', () => {
  let component: ImageViewComponent;
  let fixture: ComponentFixture<ImageViewComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ImageViewComponent],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  imports: [NgxEditorComponent],
  template: '<ngx-editor [editor]="editor" />',
})
class HostComponent {
  editor = new Editor();
}

describe('ImageComponent (zoneless)', () => {
  let fixture: ComponentFixture<HostComponent>;
  let errors: unknown[];

  beforeEach(async () => {
    errors = [];

    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ErrorHandler, useValue: { handleError: (e: unknown) => errors.push(e) } },
      ],
    });

    fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.componentInstance.editor.destroy();
  });

  it('should show the resize handles when the image is selected', async () => {
    const { editor } = fixture.componentInstance;
    const el: HTMLElement = fixture.nativeElement;

    editor.setContent('<p><img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" /></p>');
    await fixture.whenStable();

    expect(el.querySelector('ngx-image-view')).toBeTruthy();
    expect(el.querySelector('.NgxEditor__ResizeHandle')).toBeNull();

    // select the image outside of change detection, like a user click
    const { view } = editor;
    view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, 1)));
    await fixture.whenStable();

    expect(el.querySelector('.NgxEditor__ResizeHandle')).toBeTruthy();
    expect(errors).toEqual([]);
  });
});
