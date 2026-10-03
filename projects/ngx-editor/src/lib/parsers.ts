import { DOMSerializer, Schema, DOMParser, Node as ProseMirrorNode, ParseOptions } from 'prosemirror-model';

import defaultSchema from './schema';
import { HTML, isHtml, parseHTML } from './trustedTypesUtil';

export const emptyDoc = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
};

// https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
export const toHTML = (json: Record<string, unknown>, inputSchema?: Schema): string => {
  const schema = inputSchema ?? defaultSchema;

  const contentNode = schema.nodeFromJSON(json);
  const html = DOMSerializer.fromSchema(schema).serializeFragment(contentNode.content);

  const div = document.createElement('div');
  div.appendChild(html);
  return div.innerHTML;
};

export const toDoc = (html: HTML, inputSchema?: Schema, options?:ParseOptions): Record<string, unknown> => {
  const schema = inputSchema ?? defaultSchema;

  const el = parseHTML(html);
  return DOMParser.fromSchema(schema).parse(el, options).toJSON();
};

export const parseContent = (
  value: HTML | Record<string, unknown> | null,
  schema: Schema,
  options?: ParseOptions,
): ProseMirrorNode => {
  if (!value) {
    return schema.nodeFromJSON(emptyDoc);
  }

  if (!isHtml(value)) {
    return schema.nodeFromJSON(value);
  }

  const docJson = toDoc(value as HTML, schema, options);
  return schema.nodeFromJSON(docJson);
};
