import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { MenuService } from '../menu.service';
import Editor from '../../../Editor';
import { ComponentRef } from '@angular/core';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let componentRef: ComponentRef<DropdownComponent>;
  let menuService: MenuService;
  let editor: Editor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
      providers: [MenuService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    const { componentRef: ref, componentInstance: instance } = fixture;
    component = instance;
    componentRef = ref;
    menuService = fixture.debugElement.injector.get(MenuService);

    editor = new Editor();
    menuService.editor = editor;

    componentRef.setInput('group', 'heading');
    componentRef.setInput('items', ['h1', 'h2']);

    fixture.detectChanges();
  });

  afterEach(() => {
    editor.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch a heading back to a paragraph', () => {
    editor.setContent('<h1>Hello</h1>');
    componentRef.setInput('items', ['paragraph', 'h1', 'h2']);
    fixture.detectChanges();

    expect(component.activeItem).toBe('h1');

    component.selectItem('paragraph');

    expect(editor.view.state.doc.firstChild.type.name).toBe('paragraph');
    expect(component.activeItem).toBe('paragraph');
  });
});
