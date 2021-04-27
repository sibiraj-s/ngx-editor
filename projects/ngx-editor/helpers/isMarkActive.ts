import { EditorState } from 'prosemirror-state';
import { MarkType } from 'prosemirror-model';

export const isMarkActive = (state: EditorState, type: MarkType): boolean => {
  const { from, $from, to, empty } = state.selection;

  if (empty) {
    return !!type.isInSet(state.storedMarks || $from.marks());
  } else {
    return state.doc.rangeHasMark(from, to, type);
  }
};

export default isMarkActive;
