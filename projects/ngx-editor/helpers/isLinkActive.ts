import { EditorState } from 'prosemirror-state';
import { Mark } from 'prosemirror-model';

import getSelectionMarks from './getSelectionMarks';

export const isLinkActive = (state: EditorState): boolean => {
  const { schema, selection: { anchor, head, from } } = state;

  if (!schema.marks.link) {
    return false;
  }

  const isForwardSelection = anchor === from;
  const linkMarks: Mark[] = getSelectionMarks(state).filter(mark => mark.type === schema.marks.link);

  if (!linkMarks.length) {
    return false;
  }

  const selectionHasOnlyMarks = isForwardSelection ?
    (
      state.doc.rangeHasMark(anchor, anchor + 1, schema.marks.link) &&
      state.doc.rangeHasMark(head - 1, head, schema.marks.link)
    ) : (
      state.doc.rangeHasMark(anchor - 1, anchor, schema.marks.link) &&
      state.doc.rangeHasMark(head, head + 1, schema.marks.link)
    );

  if (linkMarks.length === 1 && selectionHasOnlyMarks) {
    return true;
  }

  return false;
};

export default isLinkActive;
