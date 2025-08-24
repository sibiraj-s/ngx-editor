import { Observable, isObservable, of } from 'rxjs';

export const defaults: Record<string, string | Observable<string>> = {
  // menu
  bold: 'Bold',
  italic: 'Italic',
  code: 'Code',
  underline: 'Underline',
  strike: 'Strike',
  blockquote: 'Blockquote',
  bullet_list: 'Bullet List',
  ordered_list: 'Ordered List',
  heading: 'Heading',
  h1: 'Header 1',
  h2: 'Header 2',
  h3: 'Header 3',
  h4: 'Header 4',
  h5: 'Header 5',
  h6: 'Header 6',
  align_left: 'Left Align',
  align_center: 'Center Align',
  align_right: 'Right Align',
  align_justify: 'Justify',
  text_color: 'Text Color',
  background_color: 'Background Color',
  horizontal_rule: 'Horizontal rule',
  format_clear: 'Clear Formatting',
  insertLink: 'Insert Link',
  removeLink: 'Remove Link',
  insertImage: 'Insert Image',
  insertTable: 'Insert Table',
  indent: 'Increase Indent',
  outdent: 'Decrease Indent',
  superscript: 'Superscript',
  subscript: 'Subscript',
  undo: 'Undo',
  redo: 'Redo',

  // pupups, forms, others...
  url: 'URL',
  text: 'Text',
  openInNewTab: 'Open in new tab',
  insert: 'Insert',
  altText: 'Alt Text',
  title: 'Title',
  remove: 'Remove',
  enterValidUrl: 'Please enter a valid URL',
  rows: 'Number of Rows',
  rowsRequired: 'Rows field is required.',
  rowsMin: 'Minimum number of rows must be 1.',
  cols: 'Number of Columns',
  colsRequired: 'Columns field is required.',
  colsMin: 'Minimum number of columns must be 1.',
  // Table actions
  table:'Table',
  addColumnBefore: 'Insert Column Before',
  addColumnAfter: 'Insert Column After',
  deleteColumn: 'Delete Column',
  addRowBefore: 'Insert Row Before',
  addRowAfter: 'Insert Row After',
  deleteRow: 'Delete Row',
  deleteTable: 'Delete Table',
  mergeCells: 'Merge Cells',
  splitCell: 'Split Cell',
  toggleHeaderRow: 'Toggle Header Row',
  toggleHeaderColumn: 'Toggle Header Column',
  toggleHeaderCell: 'Toggle Header Cells',
  setCellBackgroundGreen: 'Make Cell Green',
  clearCellBackground: 'Clear Cell Background',
};

export type LocalsKeys = keyof typeof defaults;

class Locals {
  locals = defaults;

  constructor(newLocals: Partial<Record<LocalsKeys, string | Observable<string>>> = {}) {
    this.locals = { ...defaults, ...newLocals };
  }

  get = (key: string): Observable<string> => {
    const value = this.locals[key];
    if (value) {
      return isObservable(value) ? value : of(value);
    }
    return of('');
  };
}

export default Locals;
