import { Schema } from 'prosemirror-model';
import { marks, nodes } from 'ngx-editor/schema';

import Editor from '../Editor';
import { toHTML } from '../parsers';
import linkifyPlugin from './link';

describe('linkifyPlugin', () => {
  let editor: Editor;

  const getHTML = (): string => toHTML(editor.view.state.doc.toJSON(), editor.schema);

  // jsdom does not implement ClipboardEvent
  const paste = (text: string): boolean => editor.view.pasteText(text, new Event('paste') as ClipboardEvent);

  afterEach(() => {
    editor.destroy();
  });

  it('should convert pasted urls to links', () => {
    editor = new Editor({ plugins: [linkifyPlugin()] });

    paste('https://example.com');

    expect(getHTML()).toBe('<p><a href="https://example.com" target="_blank">https://example.com</a></p>');
  });

  it('should paste urls as text when the schema has no link mark', () => {
    const schema = new Schema({
      nodes,
      marks: Object.fromEntries(Object.entries(marks).filter(([name]) => name !== 'link')),
    });
    editor = new Editor({ schema, plugins: [linkifyPlugin()] });

    expect(() => paste('https://example.com')).not.toThrow();
    expect(getHTML()).toBe('<p>https://example.com</p>');
  });
});
