import { Schema, NodeType } from 'prosemirror-model';

export const isListItem = (type: NodeType, schema: Schema) => {
  return (
    type === schema.nodes.list_item ||
    type === schema.nodes.ordered_list ||
    type === schema.nodes.bullet_list
  );
};
