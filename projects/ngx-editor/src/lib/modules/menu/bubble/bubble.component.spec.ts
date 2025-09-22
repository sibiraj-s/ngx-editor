import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleComponent } from './bubble.component';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import Editor from '../../../Editor';
import { ComponentRef } from '@angular/core';

describe('BubbleComponent', () => {
  let component: BubbleComponent;
  let fixture: ComponentFixture<BubbleComponent>;
  let componentRef: ComponentRef<BubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleComponent],
      providers: [SanitizeHtmlPipe],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleComponent);
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
});
