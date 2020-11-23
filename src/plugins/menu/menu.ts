import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';

import {
  MenuItemSpec,
  ToolbarItem,
  ToolbarDropdownGroupKeys,
  ToolbarDropdownGroupValues,
  MenuOptions,
} from '../types';

import { getIconSvg } from '../utils/icons';
import flatDeep from '../utils/flatDeep';

import SimpleMenuItem, {
  ACTIVE_MENU_ITEM_CLASSNAME, DISABLED_CLASSNAME, MENU_ITEM_CLASSNAME, MENU_ITEM_ICON_CLASSNAME
} from './views/SimpleMenuItem';
import DropDownView from './views/Dropdown';

import getSeperator from './items/seperator';
import link from './items/link';

import menuItemsMeta from './meta';

const DROPDOWN_ITEMS = new Map();
DROPDOWN_ITEMS.set('heading', ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

const builtInMenuItems = {
  link
};

export const renderMenu = (options: MenuOptions, editorView: EditorView, menuDom: HTMLElement) => {
  const updates: any[] = [];

  const toolbar = options.toolbar;

  toolbar.forEach((group: ToolbarItem[], toolbarIndex: number): void => {
    const isLastMenuGroup = toolbar.length - 1 === toolbarIndex;

    group.forEach((toolbarItem: ToolbarItem, menuIndex: number): void => {
      const isLastMenuItem = group.length - 1 === menuIndex;

      // render dropdown
      if (typeof toolbarItem === 'object') {
        Object.keys(toolbarItem).forEach((dropdownGroup: ToolbarDropdownGroupKeys) => {
          if (DROPDOWN_ITEMS.has(dropdownGroup)) {
            const dropdown: ToolbarDropdownGroupValues = toolbarItem[dropdownGroup];

            const dropdownView = new DropDownView(dropdownGroup, dropdown, editorView, options);
            const rendered = dropdownView.render();
            updates.push(rendered.updates);
            menuDom.appendChild(rendered.dom);
          } else {
            console.warn('Unkown dropdown group:', dropdownGroup);
          }
        });
      }

      // render Icons
      if (typeof toolbarItem === 'string') {
        const menuItem = menuItemsMeta[toolbarItem];

        const labels = options.labels;

        if (menuItem) {
          const spec: MenuItemSpec = {
            classNames: [
              MENU_ITEM_CLASSNAME,
              MENU_ITEM_ICON_CLASSNAME,
            ],
            icon: {
              default: getIconSvg(menuItem.icon),
              alt: getIconSvg(menuItem.toggleIcon)
            },
            attrs: {
              title: labels[menuItem.i18nKey]
            },
            activeClass: ACTIVE_MENU_ITEM_CLASSNAME,
            disabledClass: DISABLED_CLASSNAME
          };

          if (Object.keys(builtInMenuItems).includes(toolbarItem)) {
            const { dom, update } = builtInMenuItems?.[toolbarItem](editorView, spec);
            menuDom.appendChild(dom);
            updates.push(update);
          } else {
            const menuItemView = new SimpleMenuItem(menuItem, editorView, spec);
            const { dom, update } = menuItemView.render();

            menuDom.appendChild(dom);
            updates.push(update);
          }
        }
      }

      if (typeof toolbarItem === 'function') {
        const { dom, update } = toolbarItem(editorView, null);
        menuDom.appendChild(dom);
        updates.push(update);
      }

      if (isLastMenuItem && !isLastMenuGroup) {
        const seperatorDom = getSeperator();
        menuDom.appendChild(seperatorDom);
      }
    });
  });

  const combinedUpdates = flatDeep(updates, Infinity);

  return {
    update(state: EditorState): void {
      combinedUpdates.forEach((update: (state: EditorState) => void) => {
        update(state);
      });
    }
  };
};
