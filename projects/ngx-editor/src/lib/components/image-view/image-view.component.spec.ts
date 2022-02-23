import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewComponent } from './image-view.component';

describe('ImageComponent', () => {
  let component: ImageViewComponent;
  let fixture: ComponentFixture<ImageViewComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ImageViewComponent],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
