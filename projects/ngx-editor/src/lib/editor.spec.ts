import Editor from './Editor';
import { HORIZONTAL_RULE } from './commands';
import { NodeSelection, TextSelection } from 'prosemirror-state';
import { undo } from 'prosemirror-history';
import { Schema } from 'prosemirror-model';

import { parseContent, toHTML } from './parsers';
import schema from './schema';

describe('Editor', () => {
  it('should create the editor correctly', () => {
    const editor = new Editor();
    expect(editor).toBeTruthy();
    expect(editor.view).toBeDefined();
    expect(editor.view.dom).toBeInstanceOf(HTMLElement);
  });

  it('should set the attributes correctly to the editor', () => {
    const editor = new Editor({
      attributes: {
        enterKeyHint: 'enter',
      },
    });

    expect(editor.view.dom.getAttribute('enterKeyHint')).toBe('enter');
  });

  it('should allow undoing setContent', () => {
    const editor = new Editor({ content: '<p>Hello</p>' });
    editor.setContent('<p>Hello world</p>');

    undo(editor.view.state, editor.view.dispatch);
    expect(editor.view.state.doc.textContent).toBe('Hello');
  });

  it('should preserve the selection when content is set', () => {
    const editor = new Editor({ content: '<p>Hello world</p>' });
    const { view } = editor;
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, 6)));

    editor.setContent('<p>Hello world!</p>');
    expect(view.state.selection.from).toBe(6);

    editor.setContent('<p>Hey, Hello world!</p>');
    expect(view.state.selection.from).toBe(11);
  });

  it('should replace the whole content when it is entirely different', () => {
    const editor = new Editor({ content: '<p>Hello</p><p>world</p>' });
    editor.setContent('<h1>Title</h1>');

    const expected = parseContent('<h1>Title</h1>', editor.schema);
    expect(editor.view.state.doc.eq(expected)).toBe(true);
  });

  it('should update the document attributes when content is set', () => {
    const docSchema = new Schema({
      nodes: schema.spec.nodes.update('doc', { ...schema.spec.nodes.get('doc'), attrs: { lang: { default: 'en' } } }),
      marks: schema.spec.marks,
    });

    const json = (lang: string, text: string): Record<string, unknown> => ({
      type: 'doc',
      attrs: { lang },
      content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
    });

    const editor = new Editor({ schema: docSchema, content: json('en', 'Hi') });
    const { view } = editor;

    // only the attributes change
    editor.setContent(json('fr', 'Hi'));
    expect(view.state.doc.attrs['lang']).toBe('fr');

    // both the attributes and the content change
    editor.setContent(json('de', 'Hallo'));
    expect(view.state.doc.attrs['lang']).toBe('de');
    expect(view.state.doc.textContent).toBe('Hallo');
  });

  it('should not allow undoing setContent when addToHistory is false', () => {
    const editor = new Editor({ content: '<p>Hello</p>' });
    editor.setContent('<p>Hello world</p>', { addToHistory: false });

    undo(editor.view.state, editor.view.dispatch);
    expect(editor.view.state.doc.textContent).toBe('Hello world');
  });

  it('should emit the latest doc last when an update listener dispatches', () => {
    const editor = new Editor({ content: '<p>Hello</p>' });
    const valueChanges = vi.fn();
    editor.valueChanges.subscribe(valueChanges);

    // appends to the content once, from within the update
    editor.update.subscribe((view) => {
      if (view.state.doc.textContent === 'Hello world') {
        view.dispatch(view.state.tr.insertText('!', view.state.doc.content.size - 1));
      }
    });

    editor.setContent('<p>Hello world</p>');

    expect(editor.view.state.doc.textContent).toBe('Hello world!');
    expect(valueChanges).toHaveBeenCalledTimes(1);
    expect(toHTML(valueChanges.mock.lastCall[0], schema)).toBe('<p>Hello world!</p>');
  });

  it('should emit value changes on setContent', () => {
    const editor = new Editor({ content: '<p>Hello</p>' });
    const valueChanges = vi.fn();
    editor.valueChanges.subscribe(valueChanges);

    editor.setContent('<p>Hello world</p>');

    expect(valueChanges).toHaveBeenCalledTimes(1);
    expect(toHTML(valueChanges.mock.calls[0][0], schema)).toBe('<p>Hello world</p>');
  });
});

