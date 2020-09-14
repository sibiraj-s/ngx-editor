import { toggleMark } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { MarkType, NodeType } from 'prosemirror-model';

import {
  MenuItemViewSpec,
  ToolbarItem,
  ToolbarDropdownGroupKeys,
  ToolbarDropdownGroupValues,
  MenuOptions,
  Command,
  DropdownViewRender,
  MenuItemViewRender
} from '../../../types';

import { isNodeActive, isMarkActive, isListItem } from '../../helpers';
import { toggleList, toggleBlockType, toggleWrap } from '../../commands';

import { getIconSvg } from '../../../utils/icons';
import flatDeep from '../../../utils/flatDeep';

import menuItemsMeta, { MenuItemMeta } from './meta';

const SEPERATOR_CLASSNAME = 'NgxEditor__Seperator';

const MENU_ITEM_CLASSNAME = 'NgxEditor__MenuItem';
const ACTIVE_MENU_ITEM_CLASSNAME = `${MENU_ITEM_CLASSNAME}--Active`;
const DISABLED_CLASSNAME = 'NgxEditor--Disabled';

const DROPDWON_ITEM_CLASSNAME = 'NgxEditor__Dropdown';
const DROPWDOWN_OPEN_CLASSNAME = `${DROPDWON_ITEM_CLASSNAME}--Open`;
const ACTIVE_DROPDOWN_ITEM_CLASSNAME = `${DROPDWON_ITEM_CLASSNAME}--Active`;
const SELECTED_DROPDOWN_ITEM_CLASSNAME = `${DROPDWON_ITEM_CLASSNAME}--Selected`;

const DROPDOWN_ITEMS = new Map();
DROPDOWN_ITEMS.set('heading', ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

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
    const dropdown = document.createElement('div');

    const labels = this.options.labels;

    dropdown.classList.add(DROPDWON_ITEM_CLASSNAME);

    const dropdownText = document.createElement('div');
    dropdownText.classList.add(`${DROPDWON_ITEM_CLASSNAME}__Text`);
    dropdownText.textContent = labels[this.dropdownGroup];

    dropdown.appendChild(dropdownText);

    // create dropdown list
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add(`${DROPDWON_ITEM_CLASSNAME}__DropdownMenu`);

    const mouseDownHandler = (e: MouseEvent) => {
      e.preventDefault();
      if (!dropdown.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    const openDropdown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (dropdownMenu.contains(target)) {
        return;
      }

      dropdown.classList.add(DROPWDOWN_OPEN_CLASSNAME);
      isDropdownOpen = true;
      window.addEventListener('mousedown', mouseDownHandler);
    };

    const closeDropdown = () => {
      dropdown.classList.remove(DROPWDOWN_OPEN_CLASSNAME);
      isDropdownOpen = false;
      window.removeEventListener('mousedown', mouseDownHandler);
    };

    dropdown.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      if (!isDropdownOpen) {
        openDropdown(e);
      } else {
        closeDropdown();
      }
    });

    this.dropdownFields.forEach(dropdownItem => {
      const menuItem = menuItemsMeta[dropdownItem];

      let text = labels[menuItem.key];

      if (menuItem.key === 'heading') {
        text += ` ${menuItem.attrs.level}`;
      }

      const spec: MenuItemViewSpec = {
        classNames: [
          `${DROPDWON_ITEM_CLASSNAME}__Item`
        ],
        textContent: text,
        attrs: {
          title: text
        },
        activeClass: ACTIVE_DROPDOWN_ITEM_CLASSNAME,
        disabledClass: DISABLED_CLASSNAME
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

        // update the dropdown content heading when a class is selected
        const activeEl = dropdownMenu.getElementsByClassName(ACTIVE_DROPDOWN_ITEM_CLASSNAME);
        if (activeEl.length) {
          const el = activeEl[0];
          dropdownText.textContent = el.textContent;
          dropdown.classList.add(SELECTED_DROPDOWN_ITEM_CLASSNAME);
        } else {
          // restore default value
          dropdownText.textContent = labels[this.dropdownGroup];
          dropdown.classList.remove(SELECTED_DROPDOWN_ITEM_CLASSNAME);
        }
      };

      dropdownMenu.appendChild(dom);
      this.updates.push(dropUpdate);
    });

    dropdown.appendChild(dropdownMenu);
    return dropdown;
  }

  render(): DropdownViewRender {
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

  render(): MenuItemViewRender {
    const dom = this.dom = this.getDom();
    const { schema } = this.editorView.state;
    const { command } = this.setupCommandListeners();

    const { activeClass, disabledClass } = this.spec;

    const update = (state: EditorState): void => {
      const menuItem = this.menuItem;
      let isActive = false;

      const canExecute = command(this.editorView.state, null);

      if (menuItem.type === 'mark') {
        const type: MarkType = schema.marks[menuItem.key];
        isActive = isMarkActive(state, type);
      }

      if (menuItem.type === 'node') {
        const type: NodeType = schema.nodes[menuItem.key];
        isActive = isNodeActive(state, type, menuItem.attrs);
      }

      dom.classList.toggle(activeClass, isActive);
      dom.classList.toggle(disabledClass, !canExecute);
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

  private setupCommandListeners(): { command: Command } {
    const { schema } = this.editorView.state;

    let command: Command;

    if (this.menuItem.type === 'mark') {
      command = toggleMark(schema.marks[this.menuItem.key]);
    }

    if (this.menuItem.type === 'node') {
      const type = schema.nodes[this.menuItem.key];

      if (isListItem(type, schema)) {
        command = toggleList(type, schema.nodes.list_item);
      }

      if (type === schema.nodes.heading) {
        command = toggleBlockType(type, schema.nodes.paragraph, { level: this.menuItem.attrs.level });
      }

      if (type === schema.nodes.blockquote) {
        command = toggleWrap(type);
      }
    }

    this.dom.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();

      // don't execute if not left click
      if (e.buttons !== 1) {
        return;
      }

      // execute command
      command(this.editorView.state, this.editorView.dispatch);
    });

    return { command };
  }
}

const getSeperatorDom = (): HTMLElement => {
  const div = document.createElement('div');
  div.className = SEPERATOR_CLASSNAME;
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
              `${MENU_ITEM_CLASSNAME}--Icon`,
            ],
            innerHTML: getIconSvg(menuItem.icon),
            attrs: {
              title: labels[menuItem.i18nKey]
            },
            activeClass: ACTIVE_MENU_ITEM_CLASSNAME,
            disabledClass: DISABLED_CLASSNAME
          };

          const menuItemView = new MenuItemView(menuItem, editorView, spec);
          const { update, dom } = menuItemView.render();

          menuDom.appendChild(dom);
          updates.push(update);
        }
      }

      if (typeof toolbarItem === 'function') {
        const { dom, update } = toolbarItem(editorView);
        menuDom.appendChild(dom);
        updates.push(update);
      }

      if (isLastMenuItem && !isLastMenuGroup) {
        const seperatorDom = getSeperatorDom();
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
