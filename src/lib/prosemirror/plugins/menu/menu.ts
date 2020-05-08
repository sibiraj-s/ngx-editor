import { toggleMark } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { MarkType, NodeType } from 'prosemirror-model';

import {
  MenuItemViewSpec,
  ToolbarItem,
  ToolbarDropdownGroupKeys,
  ToolbarDropdownGroupValues,
  MenuOptions
} from '../../../types';

import schema from '../../../schema';

import isNodeActive from '../../helpers/isNodeActive';
import isMarkActive from '../../helpers/isMarkActive';
import { toggleList, toggleBlockType } from '../../commands';

import { getIconSvg } from '../../../utils/icons';
import flatDeep from '../../../utils/flatDeep';

import menuItemsMeta, {MenuItemMeta} from './meta';

const MENU_ITEM_CLASSNAME = 'NgxEditor-MenuItem';

const DROPDOWN_ITEMS = new Map();
DROPDOWN_ITEMS.set('heading', ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

const isListItem = (type: NodeType) => {
  return (
    type === schema.nodes.list_item ||
    type === schema.nodes.ordered_list ||
    type === schema.nodes.bullet_list
  );
};

class DropDownView {
  private dropdownGroup: ToolbarDropdownGroupKeys;
  private dropdownFields: ToolbarDropdownGroupValues;
  private editorView: EditorView;
  private options: MenuOptions;

  dom: HTMLElement;

  updates = [];

  constructor(
    dropdownGroup: ToolbarDropdownGroupKeys,
    dropdownFields: ToolbarDropdownGroupValues,
    editorView: EditorView,
    options: MenuOptions
  ) {
    this.dropdownGroup = dropdownGroup;
    this.dropdownFields = dropdownFields;
    this.editorView = editorView;
    this.options = options;
  }

  getWrapperDom(): HTMLElement {
    let isDropdownOpen = false;
    const dropdownWrapper = document.createElement('div');

    const labels = this.options.labels;

    dropdownWrapper.classList.add(MENU_ITEM_CLASSNAME);
    dropdownWrapper.classList.add(`${MENU_ITEM_CLASSNAME}__Dropdown-Wrapper`);

    // create dropdown content
    const dropdown = document.createElement('div');
    dropdown.classList.add(`${MENU_ITEM_CLASSNAME}__Dropdown`);

    const dropdownText = document.createElement('div');
    dropdownText.classList.add(`${MENU_ITEM_CLASSNAME}__Dropdown-Text`);
    dropdownText.textContent = labels[this.dropdownGroup];

    const dropdownIcon = document.createElement('div');
    dropdownIcon.classList.add(`${MENU_ITEM_CLASSNAME}__Dropdown-Icon`);
    dropdownIcon.innerHTML = getIconSvg('arrow_drop_down');

    dropdown.appendChild(dropdownText);
    dropdown.appendChild(dropdownIcon);

    const dropdownOpenClassName = `${MENU_ITEM_CLASSNAME}__Dropdown-Wrapper-Open`;

    const mouseDownHandler = (e: MouseEvent) => {
      e.preventDefault();
      if (!dropdownWrapper.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    const openDropdown = () => {
      dropdownWrapper.classList.add(dropdownOpenClassName);
      isDropdownOpen = true;
      window.addEventListener('mousedown', mouseDownHandler);
    };

    const closeDropdown = () => {
      dropdownWrapper.classList.remove(dropdownOpenClassName);
      isDropdownOpen = false;
      window.removeEventListener('mousedown', mouseDownHandler);
    };

    dropdown.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      if (!isDropdownOpen) {
        openDropdown();
      } else {
        closeDropdown();
      }
    });

    // create dropdown list
    const dropdownList = document.createElement('div');
    dropdownList.classList.add(`${MENU_ITEM_CLASSNAME}__Dropdown-Menu`);

    this.dropdownFields.forEach(dropdownItem => {
      const menuItem = menuItemsMeta[dropdownItem];

      let text = labels[menuItem.key];

      if (menuItem.key === 'heading') {
        text += ` ${menuItem.attrs.level}`;
      }

      const spec: MenuItemViewSpec = {
        classNames: [
          `${MENU_ITEM_CLASSNAME}__Dropdown-Item`
        ],
        textContent: text,
        attrs: {
          title: text
        }
      };

      const menuItemView = new MenuItemView(menuItem, this.editorView, spec);
      const { update, dom } = menuItemView.render();

      // remove open class once clicked on dropdown value
      dom.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        closeDropdown();
      });

      // wrapper to execute when update is called
      const dropUpdate = (state: EditorState) => {
        update(state);

        const selectedClass = `${MENU_ITEM_CLASSNAME}__Dropdown-Wrapper-Selected`;

        // update the dropdown content heading when a class is selected
        const activeEl = dropdownList.getElementsByClassName(`${MENU_ITEM_CLASSNAME}__Active`);
        if (activeEl.length) {
          const el = activeEl[0];
          dropdownText.textContent = el.textContent;
          dropdownWrapper.classList.add(selectedClass);
        } else {
          // restore default value
          dropdownText.textContent = labels[this.dropdownGroup];
          dropdownWrapper.classList.remove(selectedClass);
        }
      };

      dropdownList.appendChild(dom);
      this.updates.push(dropUpdate);
    });

    dropdownWrapper.appendChild(dropdown);
    dropdownWrapper.appendChild(dropdownList);

    return dropdownWrapper;
  }

  render() {
    this.dom = this.getWrapperDom();

    return {
      dom: this.dom,
      updates: this.updates
    };
  }
}

