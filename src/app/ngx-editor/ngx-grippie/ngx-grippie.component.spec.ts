import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef, Renderer2 } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxGrippieComponent } from './ngx-grippie.component';
import { NgxEditorComponent } from '../ngx-editor.component';
import { MessageService } from '../common/services/message.service';
import { CommandExecutorService } from '../common/services/command-executor.service';

describe('NgxGrippieComponent', () => {
  let component: NgxGrippieComponent;
  let fixture: ComponentFixture<NgxGrippieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [NgxGrippieComponent],
      providers: [
        NgxEditorComponent,
        MessageService,
        CommandExecutorService,
        { provide: ElementRef, useValue: this.elementRef },
        { provide: Renderer2, useValue: this.renderer }
      ]
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
