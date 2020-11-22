import { EditorView } from 'prosemirror-view';

export const removeLink = (view: EditorView) => {
  const { state: { doc, selection, tr }, dispatch } = view;
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

  dispatch(tr);
};

export default removeLink;
