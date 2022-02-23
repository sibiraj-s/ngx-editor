import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxEditorModule } from 'ngx-editor';

import { AppComponent } from './app.component';
import { CustomMenuComponent } from './components/custom-menu/custom-menu.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxEditorModule,
      ],
      declarations: [
        AppComponent,
        CustomMenuComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render editor', () => {
    const compiled: DebugElement = fixture.debugElement;
    expect(compiled.query(By.css('.NgxEditor'))).toBeTruthy();
    expect(compiled.query(By.css('.ProseMirror'))).toBeTruthy();
  });

  it('should render menubar', () => {
    const compiled: DebugElement = fixture.debugElement;
    expect(compiled.query(By.css('.NgxEditor__MenuBar'))).toBeTruthy();
  });
});
