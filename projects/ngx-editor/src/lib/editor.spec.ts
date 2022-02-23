import Editor from './Editor';

describe('NgxEditorComponent', () => {
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
