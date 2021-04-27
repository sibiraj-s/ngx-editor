import { Command } from 'prosemirror-commands';
import { EditorState, Transaction } from 'prosemirror-state';

export const removeLink = (): Command => {
  return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
    const { doc, selection, tr } = state;
    const { $head: { pos }, from, to } = selection;

    // if the cursor is on the link without any selection
    if (from === to) {
      const $pos = doc.resolve(pos);
      const linkStart = pos - $pos.textOffset;
      const linkEnd = linkStart + $pos.parent.child($pos.index()).nodeSize;

      tr.removeMark(linkStart, linkEnd);
    } else {
      tr.removeMark(from, to);
    }

    if (!tr.docChanged) {
      return false;
    }

    dispatch?.(tr);
    return true;
  };
};

export default removeLink;
