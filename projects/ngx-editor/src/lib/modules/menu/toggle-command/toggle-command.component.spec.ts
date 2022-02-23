import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleCommandComponent } from './toggle-command.component';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { MenuService } from '../menu.service';
import Editor from '../../../Editor';

describe('ToggleCommandComponent', () => {
  let component: ToggleCommandComponent;
  let fixture: ComponentFixture<ToggleCommandComponent>;
  let menuService: MenuService;
  let editor: Editor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ToggleCommandComponent,
        SanitizeHtmlPipe,
      ],
      providers: [MenuService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleCommandComponent);
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
