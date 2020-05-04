import { EditorView } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';

import { Toolbar } from '../../types';
import MenuBarView from './MenuBarView';

function menuPlugin(toolbar: Toolbar): Plugin {
  return new Plugin({
    key: new PluginKey('menu'),
    view(editorView: EditorView): MenuBarView {
      return new MenuBarView(toolbar, editorView);
    },
  });
}

const menu = (toolbarOptions: Toolbar) => {
  return menuPlugin(toolbarOptions);
};

export default menu;
