import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRef } from '@angular/core';
import { NgxGrippieComponent } from './ngx-grippie.component';
import { NgxEditorComponent } from '../ngx-editor.component';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

describe('NgxGrippieComponent', () => {
  let component: NgxGrippieComponent;
  let fixture: ComponentFixture<NgxGrippieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxGrippieComponent],
      providers: [NgxEditorComponent,
        { provide: ElementRef, useClass: MockElementRef }]
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
