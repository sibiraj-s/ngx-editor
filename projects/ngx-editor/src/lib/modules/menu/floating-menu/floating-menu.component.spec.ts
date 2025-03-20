import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import Editor from '../../../Editor';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { BubbleComponent } from '../bubble/bubble.component';
import { NgxFloatingMenuComponent } from './floating-menu.component';

describe('NgxFloatingMenuComponent', () => {
  let component: NgxFloatingMenuComponent;
  let fixture: ComponentFixture<NgxFloatingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxFloatingMenuComponent, BubbleComponent],
      providers: [SanitizeHtmlPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFloatingMenuComponent);
    component = fixture.componentInstance;
    component.editor = new Editor();
    fixture.detectChanges();
  });

  afterEach(() => {
    component.editor.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render bubble menu by default', () => {
    expect(component).toBeTruthy();

    const compiled: DebugElement = fixture.debugElement;
    expect(compiled.query(By.css('.NgxBubbleMenu__Icon'))).toBeTruthy();
  });
});
