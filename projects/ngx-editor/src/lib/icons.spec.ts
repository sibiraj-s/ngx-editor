import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import Editor from './Editor';
import { NgxEditorModule } from './editor.module';
import { NgxEditorService } from './editor.service';
import { NgxEditorMenuComponent } from './modules/menu/menu.component';

describe('NgxEditorModule', () => {
  @Component({
    template: '<ngx-editor-menu [editor]="editor"></ngx-editor-menu>',
    imports: [NgxEditorMenuComponent],
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

describe('NgxEditorModule (default config)', () => {
  it('should render the default icons as svg', () => {
    TestBed.configureTestingModule({
      imports: [NgxEditorModule.forRoot()],
    });

    const service = TestBed.inject(NgxEditorService);
    expect(service.getIcon('bold')).toContain('<svg');
  });
});
