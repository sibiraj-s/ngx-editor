import { EditorView } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';

import { Toolbar } from '../../types';
import MenuBarView from './MenuBarView';

function menuPlugin(toolbar: Toolbar): Plugin {
  return new Plugin({
    key: new PluginKey('menu'),
    view(editorView: EditorView): MenuBarView {
      const menuView = new MenuBarView(toolbar, editorView);
      editorView.dom.parentNode.insertBefore(menuView.dom, editorView.dom);
      return menuView;
    },
  });
}

const menu = (toolbarOptions: Toolbar) => {
  return menuPlugin(toolbarOptions);
};

export default menu;
