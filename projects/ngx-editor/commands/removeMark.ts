import { MarkType } from 'prosemirror-model';
import { EditorState, TextSelection, Transaction } from 'prosemirror-state';

import { markApplies } from 'ngx-editor/helpers';
import { Command } from 'prosemirror-commands';

export const removeMark = (type: MarkType): Command => {
  return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
    const { tr, selection, storedMarks, doc } = state;
    const { empty, ranges } = selection;

    if (empty && selection instanceof TextSelection) {
      const { $cursor } = selection;

      if (!$cursor || !markApplies(state.doc, ranges, type)) {
        return false;
      }

      if (type.isInSet(storedMarks || $cursor.marks())) {
        tr.removeStoredMark(type);
        dispatch?.(tr);
        return true;
      }
    } else {
      for (const range of ranges) {
        const { $from, $to } = range;
        const hasMark = doc.rangeHasMark($from.pos, $to.pos, type);

        if (hasMark) {
          tr.removeMark($from.pos, $to.pos, type);
        }
      }

      if (!tr.docChanged) {
        return false;
      }

      dispatch?.(tr.scrollIntoView());
    }

    return false;
  };
};
