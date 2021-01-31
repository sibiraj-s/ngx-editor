import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgxEditorComponent } from './editor.component';
import { MenuModule } from './modules/menu/menu.module';
// import { BubbleComponent } from './components/bubble/bubble.component';
import Editor from './Editor';

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
        // BubbleComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEditorComponent);
    component = fixture.componentInstance;
    component.editor = new Editor();
    fixture.detectChanges();
  });

  afterEach(() => {
    component.editor.destroy();
  });

  it('should create the editor component correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should render the editor component', () => {
    expect(true).toBeTrue();

    const compiled: DebugElement = fixture.debugElement;
    expect(compiled.query(By.css('.NgxEditor'))).toBeTruthy();
    expect(compiled.query(By.css('.ProseMirror'))).toBeTruthy();
  });

  it('should render the placeholder with no content', () => {
    expect(true).toBeTrue();

    const compiled: DebugElement = fixture.debugElement;
    expect(compiled.query(By.css('.NgxEditor__Placeholder'))).toBeTruthy();
  });
});
