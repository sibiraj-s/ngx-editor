import { MarkType, NodeType, Schema } from 'prosemirror-model';
import { Command, Plugin } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { toggleMark, baseKeymap, chainCommands, exitCode } from 'prosemirror-commands';
import { splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';
import { history, undo, redo } from 'prosemirror-history';
import {
  inputRules, wrappingInputRule, textblockTypeInputRule,
  smartQuotes, emDash, ellipsis, InputRule,
} from 'prosemirror-inputrules';
import { columnResizing, tableEditing, goToNextCell } from 'prosemirror-tables';
import { markInputRule } from 'ngx-editor/helpers';

import taskList from './plugins/task-list';

interface Options {
  history: boolean;
  keyboardShortcuts: boolean;
  inputRules: boolean;
}

interface ShortcutOptions {
  history: boolean;
}

const isMacOs = typeof navigator !== 'undefined'
  ? (/Mac/).test(navigator.platform)
  : false;

// Input rules ref: https://github.com/ProseMirror/prosemirror-example-setup/

// : (NodeType) → InputRule
// Given a blockquote node type, returns an input rule that turns `"> "`
// at the start of a textblock into a blockquote.
const blockQuoteRule = (nodeType: NodeType): InputRule => {
  return wrappingInputRule(/^\s*>\s$/, nodeType);
};

// : (NodeType) → InputRule
// Given a list node type, returns an input rule that turns a number
// followed by a dot at the start of a textblock into an ordered list.
const orderedListRule = (nodeType: NodeType): InputRule => {
  return wrappingInputRule(
    /^(?<order>\d{1,9})\.\s$/,
    nodeType,
    (match) => ({ order: Number(match.groups['order']) }),
    (match, node) => node.childCount + node.attrs['order'] === Number(match.groups['order']),
  );
};

// : (NodeType) → InputRule
// Given a list node type, returns an input rule that turns a bullet
// (dash, plush, or asterisk) at the start of a textblock into a
// bullet list.
const bulletListRule = (nodeType: NodeType): InputRule => {
  return wrappingInputRule(/^\s*(?:[-+*])\s$/, nodeType);
};

// : (NodeType) → InputRule
// Given a code block node type, returns an input rule that turns a
// textblock starting with three backticks into a code block.
const codeBlockRule = (nodeType: NodeType): InputRule => {
  return textblockTypeInputRule(/^```$/, nodeType);
};

// : (NodeType, number) → InputRule
// Given a node type and a maximum level, creates an input rule that
// turns up to that number of `#` characters followed by a space at
// the start of a textblock into a heading whose level corresponds to
// the number of `#` signs.
const headingRule = (nodeType: NodeType, maxLevel: number): InputRule => {
  return textblockTypeInputRule(
    new RegExp(`^(#{1,${maxLevel}})\\s$`),
    nodeType,
    (match) => ({ level: match[1].length }),
  );
};

// : (MarkType) → InputRule
// Wraps matching text with bold mark
const boldRule = (markType: MarkType): InputRule => {
  // eslint-disable-next-line prefer-named-capture-group
  return markInputRule(/(?:^|\s)(?:(\*\*|__)(?:([^*_]+))(\*\*|__))$/, markType);
};

// : (MarkType) → InputRule
// Wraps matching text with em mark
const emRule = (markType: MarkType): InputRule => {
  // eslint-disable-next-line prefer-named-capture-group
  return markInputRule(/(?:^|\s)(?:(\*|_)(?:([^*_]+))(\*|_))$/, markType);
};

// : (Schema) → Plugin
// A set of input rules for creating the basic block quotes, lists,
// code blocks, and heading.
const buildInputRules = (schema: Schema): Plugin => {
  const rules = smartQuotes.concat(ellipsis, emDash);

  rules.push(boldRule(schema.marks['strong']));
  rules.push(emRule(schema.marks['em']));
  rules.push(blockQuoteRule(schema.nodes['blockquote']));
  rules.push(orderedListRule(schema.nodes['ordered_list']));
  rules.push(bulletListRule(schema.nodes['bullet_list']));
  rules.push(codeBlockRule(schema.nodes['code_block']));
  rules.push(headingRule(schema.nodes['heading'], 6));

  return inputRules({ rules });
};

// runs a list item command for each list item type in the schema
const forListItems = (schema: Schema, command: (itemType: NodeType) => Command): Command => {
  const itemTypes = [schema.nodes['list_item'], schema.nodes['task_item']].filter(Boolean);
  return chainCommands(...itemTypes.map(command));
};

// splitting inside the text of an item copies its attributes to the new item,
// so uncheck the new item when splitting a checked task item
const splitItem = (itemType: NodeType): Command => {
  return (state, dispatch) => {
    const { $from } = state.selection;

    // an empty item is lifted out of the list instead of split
    const isSplit = $from.parent.content.size > 0;

    // at the start of the item, the text moves to the new item below
    // and keeps the checked state, so the empty item above is the new one
    const atStart = $from.parentOffset === 0 && $from.index(-1) === 0;

    return splitListItem(itemType)(state, dispatch && ((tr) => {
      const $pos = tr.selection.$from;
      const depth = $pos.depth - 1;
      const item = $pos.node(depth);

      if (isSplit && item.type === itemType && item.attrs['checked']) {
        const itemPos = $pos.before(depth);
        const newItemPos = atStart ? itemPos - tr.doc.resolve(itemPos).nodeBefore.nodeSize : itemPos;
        tr.setNodeAttribute(newItemPos, 'checked', false);
      }

      dispatch(tr);
    }));
  };
};

export const getKeyboardShortcuts = (schema: Schema, options: ShortcutOptions) => {
  const historyKeyMap: Record<string, Command> = {};

  historyKeyMap['Mod-z'] = undo;
  if (isMacOs) {
    historyKeyMap['Shift-Mod-z'] = redo;
  } else {
    historyKeyMap['Mod-y'] = redo;
  }

  const plugins = [
    keymap({
      'Mod-b': toggleMark(schema.marks['strong']),
      'Mod-i': toggleMark(schema.marks['em']),
      'Mod-u': toggleMark(schema.marks['u']),
      'Mod-`': toggleMark(schema.marks['code']),
    }),
    keymap({
      'Enter': forListItems(schema, splitItem),
      'Shift-Enter': chainCommands(exitCode, (state, dispatch) => {
        const { tr } = state;
        const br = schema.nodes['hard_break'];
        dispatch(tr.replaceSelectionWith(br.create()).scrollIntoView());
        return true;
      }),
      'Mod-[': forListItems(schema, liftListItem),
      'Mod-]': forListItems(schema, sinkListItem),
      'Tab': forListItems(schema, sinkListItem),
    }),
    keymap(baseKeymap),
  ];

  if (schema.nodes['table']) {
    plugins.push(
      keymap({
        'Tab': goToNextCell(1),
        'Shift-Tab': goToNextCell(-1),
      }),
    );
  }

  if (options.history) {
    plugins.push(keymap(historyKeyMap));
  }

  return plugins;
};

const getDefaultPlugins = (schema: Schema, options: Options): Plugin[] => {
  const plugins: Plugin[] = [];

  if (options.keyboardShortcuts) {
    plugins.push(...getKeyboardShortcuts(schema, { history: options.history }));
  }

  if (options.history) {
    plugins.push(history());
  }

  if (options.inputRules) {
    plugins.push(buildInputRules(schema));
  }
  
  if (schema.nodes['table']) {
    plugins.push(columnResizing(), tableEditing());
  }

  if (schema.nodes['task_item']) {
    plugins.push(taskList());
  }

  return plugins;
};

export default getDefaultPlugins;
