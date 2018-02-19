import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorComponent } from './ngx-editor.component';
import { NgxGrippieComponent } from './ngx-grippie/ngx-grippie.component';
import { NgxEditorToolbarComponent } from './ngx-editor-toolbar/ngx-editor-toolbar.component';
import { NgxEditorMessageComponent } from './ngx-editor-message/ngx-editor-message.component';
import { PopoverModule } from 'ngx-bootstrap';
import { MessageService } from './common/services/message.service';
import { CommandExecutorService } from './common/services/command-executor.service';

describe('NgxEditorComponent', () => {
  let component: NgxEditorComponent;
  let fixture: ComponentFixture<NgxEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, PopoverModule.forRoot(), HttpClientModule],
      providers: [MessageService, CommandExecutorService],
      declarations: [NgxEditorComponent,
        NgxGrippieComponent,
        NgxEditorToolbarComponent,
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
