import { ComponentFixture, TestBed } from '@angular/core/testing';

import Editor from '../../../Editor';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { MenuService } from '../menu.service';
import { InsertCommandComponent } from './insert-command.component';

describe('InsertCommandComponent', () => {
  let component: InsertCommandComponent;
  let fixture: ComponentFixture<InsertCommandComponent>;
  let menuService: MenuService;
  let editor: Editor;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        InsertCommandComponent,
        SanitizeHtmlPipe,
      ],
      providers: [
        MenuService,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCommandComponent);
    component = fixture.componentInstance;
    menuService = fixture.debugElement.injector.get(MenuService);

    editor = new Editor();
    menuService.editor = editor;

    fixture.detectChanges();
  });

  afterEach(() => {
    editor.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
