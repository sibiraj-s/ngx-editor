import Editor from './Editor';
import { toHTML } from './parsers';

describe('Input rules', () => {
  let editor: Editor;

  // simulates typing, so that the input rules are applied
  const type = (text: string): void => {
    const { view } = editor;

    for (const char of text) {
      const { from, to } = view.state.selection;
      const getTr = () => view.state.tr;
      const handled = view.someProp('handleTextInput', (f) => f(view, from, to, char, getTr));

      if (!handled) {
        view.dispatch(view.state.tr.insertText(char, from, to));
      }
    }
  };

  beforeEach(() => {
    editor = new Editor();
  });

  afterEach(() => {
    editor.destroy();
  });

  it('should create an ordered list starting from 1', () => {
    type('1. Hello');

    const [list] = editor.view.state.doc.toJSON().content;
    expect(list.type).toBe('ordered_list');
    expect(list.attrs.order).toBe(1);
    expect(toHTML(editor.view.state.doc.toJSON())).toBe('<ol><li><p>Hello</p></li></ol>');
  });

  it('should create an ordered list with the typed start number', () => {
    type('3. Hello');

    const [list] = editor.view.state.doc.toJSON().content;
    expect(list.attrs.order).toBe(3);
    expect(toHTML(editor.view.state.doc.toJSON())).toBe('<ol start="3"><li><p>Hello</p></li></ol>');
  });

  it('should not create an ordered list for very long numbers', () => {
    type('1234567890. Hello');

    expect(toHTML(editor.view.state.doc.toJSON())).toBe('<p>1234567890. Hello</p>');
  });
});
