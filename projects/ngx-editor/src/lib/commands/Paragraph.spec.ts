import { TextSelection } from 'prosemirror-state';

import Editor from '../Editor';
import { toHTML } from '../parsers';
import Paragraph from './Paragraph';

describe('Paragraph', () => {
  let editor: Editor;
  const command = new Paragraph();

  const select = (from: number, to: number): void => {
    const { view } = editor;
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, to)));
  };

  const toggle = (): boolean => {
    const { view } = editor;
    return command.toggle()(view.state, view.dispatch);
  };

  const getHTML = (): string => toHTML(editor.view.state.doc.toJSON());

  afterEach(() => {
    editor.destroy();
  });

  it('should convert a heading to a paragraph', () => {
    editor = new Editor({ content: '<h2>Hello</h2>' });

    select(1, 1);

    expect(command.isActive(editor.view.state)).toBe(false);
    expect(command.canExecute(editor.view.state)).toBe(true);
    expect(toggle()).toBe(true);
    expect(getHTML()).toBe('<p>Hello</p>');
    expect(command.isActive(editor.view.state)).toBe(true);
  });

  it('should keep the alignment and indent of the heading', () => {
    editor = new Editor({ content: '<h1 align="center" data-indent="1">Hello</h1>' });

    select(1, 1);
    toggle();

    const block = editor.view.state.doc.firstChild;
    expect(block.type.name).toBe('paragraph');
    expect(block.attrs['align']).toBe('center');
    expect(block.attrs['indent']).toBe(1);
  });

  it('should not execute when the block is already a paragraph', () => {
    editor = new Editor({ content: '<p>Hello</p>' });

    select(1, 1);

    expect(command.isActive(editor.view.state)).toBe(true);
    expect(command.canExecute(editor.view.state)).toBe(false);
  });

  it('should convert all headings in the selection', () => {
    editor = new Editor({ content: '<h1>Hello</h1><h3>World</h3>' });

    select(1, 10);
    toggle();

    expect(getHTML()).toBe('<p>Hello</p><p>World</p>');
  });
});
