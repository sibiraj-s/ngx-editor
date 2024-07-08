import { EditorState, Transaction, type Command } from 'prosemirror-state';

export const removeLink = (): Command => {
  return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
    const { doc, selection, tr, schema } = state;
    const { $head: { pos }, from, to } = selection;

    const linkMark = schema.marks['link'];

    // if the cursor is on the link without any selection
    if (from === to) {
      const $pos = doc.resolve(pos);
      const linkStart = pos - $pos.textOffset;
      const linkEnd = linkStart + $pos.parent.child($pos.index()).nodeSize;

      tr.removeMark(linkStart, linkEnd, linkMark);
    } else {
      tr.removeMark(from, to, linkMark);
    }

    if (!tr.docChanged) {
      return false;
    }

    dispatch?.(tr);
    return true;
  };
};

export default removeLink;
