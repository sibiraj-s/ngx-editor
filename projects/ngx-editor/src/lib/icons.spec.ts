import { TestBed, ComponentFixture } from '@angular/core/testing';

import { NgxEditorModule } from 'ngx-editor';
import Editor from './Editor';
import { NgxEditorComponent } from './editor.component';

describe('NgxEditorModule', () => {
  let component: NgxEditorComponent;
  let fixture: ComponentFixture<NgxEditorComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        NgxEditorComponent,
      ],
      imports: [
        NgxEditorModule.forRoot({
          icons: {
            bold: '<img src="https://cdn-icons-png.flaticon.com/512/1827/1827924.png" id="iconBold" width="15" height="15" alt="" title="" class="img-small">',
          },
        }),
      ],
    });
    await TestBed.compileComponents();
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
  it('should create the icon correctly', () => {
    const icon = document.getElementsByClassName('img-small');
    expect(icon).toBeTruthy();
  });
});
