import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCommandComponent } from './simple-command.component';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';

describe('SimpleCommandComponent', () => {
  let component: SimpleCommandComponent;
  let fixture: ComponentFixture<SimpleCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SimpleCommandComponent,
        SanitizeHtmlPipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
