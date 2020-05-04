import { toggleMark } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { MarkType, NodeType } from 'prosemirror-model';

import schema from '../../schema';

import isNodeActive from '../../pm-tools/helpers/isNodeActive';
import isMarkActive from '../../pm-tools/helpers/isMarkActive';
import toggleList from '../../pm-tools/commands/toggleList';

import { getIconSvg } from '../../utils/icons';
import { Toolbar, MenuItemMeta } from '../../types';
import menuItemsMeta from './meta';

const MENU_ITEM_CLASSNAME = 'NgxEditor-MenuItem';

const isListItem = (type: NodeType) => {
  return (
    type === schema.nodes.list_item ||
    type === schema.nodes.ordered_list ||
    type === schema.nodes.bullet_list
  );
};

class MenuItemView {
  menuItem: MenuItemMeta;
  dom: HTMLElement;
  editorView: EditorView;

  constructor(menuItem: MenuItemMeta, editorView: EditorView) {
    this.menuItem = menuItem;
    this.editorView = editorView;
    this.dom = this.getDom();
    this.setupEventListeners();
  }

  getDom(): HTMLElement {
    const div = document.createElement('div');

    div.classList.add(MENU_ITEM_CLASSNAME);
    div.classList.add(`${MENU_ITEM_CLASSNAME}__${name}`);
    div.title = name;
    div.innerHTML = getIconSvg(this.menuItem.icon);

    return div;
  }

  private setupEventListeners() {
    this.dom.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();

      if (this.menuItem.type === 'mark') {
        const command = toggleMark(schema.marks[this.menuItem.key]);
        command(this.editorView.state, this.editorView.dispatch);
      }

      if (this.menuItem.type === 'node') {
        const type = schema.nodes[this.menuItem.key];

        if (isListItem(type)) {
          const command = toggleList(type, schema.nodes.list_item);
          command(this.editorView.state, this.editorView.dispatch);
        }
      }
    });
  }

  update(state: EditorState): void {
    const menuItem = this.menuItem;
    let isActive = false;

    if (menuItem.type === 'mark') {
      const type: MarkType = schema.marks[menuItem.key];
      isActive = isMarkActive(state, type);
    }

    if (menuItem.type === 'node') {
      const type: NodeType = schema.nodes[menuItem.key];
      isActive = isNodeActive(state, type);
    }

    this.dom.classList.toggle(`${MENU_ITEM_CLASSNAME}__active`, isActive);
  }
}

function getSeperatorDom(): HTMLElement {
  const div = document.createElement('div');
  div.className = `${MENU_ITEM_CLASSNAME}__Seperator`;
  return div;
}

class MenuItems {
  private toolbar: Toolbar;
  private menuDom: HTMLElement;
  private editorView: EditorView;

  updates = [];

  constructor(toolbar: Toolbar, editorView: EditorView, menuDom: HTMLElement) {
    this.toolbar = toolbar;
    this.editorView = editorView;
    this.menuDom = menuDom;
  }

  render() {
    this.toolbar.forEach((group, toolbarIndex) => {
      const isLastMenuGroup = this.toolbar.length - 1 === toolbarIndex;

      group.forEach((menuName, menuIndex) => {
        const isLastMenuItem = group.length - 1 === menuIndex;

        const menuItem = menuItemsMeta[menuName];

        if (menuItem) {
          const menuItemView = new MenuItemView(menuItem, this.editorView);
          const update = menuItemView.update.bind(menuItemView);

          this.menuDom.appendChild(menuItemView.dom);
          this.updates.push(update);

          if (isLastMenuItem && !isLastMenuGroup) {
            const seperatorDom = getSeperatorDom();
            this.menuDom.appendChild(seperatorDom);
          }
        }
      });
    });
  }

  update(state: EditorState) {
    this.updates.forEach(update => {
      update(state);
    });
  }
}


export default MenuItems;
