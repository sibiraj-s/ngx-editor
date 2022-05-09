import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FloatingMenuComponent } from './floating-menu.component';
import { BubbleComponent } from '../bubble/bubble.component';
import Editor from '../../../Editor';

describe('FloatingMenuComponent', () => {
  let component: FloatingMenuComponent;
  let fixture: ComponentFixture<FloatingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FloatingMenuComponent,
        BubbleComponent,
      ],
      providers: [
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingMenuComponent);
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

  it('should render bubble menu by defaault', () => {
    expect(component).toBeTruthy();

    const compiled: DebugElement = fixture.debugElement;
    expect(compiled.query(By.css('.NgxBubbleMenu__Icon'))).toBeTruthy();
  });
});
