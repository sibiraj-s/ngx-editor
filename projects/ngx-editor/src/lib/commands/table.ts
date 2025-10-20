import { type EditorState, NodeSelection, type Command } from 'prosemirror-state';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { Dispatch } from './types';

class Table {
  insert(rows: number, cols: number): Command {
    return (state: EditorState, dispatch?: Dispatch): boolean => {
      const { schema, tr } = state;
      const tableType = schema.nodes['table'];
      const rowType = schema.nodes['table_row'];
      const cellType = schema.nodes['table_cell'];
      const headerType = schema.nodes['table_header'];

      const tableRows: ProseMirrorNode[] = [];

      const headerAttrs = {
        colspan: cols,
      };

      const headerText = schema.text('Header');
      const paragraph = schema.nodes['paragraph'].create(null, headerText);
      const headerCell = headerType.create(headerAttrs, paragraph);

      tableRows.push(rowType.create(null, [headerCell]));

      for (let i = 0; i < rows; i++) {
        const cells: ProseMirrorNode[] = [];
        for (let j = 0; j < cols; j++) {
          cells.push(cellType.createAndFill(null));
        }
        tableRows.push(rowType.create(null, cells));
      }

      const table = tableType.create(null, tableRows);
      tr.replaceSelectionWith(table).scrollIntoView();

      if (tr.docChanged) {
        dispatch?.(tr);
        return true;
      }

      return false;
    };
  }

  isActive(state: EditorState): boolean {
    const { selection } = state;
    if (selection instanceof NodeSelection) {
      return selection.node.type.name === 'table';
    }
    return false;
  }
}

export default Table;
