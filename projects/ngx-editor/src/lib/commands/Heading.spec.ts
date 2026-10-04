import { TextSelection } from 'prosemirror-state';

import Editor from '../Editor';
import { toHTML } from '../parsers';
import Heading from './Heading';

describe('Heading', () => {
  let editor: Editor;

  const select = (from: number, to: number): void => {
    const { view } = editor;
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, to)));
  };

  const toggle = (level: 1 | 2): boolean => {
    const { view } = editor;
    return new Heading(level).toggle()(view.state, view.dispatch);
  };

  const getHTML = (): string => toHTML(editor.view.state.doc.toJSON());

  afterEach(() => {
    editor.destroy();
  });

  it('should toggle a paragraph to a heading and back', () => {
    editor = new Editor({ content: '<p>Hello</p>' });

    select(1, 1);

    expect(toggle(2)).toBe(true);
    expect(getHTML()).toBe('<h2>Hello</h2>');

    expect(toggle(2)).toBe(true);
    expect(getHTML()).toBe('<p>Hello</p>');
  });

  it('should change the level of a heading', () => {
    editor = new Editor({ content: '<h1>Hello</h1>' });

    select(1, 1);

    expect(toggle(2)).toBe(true);
    expect(getHTML()).toBe('<h2>Hello</h2>');
  });

  it('should keep the attributes of each block in the selection', () => {
    editor = new Editor({
      content: '<p align="center">One</p><p align="right" data-indent="2">Two</p>',
    });

    select(1, 9);
    toggle(2);

    const { doc } = editor.view.state;
    expect(doc.child(0).attrs).toEqual({ level: 2, align: 'center', indent: null });
    expect(doc.child(1).attrs).toEqual({ level: 2, align: 'right', indent: 2 });

    toggle(2);

    expect(editor.view.state.doc.child(0).type.name).toBe('paragraph');
    expect(editor.view.state.doc.child(0).attrs).toEqual({ align: 'center', indent: null });
    expect(editor.view.state.doc.child(1).attrs).toEqual({ align: 'right', indent: 2 });
  });

  it('should not take the attributes of the parent node', () => {
    editor = new Editor({
      content: '<blockquote data-indent="3"><p align="center">Hello</p></blockquote>',
    });

    select(2, 2);
    toggle(2);

    const block = editor.view.state.doc.firstChild.firstChild;
    expect(block.type.name).toBe('heading');
    expect(block.attrs).toEqual({ level: 2, align: 'center', indent: null });
  });
});