class MenuItemView {
  private menuItem: MenuItemMeta;
  private editorView: EditorView;
  private spec: MenuItemViewSpec;

  dom: HTMLElement;

  constructor(menuItem: MenuItemMeta, editorView: EditorView, spec: MenuItemViewSpec) {
    this.menuItem = menuItem;
    this.editorView = editorView;
    this.spec = spec;
  }

  render() {
    const dom = this.dom = this.getDom();
    this.setupCommandListeners();

    const update = (state: EditorState): void => {
      const menuItem = this.menuItem;
      let isActive = false;

      if (menuItem.type === 'mark') {
        const type: MarkType = schema.marks[menuItem.key];
        isActive = isMarkActive(state, type);
      }

      if (menuItem.type === 'node') {
        const type: NodeType = schema.nodes[menuItem.key];
        isActive = isNodeActive(state, type, menuItem.attrs);
      }

      dom.classList.toggle(`${MENU_ITEM_CLASSNAME}__Active`, isActive);
    };

    return {
      dom,
      update
    };
  }

  getDom(): HTMLElement {
    const div = document.createElement('div');

    if (this.spec.classNames) {
      this.spec.classNames.forEach(className => {
        div.classList.add(className);
      });
    }

    if (this.spec.attrs) {
      Object.entries(this.spec.attrs).forEach(obj => {
        div.setAttribute(obj[0], obj[1]);
      });
    }

    if (this.spec.innerHTML) {
      div.innerHTML = this.spec.innerHTML;
    }

    if (this.spec.textContent) {
      div.innerHTML = this.spec.textContent;
    }

    return div;
  }

  private setupCommandListeners() {
    this.dom.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();

      // don't execute if not left click
      if (e.buttons !== 1) {
        return;
      }

      if (this.menuItem.type === 'mark') {
        const command = toggleMark(schema.marks[this.menuItem.key]);
        command(this.editorView.state, this.editorView.dispatch);
        return;
      }

      if (this.menuItem.type === 'node') {
        const type = schema.nodes[this.menuItem.key];

        if (isListItem(type)) {
          const command = toggleList(type, schema.nodes.list_item);
          command(this.editorView.state, this.editorView.dispatch);
          return;
        }

        if (type === schema.nodes.heading) {
          const command = toggleBlockType(type, schema.nodes.paragraph, { level: this.menuItem.attrs.level });
          command(this.editorView.state, this.editorView.dispatch);
          return;
        }
      }
    });
  }
}

const getSeperatorDom = (): HTMLElement => {
  const div = document.createElement('div');
  div.className = `${MENU_ITEM_CLASSNAME}__Seperator`;
  return div;
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
          const spec: MenuItemViewSpec = {
            classNames: [
              MENU_ITEM_CLASSNAME,
              `${MENU_ITEM_CLASSNAME}__Icon`,
              `${MENU_ITEM_CLASSNAME}__${menuItem.key}`
            ],
            innerHTML: getIconSvg(menuItem.icon),
            attrs: {
              title: labels[menuItem.i18nKey]
            }
          };

          const menuItemView = new MenuItemView(menuItem, editorView, spec);
          const { update, dom } = menuItemView.render();

          menuDom.appendChild(dom);
          updates.push(update);
        }
      }

      if (isLastMenuItem && !isLastMenuGroup) {
        const seperatorDom = getSeperatorDom();
        menuDom.appendChild(seperatorDom);
      }
    });
  });

  const combinedUpdates = flatDeep(updates, Infinity);

  return {
    update(state: EditorState) {
      combinedUpdates.forEach((update: (state: EditorState) => void) => {
        update(state);
      });
    }
  };
};