describe('Editor: Commands', () => {
  it('should expose all the commands', () => {
    const editor = new Editor();
    expect(editor.commands.exec).toBeInstanceOf(Function);
    expect(editor.commands.align).toBeInstanceOf(Function);
    expect(editor.commands.applyMark).toBeInstanceOf(Function);
    expect(editor.commands.backgroundColor).toBeInstanceOf(Function);
    expect(editor.commands.bold).toBeInstanceOf(Function);
    expect(editor.commands.code).toBeInstanceOf(Function);
    expect(editor.commands.focus).toBeInstanceOf(Function);
    expect(editor.commands.insertHTML).toBeInstanceOf(Function);
    expect(editor.commands.insertImage).toBeInstanceOf(Function);
    expect(editor.commands.insertLink).toBeInstanceOf(Function);
    expect(editor.commands.insertNewLine).toBeInstanceOf(Function);
    expect(editor.commands.insertText).toBeInstanceOf(Function);
    expect(editor.commands.italics).toBeInstanceOf(Function);
    expect(editor.commands.removeBackgroundColor).toBeInstanceOf(Function);
    expect(editor.commands.removeTextColor).toBeInstanceOf(Function);
    expect(editor.commands.scrollIntoView).toBeInstanceOf(Function);
    expect(editor.commands.strike).toBeInstanceOf(Function);
    expect(editor.commands.textColor).toBeInstanceOf(Function);
    expect(editor.commands.toggleBold).toBeInstanceOf(Function);
    expect(editor.commands.toggleBulletList).toBeInstanceOf(Function);
    expect(editor.commands.toggleCode).toBeInstanceOf(Function);
    expect(editor.commands.toggleHeading).toBeInstanceOf(Function);
    expect(editor.commands.toggleItalics).toBeInstanceOf(Function);
    expect(editor.commands.toggleMark).toBeInstanceOf(Function);
    expect(editor.commands.toggleOrderedList).toBeInstanceOf(Function);
    expect(editor.commands.toggleStrike).toBeInstanceOf(Function);
    expect(editor.commands.toggleUnderline).toBeInstanceOf(Function);
    expect(editor.commands.underline).toBeInstanceOf(Function);
    expect(editor.commands.updateLink).toBeInstanceOf(Function);
  });

  it('should set focus at the end correctly', () => {
    const editor = new Editor({
      content: 'Hello there',
    });

    editor.commands.focus().insertText('!').exec();
    expect(editor.view.state.doc.textContent).toBe('Hello there!');

    editor.commands.focus('end').insertText('!').exec();
    expect(editor.view.state.doc.textContent).toBe('Hello there!!');
  });

  it('should set focus at the start correctly', () => {
    const editor = new Editor({
      content: 'world!',
    });

    editor.commands.focus('start').insertText('Hello ').exec();
    expect(editor.view.state.doc.textContent).toBe('Hello world!');
  });

  it('should insert text correctly', () => {
    const editor = new Editor({
      content: 'Hello',
    });

    editor.commands.focus().insertText(' there').exec();
    expect(editor.view.state.doc.textContent).toBe('Hello there');
  });
});

