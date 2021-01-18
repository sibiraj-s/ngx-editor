import { splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';
import { keymap } from 'prosemirror-keymap';
import { toggleMark, baseKeymap } from 'prosemirror-commands';
import { Plugin } from 'prosemirror-state';

import { image } from 'ngx-editor/plugins';

import { buildInputRules } from './input-rules';
import schema from '../schema';

const getListKeyMap = (): Record<string, any> => {
  const listMap: Record<string, any> = {};

  listMap.Enter = splitListItem(schema.nodes.list_item);
  listMap['Mod-['] = liftListItem(schema.nodes.list_item);
  listMap['Mod-]'] = sinkListItem(schema.nodes.list_item);
  listMap.Tab = sinkListItem(schema.nodes.list_item);

  return listMap;
};

const getPlugins = (): Plugin[] => {
  const listKeyMap = getListKeyMap();

  const plugins = [
    keymap({
      'Mod-b': toggleMark(schema.marks.strong),
      'Mod-i': toggleMark(schema.marks.em),
      'Mod-`': toggleMark(schema.marks.code),
    }),
    keymap(listKeyMap),
    keymap(baseKeymap),
    buildInputRules(schema),
    image({
      resize: true,
    })
  ];

  return plugins;
};

export default getPlugins();
