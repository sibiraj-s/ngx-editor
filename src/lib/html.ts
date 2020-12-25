import { DOMSerializer, Schema, DOMParser } from 'prosemirror-model';
import { schema } from './schema';

// https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
export const toHTML = (json: Record<string, any>, inputSchema?: Schema): string => {

  const userSchema = inputSchema ?? schema;

  const contentNode = userSchema.nodeFromJSON(json);
  const html = DOMSerializer.fromSchema(userSchema).serializeFragment(contentNode.content);

  const div = document.createElement('div');
  div.appendChild(html);
  return div.innerHTML;
};

export const toDoc = (html: string, inputSchema?: Schema): Record<string, any> => {
  const userSchema = inputSchema ?? schema;

  const el = document.createElement('div');
  el.innerHTML = html;

  return DOMParser.fromSchema(userSchema).parse(el).toJSON();
};
