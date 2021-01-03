import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleComponent } from './bubble.component';
import Editor from '../../Editor';

describe('BubbleComponent', () => {
  let component: BubbleComponent;
  let fixture: ComponentFixture<BubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BubbleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleComponent);
    component = fixture.componentInstance;
    component.editor = new Editor();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
