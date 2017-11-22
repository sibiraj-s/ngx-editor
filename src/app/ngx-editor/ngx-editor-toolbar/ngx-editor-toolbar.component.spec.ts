import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEditorToolbarComponent } from './ngx-editor-toolbar.component';
import { ngxEditorConfig } from '../common/ngx-editor.defaults';

describe('NgxEditorToolbarComponent', () => {
  let component: NgxEditorToolbarComponent;
  let fixture: ComponentFixture<NgxEditorToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxEditorToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEditorToolbarComponent);
    component = fixture.componentInstance;
    component.config = ngxEditorConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
