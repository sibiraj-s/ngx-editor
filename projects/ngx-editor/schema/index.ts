import { Schema } from 'prosemirror-model';

import marks from './marks';
import nodes from './nodes';

const schema = new Schema({
  marks,
  nodes,
});

export default schema;
