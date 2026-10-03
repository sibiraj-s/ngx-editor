import { inputRules } from 'prosemirror-inputrules';
import { autoLink } from '../../input-rules/auto-link';

import Editor from './Editor';
import { toHTML } from './parsers';

describe('autoLink', () => {
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

  const getHTML = (): string => toHTML(editor.view.state.doc.toJSON());

  beforeEach(() => {
    editor = new Editor({ plugins: [inputRules({ rules: [autoLink()] })] });
  });

  afterEach(() => {
    editor.destroy();
  });

  it('should convert typed urls to links', () => {
    type('https://example.com');

    expect(getHTML()).toContain('<a href="https://example.com"');
  });

  it('should convert typed urls with a fragment to links', () => {
    type('see https://example.com#intro');

    expect(getHTML()).toContain('<a href="https://example.com#intro"');
  });

  it('should not convert typed numbers to links', () => {
    type('price 10.50 and version 1.2.3');

    expect(getHTML()).toBe('<p>price 10.50 and version 1.2.3</p>');
  });
});
