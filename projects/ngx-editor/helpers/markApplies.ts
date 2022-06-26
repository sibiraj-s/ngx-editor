import { MarkType, Node as PrmosemirroNode } from 'prosemirror-model';
import { SelectionRange } from 'prosemirror-state';

// Ref: https://github.com/ProseMirror/prosemirror-commands/blob/master/src/commands.js
export const markApplies = (doc: PrmosemirroNode, ranges: readonly SelectionRange[], type: MarkType): boolean => {
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
};

export default markApplies;
