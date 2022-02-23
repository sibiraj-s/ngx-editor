import { DOMSerializer, Schema, DOMParser, Node as ProseMirrorNode } from 'prosemirror-model';

import defaultSchema from './schema';

export const emptyDoc = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
};

// https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
export const toHTML = (json: Record<string, any>, inputSchema?: Schema): string => {
  const schema = inputSchema ?? defaultSchema;

  const contentNode = schema.nodeFromJSON(json);
  const html = DOMSerializer.fromSchema(schema).serializeFragment(contentNode.content);

  const div = document.createElement('div');
  div.appendChild(html);
  return div.innerHTML;
};

export const toDoc = (html: string, inputSchema?: Schema): Record<string, any> => {
  const schema = inputSchema ?? defaultSchema;

  const el = document.createElement('div');
  el.innerHTML = html;

  return DOMParser.fromSchema(schema).parse(el).toJSON();
};

export const parseContent = (value: string | Record<string, any> | null, schema: Schema): ProseMirrorNode => {
  if (!value) {
    return schema.nodeFromJSON(emptyDoc);
  }

  if (typeof value !== 'string') {
    return schema.nodeFromJSON(value);
  }

  const docJson = toDoc(value, schema);
  return schema.nodeFromJSON(docJson);
};