describe('Editor: HorizontalRule', () => {
  it('should insert a horizontal rule followed by a paragraph on an empty editor', () => {
    const editor = new Editor();
    const { state } = editor.view;

    HORIZONTAL_RULE.insert()(state, editor.view.dispatch.bind(editor.view));

    const { doc } = editor.view.state;
    expect(doc.childCount).toBe(2);
    expect(doc.child(0).type.name).toBe('horizontal_rule');
    expect(doc.child(1).type.name).toBe('paragraph');
  });

  it('should insert a horizontal rule in the middle of content', () => {
    const editor = new Editor({ content: 'Hello' });
    const { state } = editor.view;

    HORIZONTAL_RULE.insert()(state, editor.view.dispatch.bind(editor.view));

    const { doc } = editor.view.state;
    expect(doc.child(0).type.name).toBe('horizontal_rule');
    expect(doc.child(1).type.name).toBe('paragraph');
  });

  it('should preserve text when cursor is at the end of a non-empty paragraph', () => {
    const editor = new Editor({ content: 'Hello' });

    // Place cursor at the end of "Hello" (position 6: doc=0, p=1, H=1,e=2,l=3,l=4,o=5, end=6)
    const endPos = editor.view.state.doc.content.size - 1; // end of text inside paragraph
    const tr = editor.view.state.tr.setSelection(TextSelection.create(editor.view.state.doc, endPos));
    editor.view.dispatch(tr);

    const { state } = editor.view;
    HORIZONTAL_RULE.insert()(state, editor.view.dispatch.bind(editor.view));

    const { doc } = editor.view.state;
    // The original paragraph with "Hello" must still exist
    expect(doc.child(0).type.name).toBe('paragraph');
    expect(doc.child(0).textContent).toBe('Hello');
    // Followed by a horizontal rule and a new paragraph
    expect(doc.child(1).type.name).toBe('horizontal_rule');
    expect(doc.child(2).type.name).toBe('paragraph');
  });

  it('should not add trailing empty paragraph when next sibling exists', () => {
    const editor = new Editor({ content: '<p>First</p><p>Second</p>' });

    // Place cursor at the end of "First"
    const endPos = editor.view.state.doc.child(0).nodeSize - 1; // end of text in first paragraph
    const tr = editor.view.state.tr.setSelection(TextSelection.create(editor.view.state.doc, endPos));
    editor.view.dispatch(tr);

    const { state } = editor.view;
    HORIZONTAL_RULE.insert()(state, editor.view.dispatch.bind(editor.view));

    const { doc } = editor.view.state;
    expect(doc.childCount).toBe(3);
    expect(doc.child(0).type.name).toBe('paragraph');
    expect(doc.child(0).textContent).toBe('First');
    expect(doc.child(1).type.name).toBe('horizontal_rule');
    expect(doc.child(2).type.name).toBe('paragraph');
    expect(doc.child(2).textContent).toBe('Second');
  });

  it('should split text when cursor is in the middle of a paragraph', () => {
    const editor = new Editor({ content: 'Hello World' });

    // Place cursor between "Hello" and " World" (position 6, after "Hello")
    const tr = editor.view.state.tr.setSelection(TextSelection.create(editor.view.state.doc, 6));
    editor.view.dispatch(tr);

    const { state } = editor.view;
    HORIZONTAL_RULE.insert()(state, editor.view.dispatch.bind(editor.view));

    const { doc } = editor.view.state;
    // "Hello" paragraph, then HR, then " World" paragraph
    expect(doc.child(0).type.name).toBe('paragraph');
    expect(doc.child(0).textContent).toBe('Hello');
    expect(doc.child(1).type.name).toBe('horizontal_rule');
    expect(doc.child(2).type.name).toBe('paragraph');
    expect(doc.child(2).textContent).toBe(' World');
  });

  it('should place the cursor right after the rule when splitting a paragraph', () => {
    const editor = new Editor({ content: 'Hello World' });
    editor.view.dispatch(editor.view.state.tr.setSelection(TextSelection.create(editor.view.state.doc, 6)));

    HORIZONTAL_RULE.insert()(editor.view.state, editor.view.dispatch.bind(editor.view));

    const { doc, selection } = editor.view.state;
    // start of " World" paragraph: "Hello" paragraph (7) + rule (1) + 1
    expect(selection.from).toBe(9);
    expect(doc.resolve(selection.from).parent.textContent).toBe(' World');
  });

  it('should replace the selected text', () => {
    const editor = new Editor({ content: 'Hello' });
    editor.view.dispatch(editor.view.state.tr.setSelection(TextSelection.create(editor.view.state.doc, 2, 5)));

    HORIZONTAL_RULE.insert()(editor.view.state, editor.view.dispatch.bind(editor.view));

    expect(editor.view.state.doc.toString()).toBe('doc(paragraph("H"), horizontal_rule, paragraph("o"))');
  });

  it('should replace a selected top-level node', () => {
    const editor = new Editor({ content: '<p>a</p><hr><p>b</p>' });
    editor.view.dispatch(editor.view.state.tr.setSelection(NodeSelection.create(editor.view.state.doc, 3)));

    HORIZONTAL_RULE.insert()(editor.view.state, editor.view.dispatch.bind(editor.view));

    expect(editor.view.state.doc.toString()).toBe('doc(paragraph("a"), horizontal_rule, paragraph("b"))');
  });

  it('should keep the rule inside an empty list item', () => {
    const editor = new Editor({ content: '<ul><li><p></p></li></ul>' });
    editor.view.dispatch(editor.view.state.tr.setSelection(TextSelection.create(editor.view.state.doc, 3)));

    HORIZONTAL_RULE.insert()(editor.view.state, editor.view.dispatch.bind(editor.view));

    const { doc, selection } = editor.view.state;
    expect(doc.toString()).toBe('doc(bullet_list(list_item(paragraph, horizontal_rule, paragraph)))');
    expect(selection.$from.parent.type.name).toBe('paragraph');
    expect(selection.from).toBe(6);
  });

  it('should keep the rule inside the list item when the cursor is at its start', () => {
    const editor = new Editor({ content: '<ul><li><p>a</p></li><li><p>bc</p></li></ul>' });
    editor.view.dispatch(editor.view.state.tr.setSelection(TextSelection.create(editor.view.state.doc, 7)));

    HORIZONTAL_RULE.insert()(editor.view.state, editor.view.dispatch.bind(editor.view));

    expect(editor.view.state.doc.toString())
      .toBe('doc(bullet_list(list_item(paragraph("a")), list_item(paragraph, horizontal_rule, paragraph("bc"))))');
  });
});

