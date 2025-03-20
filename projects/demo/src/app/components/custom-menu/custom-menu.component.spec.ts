import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Editor } from 'ngx-editor';

import { NgxCustomMenuComponent } from './custom-menu.component';

describe('NgxCustomMenuComponent', () => {
  let component: NgxCustomMenuComponent;
  let fixture: ComponentFixture<NgxCustomMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCustomMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCustomMenuComponent);
    component = fixture.componentInstance;
    component.editor = new Editor();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
