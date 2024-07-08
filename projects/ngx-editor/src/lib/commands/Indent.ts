import type { EditorState, Transaction, Command } from 'prosemirror-state';

import { clamp } from 'ngx-editor/utils';
import { InsertCommand } from './types';

const indentNodeTypes = ['paragraph', 'heading', 'blockquote'];

type IndentMethod = 'increase' | 'decrease';
const minIndent = 0;
const maxIndent = 10;

const udpateIndentLevel = (tr: Transaction, pos: number, method: IndentMethod): boolean => {
  const node = tr.doc.nodeAt(pos);
  if (!node) { return false; }

  const nodeIndent = node.attrs['indent'] ?? 0;
  const newIndent = clamp(nodeIndent + (method === 'increase' ? 1 : -1), minIndent, maxIndent);

  if (newIndent === nodeIndent || newIndent < minIndent || newIndent > maxIndent) {
    return false;
  }

  const attrs = {
    ...node.attrs,
    indent: newIndent,
  };

  tr.setNodeMarkup(pos, node.type, attrs);
  return true;
};

class Indent implements InsertCommand {
  method: IndentMethod = 'increase';

  constructor(method: IndentMethod) {
    this.method = method;
  }

  insert(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { tr, doc } = state;
      const { from, to } = tr.selection;

      let applicable = false;

      doc.nodesBetween(from, to, (node, pos) => {
        const nodeType = node.type;

        if (indentNodeTypes.includes(nodeType.name)) {
          applicable = udpateIndentLevel(tr, pos, this.method);
          return false;
        } else if (node.type.name.includes('list')) {
          return false;
        }

        return true;
      });

      if (!applicable) {
        return false;
      }

      if (tr.docChanged) {
        dispatch?.(tr);
      }

      return true;
    };
  }

  canExecute(state: EditorState): boolean {
    return this.insert()(state);
  }
}

export default Indent;
