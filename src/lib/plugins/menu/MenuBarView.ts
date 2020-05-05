import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';

import { Toolbar } from '../../types';

import { renderMenu } from './menu';

class MenuBarView {
  toolbar: Toolbar;
  view: EditorView;

  dom: HTMLElement;

  updateMenuItems: (state: EditorState) => void;

  constructor(toolbar: Toolbar, editorView: EditorView) {
    // const menu = getMenu(toolbar);
    this.view = editorView;
    this.toolbar = toolbar;

    this.render();
    this.update();
  }

  render() {
    const menuDom = document.createElement('div');
    menuDom.className = 'NgxEditor-MenuBar';

    const { update } = renderMenu(this.toolbar, this.view, menuDom);
    this.updateMenuItems = update;

    this.view.dom.parentNode.insertBefore(menuDom, this.view.dom);
  }

  update() {
    this.updateMenuItems(this.view.state);
  }
}

export default MenuBarView;
