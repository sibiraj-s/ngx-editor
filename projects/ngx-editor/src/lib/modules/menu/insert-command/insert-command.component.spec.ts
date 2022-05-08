import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCommandComponent } from './insert-command.component';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { MenuService } from '../menu.service';
import Editor from '../../../Editor';

describe('InsertCommandComponent', () => {
  let component: InsertCommandComponent;
  let fixture: ComponentFixture<InsertCommandComponent>;
  let menuService: MenuService;
  let editor: Editor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InsertCommandComponent,
        SanitizeHtmlPipe,
      ],
      providers: [MenuService],
    })
      .compileComponents();
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
