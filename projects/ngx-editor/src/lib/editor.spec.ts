import Editor from './Editor';

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
