import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import Editor from '../../../Editor';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { BubbleComponent } from '../bubble/bubble.component';
import { NgxEditorFloatingMenuComponent } from './floating-menu.component';

describe('NgxEditorFloatingMenuComponent', () => {
  let component: NgxEditorFloatingMenuComponent;
  let fixture: ComponentFixture<NgxEditorFloatingMenuComponent>;
  let componentRef: ComponentRef<NgxEditorFloatingMenuComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NgxEditorFloatingMenuComponent,
        BubbleComponent,
      ],
      providers: [
        SanitizeHtmlPipe,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEditorFloatingMenuComponent);
    const { componentRef: ref, componentInstance: instance } = fixture;
    component = instance;
    componentRef = ref;
    componentRef.setInput('editor', new Editor());
    fixture.detectChanges();
  });

  afterEach(() => {
    component.editor().destroy();
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
