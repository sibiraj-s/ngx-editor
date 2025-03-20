import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxEditorModule, NgxMenuComponent } from 'ngx-editor';
import Editor from './Editor';

describe('NgxEditorModule', () => {
  @Component({
    template: '<ngx-editor-menu [editor]="editor"></ngx-editor-menu>',
    imports: [NgxMenuComponent],
  })
  class TestComponent {
    editor!: Editor;
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NgxEditorModule.forRoot({
          icons: {
            bold: '<img src="https://example.com/bold.png">',
          },
        }),
        TestComponent,
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
