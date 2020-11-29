# Full featured editor

Use the following config to created a full featured editor

### plugin.ts

```ts
import { undo, redo, history } from 'prosemirror-history';
import {
  splitListItem,
  liftListItem,
  sinkListItem,
} from 'prosemirror-schema-list';
import { keymap } from 'prosemirror-keymap';
import { toggleMark, baseKeymap } from 'prosemirror-commands';
import { Plugin } from 'prosemirror-state';

import { menu, placeholder, link, imagePlugin } from 'ngx-editor/plugins';

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
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
      ],
      labels: {
        bold: 'Bold',
        italics: 'Italics',
        code: 'Code',
        ordered_list: 'Ordered List',
        bullet_list: 'Bullet List',
        heading: 'Header',
        blockquote: 'Quote',
        link: 'Link',
        image: 'Image',
      },
    }),
    placeholder('Type Something here...'),
    link(),
    imagePlugin({
      resize: true,
    }),
  ];

  return plugins;
};

export default getPlugins();
```

### app.module.ts

```ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxEditorModule, schema } from 'ngx-editor';

import plugins from './plugins';

@NgModule({
  imports: [
    FormsModule,
    NgxEditorModule.forRoot({
      schema,
      plugins,
    }),
  ],
})
export class AppModule {}
```
