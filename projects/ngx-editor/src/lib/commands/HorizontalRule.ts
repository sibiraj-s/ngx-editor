import type { NodeType } from 'prosemirror-model';
import { type EditorState, type Transaction, type Command, TextSelection } from 'prosemirror-state';

import { canInsert } from 'ngx-editor/helpers';

import { InsertCommand } from './types';

class HorizontalRule implements InsertCommand {
  insert(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { schema, tr } = state;

      const type: NodeType = schema.nodes['horizontal_rule'];

      if (!type) {
        return false;
      }

      const { selection } = state;
      const { $from } = selection;

      if (selection.empty && $from.parent.isTextblock
        && !$from.node(-1).canReplaceWith($from.index(-1), $from.index(-1), type)) {
        // the rule cannot sit before this textblock (e.g. a list item must start with a paragraph),
        // so split it and place the rule between the halves instead of letting the rule escape the list
        tr.split($from.pos).insert($from.pos + 1, type.create());
      } else {
        tr.replaceSelectionWith(type.create());
      }

      // position right after the inserted rule
      let end = tr.selection.from;
      tr.steps[tr.steps.length - 1].getMap().forEach((_from, _to, _newFrom, newTo) => {
        end = newTo;
      });

      const $end = tr.doc.resolve(end);
      const { paragraph } = schema.nodes;

      if ($end.parent.isTextblock) {
        // the rule split a paragraph, cursor is already at the start of its second half
        tr.setSelection(TextSelection.create(tr.doc, end));
      } else if ($end.nodeAfter?.isTextblock) {
        tr.setSelection(TextSelection.create(tr.doc, end + 1));
      } else if (paragraph && $end.parent.canReplaceWith($end.index(), $end.index(), paragraph)) {
        // nothing editable follows the rule, add an empty paragraph so the cursor has somewhere to land
        tr.insert(end, paragraph.create());
        tr.setSelection(TextSelection.create(tr.doc, end + 1));
      }

      dispatch(tr.scrollIntoView());
      return true;
    };
  }

  canExecute(state: EditorState): boolean {
    return canInsert(state, state.schema.nodes['horizontal_rule']);
  }
}

export default HorizontalRule;
