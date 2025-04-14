import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponent } from './link.component';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { MenuService } from '../menu.service';
import Editor from '../../../Editor';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let menuService: MenuService;
  let editor: Editor;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        LinkComponent,
        SanitizeHtmlPipe,
      ],
      providers: [
        MenuService,
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;

    menuService = fixture.debugElement.injector.get(MenuService);

    editor = new Editor();
    menuService.editor = editor;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
