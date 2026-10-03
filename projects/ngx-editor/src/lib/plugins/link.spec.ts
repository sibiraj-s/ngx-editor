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

  it('should convert pasted urls with a port to links', () => {
    editor = new Editor({ plugins: [linkifyPlugin()] });

    paste('http://localhost:4200/path');

    expect(getHTML()).toBe('<p><a href="http://localhost:4200/path" target="_blank">http://localhost:4200/path</a></p>');
  });

  it('should convert pasted domains without a protocol to links', () => {
    editor = new Editor({ plugins: [linkifyPlugin()] });

    paste('visit www.example.co.uk');

    expect(getHTML()).toBe('<p>visit <a href="www.example.co.uk" target="_blank">www.example.co.uk</a></p>');
  });

  it('should not convert pasted numbers to links', () => {
    editor = new Editor({ plugins: [linkifyPlugin()] });

    paste('price 10.50, version 1.2.3, about 12.5kg and 192.168.1.1');

    expect(getHTML()).toBe('<p>price 10.50, version 1.2.3, about 12.5kg and 192.168.1.1</p>');
  });

  it('should not convert pasted urls followed by punctuation or without a host to links', () => {
    editor = new Editor({ plugins: [linkifyPlugin()] });

    paste('see https://example.com, or https://!');

    expect(getHTML()).toBe('<p>see https://example.com, or https://!</p>');
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
