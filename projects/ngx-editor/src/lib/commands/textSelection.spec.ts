import { AllSelection } from 'prosemirror-state';

import Editor from '../Editor';
import { toHTML } from '../parsers';
import Blockquote from './Blockquote';
import ListItem from './ListItem';
import { ToggleCommand } from './types';

describe('toggle commands with select all', () => {
  let editor: Editor;

  const selectAll = (): void => {
    const { view } = editor;
    view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)));
  };

  const toggle = (command: ToggleCommand): void => {
    const { view } = editor;
    expect(command.canExecute(view.state)).toBe(true);
    command.toggle()(view.state, view.dispatch);
  };

  const getHTML = (): string => toHTML(editor.view.state.doc.toJSON());

  afterEach(() => {
    editor.destroy();
  });

  it('should remove the bullet list', () => {
    editor = new Editor({ content: '<ul><li><p>a</p></li><li><p>b</p></li></ul>' });
    selectAll();

    expect(new ListItem(true).isActive(editor.view.state)).toBe(true);
    toggle(new ListItem(true));

    expect(getHTML()).toBe('<p>a</p><p>b</p>');
  });

  it('should wrap the paragraphs in an ordered list', () => {
    editor = new Editor({ content: '<p>a</p><p>b</p>' });
    selectAll();

    toggle(new ListItem(false));

    expect(getHTML()).toBe('<ol><li><p>a</p></li><li><p>b</p></li></ol>');
  });

  it('should remove the blockquote', () => {
    editor = new Editor({ content: '<blockquote><p>a</p><p>b</p></blockquote>' });
    selectAll();

    expect(new Blockquote().isActive(editor.view.state)).toBe(true);
    toggle(new Blockquote());

    expect(getHTML()).toBe('<p>a</p><p>b</p>');
  });
});
