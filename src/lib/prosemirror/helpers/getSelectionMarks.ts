import { EditorState } from 'prosemirror-state';
import { Mark } from 'prosemirror-model';

export const getSelectionMarks = (state: EditorState): Mark[] => {
  let marks: Mark[] = [];

  const { selection: { from, to } } = state;

  state.doc.nodesBetween(from, to, node => {
    marks = [...marks, ...node.marks];
  });

  return marks;
};

export default getSelectionMarks;
