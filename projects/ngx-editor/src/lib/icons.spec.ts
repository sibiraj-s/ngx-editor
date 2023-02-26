import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxEditorModule } from 'ngx-editor';
import Editor from './Editor';

describe('NgxEditorModule', () => {
  @Component({
    template: '<ngx-editor-menu [editor]="editor"></ngx-editor-menu>',
  })
  class TestComponent {
    editor!: Editor;
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
      ],
      imports: [
        NgxEditorModule.forRoot({
          icons: {
            bold: '<img src="https://example.com/bold.png">',
          },
        }),
      ],
    });
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
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

  it('should create the icon correctly', () => {
    const element = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    expect(element.src).toBe('https://example.com/bold.png');
  });
});
