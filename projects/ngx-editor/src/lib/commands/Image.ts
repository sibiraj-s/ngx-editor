import { EditorState, NodeSelection } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';

import { Dispatch } from './types';

export interface ImageAttrs {
  alt?: string;
  title?: string;
  width?: string;
}

class Image {
  insert(src: string, attrs: ImageAttrs): Command {
    return (state: EditorState, dispatch?: Dispatch): boolean => {
      const { schema, tr, selection } = state;

      const type = schema.nodes.image;
      if (!type) {
        return false;
      }

      const imageAttrs = {
        width: null,
        src,
        ...attrs,
      };

      if (!imageAttrs.width && selection instanceof NodeSelection && selection.node.type === type) {
        imageAttrs.width = selection.node.attrs['width'];
      }

      tr.replaceSelectionWith(type.createAndFill(imageAttrs));

      const resolvedPos = tr.doc.resolve(
        tr.selection.anchor - tr.selection.$anchor.nodeBefore.nodeSize,
      );

      tr
        .setSelection(new NodeSelection(resolvedPos))
        .scrollIntoView();

      if (tr.docChanged) {
        dispatch?.(tr);
        return true;
      }

      return false;
    };
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
