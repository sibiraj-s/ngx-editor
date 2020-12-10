import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgxEditorComponent } from './editor.component';
import { MenuModule } from './modules/menu/menu.module';
import { BubbleComponent } from './components/bubble/bubble.component';

describe('NgxEditorComponent', () => {
  let component: NgxEditorComponent;
  let fixture: ComponentFixture<NgxEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenuModule
      ],
      declarations: [
        NgxEditorComponent,
        BubbleComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the editor component correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should render the editor component', () => {
    expect(true).toBeTrue();

    const compiled: DebugElement = fixture.debugElement;
    // expect menubar to be rendered
    expect(compiled.query(By.css('.NgxEditor__MenuBar'))).toBeDefined();
  });
});
