import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorToolbarComponent } from './ngx-editor-toolbar.component';
import { ngxEditorConfig } from '../common/ngx-editor.defaults';
import { PopoverModule } from 'ngx-bootstrap';
import { CommandExecutorService } from '../common/services/command-executor.service';
import { MessageService } from '../common/services/message.service';

describe('NgxEditorToolbarComponent', () => {
  let component: NgxEditorToolbarComponent;
  let fixture: ComponentFixture<NgxEditorToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, PopoverModule.forRoot(), HttpClientModule],
      declarations: [NgxEditorToolbarComponent],
      providers: [CommandExecutorService, MessageService]
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
