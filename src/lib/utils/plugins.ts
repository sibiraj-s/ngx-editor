import { Plugin } from 'prosemirror-state';
import { history, undo, redo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';

import schema from '../schema';

import { ComputedOptions, KeyMap } from '../types';

import menu from '../plugins/menu';
import placeholder from '../plugins/placeholder';
import { splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';

const isMacOs = /Mac/.test(navigator.platform);

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

export const getPlugins = (options: ComputedOptions): Plugin[] => {
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
    placeholder(options.placeholder),
  ];

  if (options.toolbar) {
    plugins.push(menu(options.toolbar));
  }

  return plugins;
};
