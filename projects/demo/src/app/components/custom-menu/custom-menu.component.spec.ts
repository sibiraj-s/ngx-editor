import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Editor } from 'ngx-editor';

import { CustomMenuComponent } from './custom-menu.component';

describe('CustomMenuComponent', () => {
  let component: CustomMenuComponent;
  let fixture: ComponentFixture<CustomMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomMenuComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMenuComponent);
    component = fixture.componentInstance;
    component.editor = new Editor();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
