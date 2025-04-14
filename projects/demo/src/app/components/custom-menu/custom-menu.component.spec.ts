import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Editor } from 'ngx-editor';

import { AppCustomMenuComponent } from './custom-menu.component';

describe('AppCustomMenuComponent', () => {
  let component: AppCustomMenuComponent;
  let fixture: ComponentFixture<AppCustomMenuComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppCustomMenuComponent,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCustomMenuComponent);
    component = fixture.componentInstance;
    component.editor = new Editor();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
