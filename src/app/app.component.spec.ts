import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NgxEditorModule } from './ngx-editor/ngx-editor.module';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxEditorModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h6 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.subtitle').textContent).toContain('A Simple WYSIWYG Editor for Angular Applications.');
  });
});
