import { TextSelection } from 'prosemirror-state';

import Editor from '../Editor';
import { toHTML } from '../parsers';
import TaskList from './TaskList';

describe('TaskList', () => {
  let editor: Editor;
  const command = new TaskList();

  const select = (from: number, to: number): void => {
    const { view } = editor;
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, to)));
  };

  const toggle = (): boolean => {
    const { view } = editor;
    return command.toggle()(view.state, view.dispatch);
  };

  const pressKey = (key: string): boolean => {
    const { view } = editor;
    const event = new KeyboardEvent('keydown', { key });
    return Boolean(view.someProp('handleKeyDown', (f) => f(view, event)));
  };

  const getHTML = (): string => toHTML(editor.view.state.doc.toJSON());

  const getCheckboxes = (): HTMLInputElement[] => {
    return Array.from(editor.view.dom.querySelectorAll('input[type="checkbox"]'));
  };

  afterEach(() => {
    editor.destroy();
  });

  it('should wrap the paragraphs in a task list and remove it', () => {
    editor = new Editor({ content: '<p>a</p><p>b</p>' });

    select(1, 4);

    expect(command.isActive(editor.view.state)).toBe(false);
    expect(toggle()).toBe(true);
    expect(command.isActive(editor.view.state)).toBe(true);
    expect(getHTML()).toBe(
      '<ul data-type="task_list">'
      + '<li data-type="task_item" data-checked="false"><p>a</p></li>'
      + '<li data-type="task_item" data-checked="false"><p>b</p></li>'
      + '</ul>',
    );

    expect(toggle()).toBe(true);
    expect(getHTML()).toBe('<p>a</p><p>b</p>');
  });

  it('should parse the checked state of the items', () => {
    const html = '<ul data-type="task_list">'
      + '<li data-type="task_item" data-checked="true"><p>a</p></li>'
      + '<li data-type="task_item" data-checked="false"><p>b</p></li>'
      + '</ul>';

    editor = new Editor({ content: html });

    expect(editor.view.state.doc.toString()).toBe('doc(task_list(task_item(paragraph("a")), task_item(paragraph("b"))))');
    expect(editor.view.state.doc.firstChild.child(0).attrs['checked']).toBe(true);
    expect(getHTML()).toBe(html);
  });

  it('should not render the checkbox in the html', () => {
    editor = new Editor({ content: '<ul data-type="task_list"><li data-type="task_item" data-checked="true"><p>a</p></li></ul>' });

    const [checkbox] = getCheckboxes();
    expect(checkbox.checked).toBe(true);
    expect(getHTML()).not.toContain('input');
  });

  it('should toggle the checked state when the checkbox is clicked', () => {
    editor = new Editor({ content: '<ul data-type="task_list"><li data-type="task_item"><p>a</p></li></ul>' });

    getCheckboxes()[0].click();
    expect(editor.view.state.doc.firstChild.firstChild.attrs['checked']).toBe(true);

    getCheckboxes()[0].click();
    expect(editor.view.state.doc.firstChild.firstChild.attrs['checked']).toBe(false);
  });

  it('should not toggle the checked state when the editor is disabled', () => {
    editor = new Editor({ content: '<ul data-type="task_list"><li data-type="task_item"><p>a</p></li></ul>' });
    editor.view.setProps({ editable: () => false });

    const [checkbox] = getCheckboxes();
    checkbox.click();

    expect(checkbox.checked).toBe(false);
    expect(editor.view.state.doc.firstChild.firstChild.attrs['checked']).toBe(false);
  });

  it('should create an unchecked item on enter', () => {
    editor = new Editor({ content: '<ul data-type="task_list"><li data-type="task_item" data-checked="true"><p>a</p></li></ul>' });

    select(4, 4);

    expect(pressKey('Enter')).toBe(true);
    expect(editor.view.state.doc.toString()).toBe('doc(task_list(task_item(paragraph("a")), task_item(paragraph)))');
    expect(editor.view.state.doc.firstChild.child(1).attrs['checked']).toBe(false);
  });

  it('should create an unchecked item when splitting a checked item', () => {
    editor = new Editor({ content: '<ul data-type="task_list"><li data-type="task_item" data-checked="true"><p>buy milk</p></li></ul>' });

    select(6, 6);

    expect(pressKey('Enter')).toBe(true);

    const list = editor.view.state.doc.firstChild;
    expect(list.toString()).toBe('task_list(task_item(paragraph("buy")), task_item(paragraph(" milk")))');
    expect(list.child(0).attrs['checked']).toBe(true);
    expect(list.child(1).attrs['checked']).toBe(false);
  });

  it('should keep the text checked when splitting at the start of a checked item', () => {
    editor = new Editor({ content: '<ul data-type="task_list"><li data-type="task_item" data-checked="true"><p>buy</p></li></ul>' });

    select(3, 3);

    expect(pressKey('Enter')).toBe(true);

    const list = editor.view.state.doc.firstChild;
    expect(list.toString()).toBe('task_list(task_item(paragraph), task_item(paragraph("buy")))');
    expect(list.child(0).attrs['checked']).toBe(false);
    expect(list.child(1).attrs['checked']).toBe(true);
  });

  it('should nest the item on tab', () => {
    editor = new Editor({
      content: '<ul data-type="task_list">'
        + '<li data-type="task_item"><p>a</p></li>'
        + '<li data-type="task_item"><p>b</p></li>'
        + '</ul>',
    });

    select(8, 8);

    expect(pressKey('Tab')).toBe(true);
    expect(editor.view.state.doc.toString())
      .toBe('doc(task_list(task_item(paragraph("a"), task_list(task_item(paragraph("b"))))))');
  });
});
