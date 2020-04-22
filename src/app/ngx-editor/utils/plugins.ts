import { Plugin } from 'prosemirror-state';
import { history, undo, redo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { schema } from 'prosemirror-schema-basic';

import { ComputedOptions } from '../types';

import menu from '../plugins/menu';
import placeholder from '../plugins/placeholder';

const isMacOs = /Mac/.test(navigator.platform);

function getHistoryKeyMap() {
  const historyMap = {};

  historyMap['Mod-z'] = undo;

  if (isMacOs) {
    historyMap['Shift-Mod-z'] = redo;
  } else {
    historyMap['Mod-y'] = redo;
  }

  return historyMap;
}

export const getPlugins = (options: ComputedOptions): Plugin[] => {
  const historyKeyMap = getHistoryKeyMap();

  const plugins = [
    history(),
    keymap(baseKeymap),
    keymap(historyKeyMap),
    keymap({
      'Mod-b': toggleMark(schema.marks.strong),
      'Mod-i': toggleMark(schema.marks.em),
      'Mod-`': toggleMark(schema.marks.code)
    }),
    placeholder(options.placeholder),
  ];

  if (options.toolbar) {
    plugins.push(menu(options.toolbar));
  }

  return plugins;
};
