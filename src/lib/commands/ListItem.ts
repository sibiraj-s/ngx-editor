import { NodeType, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { liftListItem, wrapInList } from 'prosemirror-schema-list';

import { isNodeActive } from 'ngx-editor/helpers';

import { SimpleCommand } from './types';

class ListItemToggle implements SimpleCommand {
  isBulletList = false;

  constructor(isBulletList = false) {
    this.isBulletList = isBulletList;
  }

  getType(schema: Schema): NodeType {
    return this.isBulletList ? schema.nodes.bullet_list : schema.nodes.ordered_list;
  }

  toggle(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const { schema } = state;

    const type = this.getType(schema);
    if (!type) {
      return false;
    }

    if (this.isActive(state)) {
      return liftListItem(schema.nodes.list_item)(state, dispatch);
    }

    return wrapInList(type)(state, dispatch);
  }

  isActive(state: EditorState): boolean {
    const { schema } = state;

    const type = this.getType(schema);
    if (!type) {
      return false;
    }

    return isNodeActive(state, type);
  }

  canExecute(state: EditorState): boolean {
    return this.toggle(state, null);
  }
}

export default ListItemToggle;
