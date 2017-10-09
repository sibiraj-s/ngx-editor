import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxGrippieComponent } from './ngx-grippie.component';
import { NgxEditorComponent } from '../ngx-editor.component';

describe('NgxGrippieComponent', () => {
  let component: NgxGrippieComponent;
  let fixture: ComponentFixture<NgxGrippieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxGrippieComponent],
      providers: [NgxEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGrippieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
