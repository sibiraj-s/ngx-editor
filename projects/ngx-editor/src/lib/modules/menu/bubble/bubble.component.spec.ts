import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleComponent } from './bubble.component';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import Editor from '../../../Editor';

describe('BubbleComponent', () => {
  let component: BubbleComponent;
  let fixture: ComponentFixture<BubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BubbleComponent],
      providers: [SanitizeHtmlPipe],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleComponent);
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
});
