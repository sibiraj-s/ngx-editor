import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEditorMessageComponent } from './ngx-editor-message.component';
import { MessageService } from '../common/services/message.service';

describe('NgxEditorMessageComponent', () => {
  let component: NgxEditorMessageComponent;
  let fixture: ComponentFixture<NgxEditorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
      declarations: [NgxEditorMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEditorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
