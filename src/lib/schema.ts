import { Schema } from 'prosemirror-model';
import * as schemaBasic from 'prosemirror-schema-basic';
import * as schemaList from 'prosemirror-schema-list';

const listGroup = 'block';

const listItem = Object.assign({}, schemaList.listItem, { content: 'paragraph block*' });
const orderedList = Object.assign({}, schemaList.orderedList, { content: 'list_item+', group: listGroup });
const bulletList = Object.assign({}, schemaList.bulletList, { content: 'list_item+', group: listGroup });

export const nodes = Object.assign(
  {},
  schemaBasic.nodes,
  {
    list_item: listItem,
    ordered_list: orderedList,
    bullet_list: bulletList
  }
);

const linkMark = Object.assign(
  {},
  schemaBasic.marks.link,
  {
    attrs: {
      ...schemaBasic.marks.link.attrs,
      target: {
        default: '_blank'
      }
    }
  }
);

export const marks = Object.assign(
  {},
  schemaBasic.marks,
  {
    link: linkMark
  }
);

export const schema = new Schema({
  marks,
  nodes
});
