import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEditorComponent } from './ngx-editor.component';
import { NgxGrippieComponent } from './ngx-grippie/ngx-grippie.component';
import { NgxToolbarComponent } from './ngx-toolbar/ngx-toolbar.component';
import { NgxEditorMessageComponent } from './ngx-editor-message/ngx-editor-message.component';
import { MessageService } from './common/services/message.service';
import { CommandExecutorService } from './common/services/command-executor.service';

describe('NgxEditorComponent', () => {
  let component: NgxEditorComponent;
  let fixture: ComponentFixture<NgxEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, CommandExecutorService],
      declarations: [NgxEditorComponent,
        NgxGrippieComponent,
        NgxToolbarComponent,
        NgxEditorMessageComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
