import { TextSelection } from 'prosemirror-state';

import Editor from '../Editor';
import { toHTML } from '../parsers';
import FormatClear from './FormatClear';

describe('FormatClear', () => {
  let editor: Editor;

  const select = (from: number, to: number): void => {
    const { view } = editor;
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, to)));
  };

  const clearFormat = (): void => {
    const { view } = editor;
    new FormatClear().insert()(view.state, view.dispatch);
  };

  const getHTML = (): string => toHTML(editor.view.state.doc.toJSON());

  afterEach(() => {
    editor.destroy();
  });

  it('should remove multiple marks from the selection', () => {
    editor = new Editor({
      content: '<p><strong><em><u><s>Hello</s></u></em></strong> <span style="color: red;"><code>world</code></span></p>',
    });

    select(1, 12);
    clearFormat();

    expect(getHTML()).toBe('<p>Hello world</p>');
  });

  it('should only remove marks within the selection', () => {
    editor = new Editor({ content: '<p><strong>Hello world</strong></p>' });

    select(1, 6);
    clearFormat();

    expect(getHTML()).toBe('<p>Hello<strong> world</strong></p>');
  });

  it('should keep links', () => {
    editor = new Editor({ content: '<p><a href="https://example.com"><strong>Hello</strong></a></p>' });

    select(1, 6);
    clearFormat();

    expect(getHTML()).toBe('<p><a href="https://example.com">Hello</a></p>');
  });

  it('should do nothing when the selection is empty', () => {
    editor = new Editor({ content: '<p><strong>Hello</strong></p>' });

    select(3, 3);
    clearFormat();

    expect(getHTML()).toBe('<p><strong>Hello</strong></p>');
  });
});
