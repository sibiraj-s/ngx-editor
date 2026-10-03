import { AllSelection, EditorState, TextSelection } from 'prosemirror-state';

// ctrl+a creates an AllSelection, which has no parent nodes to lift,
// so use a text selection over the same content instead
export const withTextSelection = (state: EditorState): EditorState => {
  if (!(state.selection instanceof AllSelection)) {
    return state;
  }

  const { doc } = state;
  const selection = TextSelection.between(doc.resolve(0), doc.resolve(doc.content.size));
  return state.apply(state.tr.setSelection(selection));
};

export default withTextSelection;
