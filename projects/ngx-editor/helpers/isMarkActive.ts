import { EditorState } from 'prosemirror-state';
import { MarkType } from 'prosemirror-model';

export const isMarkActive = (state: EditorState, type: MarkType): boolean => {
  const { from, $from, to, empty } = state.selection;

  if (empty) {
    return Boolean(type.isInSet(state.storedMarks || $from.marks()));
  }

  return state.doc.rangeHasMark(from, to, type);
};

export default isMarkActive;
