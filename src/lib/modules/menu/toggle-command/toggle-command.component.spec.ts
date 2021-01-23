import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleCommandComponent } from './toggle-command.component';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';

describe('ToggleCommandComponent', () => {
  let component: ToggleCommandComponent;
  let fixture: ComponentFixture<ToggleCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ToggleCommandComponent,
        SanitizeHtmlPipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
