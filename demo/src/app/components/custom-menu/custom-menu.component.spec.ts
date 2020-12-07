import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { schema } from 'ngx-editor';

import { CustomMenuComponent } from './custom-menu.component';

describe('CustomMenuComponent', () => {
  let component: CustomMenuComponent;
  let fixture: ComponentFixture<CustomMenuComponent>;
  let view: EditorView;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomMenuComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMenuComponent);
    component = fixture.componentInstance;

    view = new EditorView(document.createElement('div'), {
      state: EditorState.create({
        doc: null,
        schema,
      })
    });

    component.editorView = view;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
