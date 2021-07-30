import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalRuleComponent } from './horizontal-rule.component';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { MenuService } from '../menu.service';
import Editor from '../../../Editor';

describe('HorizontalRuleComponent', () => {
  let component: HorizontalRuleComponent;
  let fixture: ComponentFixture<HorizontalRuleComponent>;
  let menuService: MenuService;
  let editor: Editor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HorizontalRuleComponent,
        SanitizeHtmlPipe
      ],
      providers: [MenuService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalRuleComponent);
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
