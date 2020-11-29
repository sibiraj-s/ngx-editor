import { Schema } from 'prosemirror-model';

import nodes from './schema/nodes';
import marks from './schema/marks';

export { default as marks } from './schema/marks';
export { default as nodes } from './schema/nodes';

export const schema = new Schema({
  marks,
  nodes
});
