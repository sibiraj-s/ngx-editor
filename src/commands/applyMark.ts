import { MarkType, Node as PrmosemirroNode } from 'prosemirror-model';
import { EditorState, SelectionRange, TextSelection, Transaction } from 'prosemirror-state';

// Ref: https://github.com/ProseMirror/prosemirror-commands/blob/master/src/commands.js

function markApplies(doc: PrmosemirroNode, ranges: SelectionRange[], type: MarkType): boolean {
  for (const range of ranges) {
    const { $from, $to } = range;

    let canApply = $from.depth === 0 ? doc.type.allowsMarkType(type) : false;

    doc.nodesBetween($from.pos, $to.pos, (node: PrmosemirroNode): boolean => {
      if (canApply) {
        return false;
      }

      canApply = node.inlineContent && node.type.allowsMarkType(type);
      return true;
    });

    if (canApply) {
      return true;
    }
  }
  return false;
}

export const applyMark = (type: MarkType, attrs: Record<string, any> = {}) => {
  return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
    const { tr, selection } = state;
    const { $from, $to, empty, ranges } = selection;

    if (empty && selection instanceof TextSelection) {
      const { $cursor } = selection;

      if (!$cursor || !markApplies(state.doc, ranges, type)) {
        return false;
      }

      tr.addStoredMark(type.create(attrs));
    } else {
      tr.addMark($from.pos, $to.pos, type.create(attrs));

      if (!tr.docChanged) {
        return false;
      }
    }

    dispatch?.(tr.scrollIntoView());
    return true;
  };
};
