import { EditorView } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';

import { Toolbar, MenuLabels, MenuOptions } from '../types';
import MenuBarView from './MenuBarView';

export { MenuItem } from './views/base/MenuItem';

const DEFAULT_TOOLBAR: Toolbar = [
  ['bold', 'italic'],
  ['code', 'blockquote'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['link', 'image']
];

const DEFAULT_LABELS: MenuLabels = {
  bold: 'Bold',
  italics: 'Italics',
  code: 'Code',
  ordered_list: 'Ordered List',
  bullet_list: 'Bullet List',
  heading: 'Heading',
  blockquote: 'Quote',
  link: 'Link',
  image: 'Image'
};

const DEFAULT_OPTIONS: MenuOptions = {
  toolbar: DEFAULT_TOOLBAR,
  labels: DEFAULT_LABELS
};

function menuPlugin(options: MenuOptions): Plugin {
  return new Plugin({
    key: new PluginKey('menu'),
    view(editorView: EditorView): MenuBarView {
      return new MenuBarView(editorView, options);
    },
  });
}

const menu = (options: MenuOptions = DEFAULT_OPTIONS) => {
  const mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);
  return menuPlugin(mergedOptions);
};

export default menu;
