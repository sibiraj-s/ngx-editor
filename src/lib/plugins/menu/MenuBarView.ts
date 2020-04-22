import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { MarkType, Mark } from 'prosemirror-model';

import { MenuItem, Toolbar } from '../../types';
import { MENU_WRAPPER_CLASSNAME, MENU_ITEM_CLASSNAME } from './constants';
import getMenu from './getMenu';

class MenuBarView {
  menu: MenuItem[];
  editorView: EditorView;

  dom: HTMLElement;

  constructor(toolbar: Toolbar, editorView: EditorView) {
    const menu = getMenu(toolbar);
    this.editorView = editorView;

    // remove elements without commands
    this.menu = menu.filter(menuItem => menuItem.command);

    this.dom = document.createElement('div');
    this.dom.className = MENU_WRAPPER_CLASSNAME;

    menu.forEach(({ dom }) => this.dom.appendChild(dom));

    this.update();

    this.dom.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();
      editorView.focus();

      this.menu.forEach(({ command, dom }) => {
        if (dom.contains(e.target as HTMLElement)) {
          command(editorView.state, editorView.dispatch, editorView);
        }
      });
    });
  }

  getIsElementActive(state: EditorState, type: MarkType): boolean | Mark {
    const { from, $from, to, empty } = state.selection;

    if (empty) {
      return type.isInSet(state.storedMarks || $from.marks());
    } else {
      return state.doc.rangeHasMark(from, to, type);
    }
  }

  update() {
    this.menu.forEach(({ command, dom, key }) => {
      const canShowItem = command(this.editorView.state, null, this.editorView);
      const state = this.editorView.state;

      const markType = state.schema.marks[key];

      const isActive = !!this.getIsElementActive(state, markType);

      dom.style.display = canShowItem ? '' : 'none';

      dom.classList.toggle(`${MENU_ITEM_CLASSNAME}__active`, isActive);
    });
  }

  destroy() {
    this.dom.remove();
  }
}

export default MenuBarView;
