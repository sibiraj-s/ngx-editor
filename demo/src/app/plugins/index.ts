import { menu, placeholder } from 'ngx-editor';

import { undo, redo, history } from 'prosemirror-history';
import { splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';
import { keymap } from 'prosemirror-keymap';
import { toggleMark, baseKeymap } from 'prosemirror-commands';
import { Plugin } from 'prosemirror-state';

import codemirrorMenu from './menu/codemirror';
import { buildInputRules } from './input-rules';
import schema from '../schema';

const isMacOs = /Mac/.test(navigator.platform);

export type KeyMap = { [key: string]: any };

const getHistoryKeyMap = (): KeyMap => {
  const historyMap: KeyMap = {};

  historyMap['Mod-z'] = undo;

  if (isMacOs) {
    historyMap['Shift-Mod-z'] = redo;
  } else {
    historyMap['Mod-y'] = redo;
  }

  return historyMap;
};

const getListKeyMap = (): KeyMap => {
  const listMap: KeyMap = {};

  listMap.Enter = splitListItem(schema.nodes.list_item);
  listMap['Mod-['] = liftListItem(schema.nodes.list_item);
  listMap['Mod-]'] = sinkListItem(schema.nodes.list_item);
  listMap.Tab = sinkListItem(schema.nodes.list_item);

  return listMap;
};

const getPlugins = (): Plugin[] => {
  const historyKeyMap = getHistoryKeyMap();
  const listKeyMap = getListKeyMap();

  const plugins = [
    history(),
    keymap({
      'Mod-b': toggleMark(schema.marks.strong),
      'Mod-i': toggleMark(schema.marks.em),
      'Mod-`': toggleMark(schema.marks.code),
    }),
    keymap(historyKeyMap),
    keymap(listKeyMap),
    keymap(baseKeymap),
    buildInputRules(schema),
    menu({
      toolbar: [
        ['bold', 'italic'],
        ['code'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        [codemirrorMenu]
      ],
      labels: {
        bold: 'Bold',
        italics: 'Italics',
        code: 'Code',
        ordered_list: 'Ordered List',
        bullet_list: 'Bullet List',
        heading: 'Header'
      }
    }),
    placeholder('Type Something here...')
  ];

  return plugins;
};

export default getPlugins();
