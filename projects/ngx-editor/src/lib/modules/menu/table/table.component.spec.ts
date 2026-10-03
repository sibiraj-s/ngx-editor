import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Node as ProseMirrorNode, Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

import { TableComponent } from './table.component';
import { MenuService } from '../../../modules/menu/menu.service';
import Editor from '../../../Editor';
import { Table } from '../MenuCommands';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let menuService: MenuService;
  let editor: Editor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
      providers: [MenuService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
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

  it('should insert a table with a header row and the given rows and columns', () => {
    const { view } = editor;
    expect(Table.insert(2, 3)(view.state, view.dispatch)).toBe(true);

    let table: ProseMirrorNode;
    view.state.doc.descendants((node) => {
      if (node.type.name === 'table') {
        table = node;
      }
      return !table;
    });

    expect(table).toBeTruthy();
    expect(table.childCount).toBe(3);
    expect(table.child(0).firstChild.type.name).toBe('table_header');
    expect(table.child(0).firstChild.attrs['colspan']).toBe(3);
    expect(table.child(1).childCount).toBe(3);
    expect(table.child(2).childCount).toBe(3);
  });

  it('should not insert a table when the schema has no table nodes', () => {
    const schema = new Schema({
      nodes: {
        doc: { content: 'paragraph+' },
        paragraph: { content: 'text*', toDOM: () => ['p', 0] },
        text: {},
      },
    });
    const state = EditorState.create({ schema });

    expect(Table.insert(2, 3)(state)).toBe(false);
  });

  it('should not accept fractional rows or columns', () => {
    component.form.setValue({ rows: 1.5, cols: 2 });
    expect(component.form.valid).toBe(false);

    component.form.setValue({ rows: 2, cols: 1.5 });
    expect(component.form.valid).toBe(false);

    component.form.setValue({ rows: 2, cols: 3 });
    expect(component.form.valid).toBe(true);
  });
});
