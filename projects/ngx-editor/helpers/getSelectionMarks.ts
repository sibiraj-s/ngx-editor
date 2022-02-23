import { EditorState } from 'prosemirror-state';
import { Mark } from 'prosemirror-model';

export const getSelectionMarks = (state: EditorState): Mark[] => {
  let marks: Mark[] = [];

  const { selection, storedMarks } = state;
  const { from, to, empty, $from } = selection;

  if (empty) {
    marks = storedMarks || $from.marks();
  } else {
    state.doc.nodesBetween(from, to, (node) => {
      marks = [...marks, ...node.marks];
    });
  }

  return marks;
};

export default getSelectionMarks;
