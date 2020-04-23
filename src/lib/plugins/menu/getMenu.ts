import { toggleMark } from 'prosemirror-commands';
import { schema } from 'prosemirror-schema-basic';

import { getIconSvg } from '../../utils/icons';
import { MENU_ITEM_CLASSNAME } from './constants';
import { MenuItem, Toolbar } from '../../types';

function getMenuDom(name: string): HTMLElement {
  const div = document.createElement('div');

  div.classList.add(MENU_ITEM_CLASSNAME);
  div.classList.add(`${MENU_ITEM_CLASSNAME}__${name}`);

  div.title = name;

  div.innerHTML = getIconSvg(name);

  return div;
}

function getSeperatorDom(): HTMLElement {
  const div = document.createElement('div');
  div.className = `${MENU_ITEM_CLASSNAME}__Seperator`;
  return div;
}

const menuItems: { [key: string]: MenuItem } = {
  bold: { key: 'strong', command: toggleMark(schema.marks.strong), dom: getMenuDom('bold') },
  italic: { key: 'em', command: toggleMark(schema.marks.em), dom: getMenuDom('italic') },
  code: { key: 'code', command: toggleMark(schema.marks.code), dom: getMenuDom('code') }
};

const seperator: MenuItem = { key: 'seperator', dom: getSeperatorDom() };

const getMenu = (toolbar: Toolbar): MenuItem[] => {
  const menu = [];

  toolbar.forEach((group, toolbarIndex) => {
    const isLastMenuGroup = toolbar.length - 1 === toolbarIndex;

    group.forEach((menuName, menuIndex) => {
      const isLastMenuItem = group.length - 1 === menuIndex;

      const menuItem = menuItems[menuName];
      if (menuItem) {
        menu.push(menuItem);

        if (isLastMenuItem && !isLastMenuGroup) {
          menu.push(seperator);
        }
      }
    });
  });

  return menu;
};

export default getMenu;
