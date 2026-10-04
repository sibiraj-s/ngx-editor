import { NodeSelection, TextSelection } from 'prosemirror-state';

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

  it('should keep the attributes of each heading in the selection', () => {
    editor = new Editor({
      content: '<h1 align="center">One</h1><h2 align="right" data-indent="2">Two</h2>',
    });

    select(1, 9);
    toggle();

    const { doc } = editor.view.state;
    expect(doc.child(0).type.name).toBe('paragraph');
    expect(doc.child(0).attrs).toEqual({ align: 'center', indent: null });
    expect(doc.child(1).type.name).toBe('paragraph');
    expect(doc.child(1).attrs).toEqual({ align: 'right', indent: 2 });
  });

  it('should keep the attributes of a selected heading node', () => {
    editor = new Editor({ content: '<h1 align="center">Hello</h1>' });

    const { view } = editor;
    view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, 0)));

    expect(toggle()).toBe(true);

    const block = editor.view.state.doc.firstChild;
    expect(block.type.name).toBe('paragraph');
    expect(block.attrs['align']).toBe('center');
  });

  it('should convert all headings in the selection', () => {
    editor = new Editor({ content: '<h1>Hello</h1><h3>World</h3>' });

    select(1, 10);
    toggle();

    expect(getHTML()).toBe('<p>Hello</p><p>World</p>');
  });
});
