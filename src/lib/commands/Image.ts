import { EditorState, NodeSelection } from 'prosemirror-state';

import { Dispatch } from './types';

class Image {
  execute(attrs = {}, state: EditorState, dispatch: Dispatch): boolean {
    const { schema, tr, selection } = state;

    const type = schema.nodes.image;
    if (!type) {
      return false;
    }

    const nodeAttrs = { ...attrs, width: null };

    if (selection instanceof NodeSelection && selection.node.type === type) {
      nodeAttrs.width = selection.node.attrs.width;
    }

    tr
      .replaceSelectionWith(type.createAndFill(nodeAttrs))
      .scrollIntoView();

    if (tr.docChanged) {
      dispatch?.(tr);
      return true;
    }

    return false;
  }

  isActive(state: EditorState): boolean {
    const { selection } = state;
    if (selection instanceof NodeSelection) {
      return selection.node.type.name === 'image';
    }

    return false;
  }
}

export default Image;