describe('Editor: Table', () => {
  const tableHTML = '<table><tbody>'
    + '<tr><th><p>Head</p></th><th><p>Head 2</p></th></tr>'
    + '<tr><td style="background-color: #dfd;"><p>A1</p></td><td data-colwidth="120"><p>B1</p></td></tr>'
    + '</tbody></table>';

  const pressKey = (editor: Editor, key: string, shiftKey = false): boolean => {
    const event = new KeyboardEvent('keydown', { key, shiftKey });
    return Boolean(editor.view.someProp('handleKeyDown', (f) => f(editor.view, event)));
  };

  const placeCursorIn = (editor: Editor, text: string): void => {
    const { view } = editor;
    let pos = -1;
    view.state.doc.descendants((node, nodePos) => {
      if (node.isText && node.text === text) {
        pos = nodePos;
      }
      return pos === -1;
    });
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, pos)));
  };

  const cursorText = (editor: Editor): string => editor.view.state.selection.$from.parent.textContent;

  it('should parse table cells and their attributes from HTML', () => {
    const editor = new Editor({ content: tableHTML });
    const table = editor.view.state.doc.firstChild;

    expect(table.type.name).toBe('table');
    expect(table.child(0).child(0).type.name).toBe('table_header');
    expect(table.child(1).child(0).attrs['background']).toBe('rgb(221, 255, 221)');
    expect(table.child(1).child(1).attrs['colwidth']).toEqual([120]);
  });

  it('should keep table cell attributes when converting back to HTML', () => {
    const editor = new Editor({ content: tableHTML });
    const html = toHTML(editor.view.state.doc.toJSON());

    expect(html).toContain('<th');
    expect(html).toContain('background-color: rgb(221, 255, 221);');
    expect(html).toContain('data-colwidth="120"');

    const reparsed = new Editor({ content: html });
    expect(reparsed.view.state.doc.eq(editor.view.state.doc)).toBe(true);
  });

  it('should move to the next and previous cell with Tab and Shift-Tab', () => {
    const editor = new Editor({ content: tableHTML });

    placeCursorIn(editor, 'A1');
    expect(pressKey(editor, 'Tab')).toBe(true);
    expect(cursorText(editor)).toBe('B1');

    expect(pressKey(editor, 'Tab', true)).toBe(true);
    expect(cursorText(editor)).toBe('A1');
  });

  it('should indent a list item inside a table cell with Tab', () => {
    const editor = new Editor({
      content: '<table><tbody><tr>'
        + '<td><ul><li><p>one</p></li><li><p>two</p></li></ul></td><td><p>next</p></td>'
        + '</tr></tbody></table>',
    });

    placeCursorIn(editor, 'two');
    expect(pressKey(editor, 'Tab')).toBe(true);
    expect(cursorText(editor)).toBe('two');
    expect(editor.view.state.doc.firstChild.toString()).toContain(
      'list_item(paragraph("one"), bullet_list(list_item(paragraph("two"))))',
    );
  });

});

describe('Editor: HTML parsing', () => {
  const html = '<p style="text-align: center"><span style="color: red">Hello</span></p>';

  it('should keep style based attributes and marks when setting HTML content', () => {
    const editor = new Editor();
    editor.setContent(html);

    const paragraph = editor.view.state.doc.firstChild;
    expect(paragraph.attrs['align']).toBe('center');
    expect(paragraph.firstChild.marks[0].type.name).toBe('text_color');
    expect(paragraph.firstChild.marks[0].attrs['color']).toBe('red');
  });

  it('should keep style based marks when inserting HTML', () => {
    const editor = new Editor();
    editor.commands.insertHTML(html).exec();

    const paragraph = editor.view.state.doc.firstChild;
    expect(paragraph.textContent).toBe('Hello');
    expect(paragraph.firstChild.marks[0].type.name).toBe('text_color');
    expect(paragraph.firstChild.marks[0].attrs['color']).toBe('red');
  });
});
