import { DOMSerializer, Schema, DOMParser, Node as ProseMirrorNode, ParseOptions } from 'prosemirror-model';

import defaultSchema from './schema';
import { HTML, isHtml } from './trustedTypesUtil';

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

export const toDoc = (html: HTML, inputSchema?: Schema, options?:ParseOptions): Record<string, any> => {
  const schema = inputSchema ?? defaultSchema;

  const el = document.createElement('div');
  el.innerHTML = html as any;

  return DOMParser.fromSchema(schema).parse(el, options).toJSON();
};

export const parseContent = (
  value: HTML | Record<string, any> | null,
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
