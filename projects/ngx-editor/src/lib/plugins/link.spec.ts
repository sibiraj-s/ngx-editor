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

  it('should leave trailing punctuation out of pasted links', () => {
    editor = new Editor({ plugins: [linkifyPlugin()] });

    paste('visit example.com.');

    expect(getHTML()).toBe('<p>visit <a href="example.com" target="_blank">example.com</a>.</p>');
  });

  it('should keep closing parentheses that are part of pasted links', () => {
    editor = new Editor({ plugins: [linkifyPlugin()] });

    const url = 'https://en.wikipedia.org/wiki/Function_(mathematics)';
    paste(`(see ${url})`);

    expect(getHTML()).toBe(`<p>(see <a href="${url}" target="_blank">${url}</a>)</p>`);
  });

  it('should leave closing parentheses around pasted domains out of the link', () => {
    editor = new Editor({ plugins: [linkifyPlugin()] });

    paste('(see example.com)');

    expect(getHTML()).toBe('<p>(see <a href="example.com" target="_blank">example.com</a>)</p>');
  });

  it('should convert pasted urls with a query or a fragment to links', () => {
    editor = new Editor({ plugins: [linkifyPlugin()] });

    paste('https://example.com?q=foo.bar#intro');

    expect(getHTML()).toBe(
      '<p><a href="https://example.com?q=foo.bar#intro" target="_blank">https://example.com?q=foo.bar#intro</a></p>',
    );
  });

  it('should not convert pasted urls without a host to links', () => {
    editor = new Editor({ plugins: [linkifyPlugin()] });

    paste('see https://!');

    expect(getHTML()).toBe('<p>see https://!</p>');
  });

  it('should not convert part of a word to a link', () => {
    editor = new Editor({ plugins: [linkifyPlugin()] });

    paste('mail@example.com or https://user:pass@example.com/path');

    expect(getHTML()).toBe('<p>mail@example.com or https://user:pass@example.com/path</p>');
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
