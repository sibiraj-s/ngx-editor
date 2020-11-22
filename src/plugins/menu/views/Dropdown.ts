import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';

import {
  MenuItemSpec,
  ToolbarDropdownGroupKeys,
  ToolbarDropdownGroupValues,
  MenuOptions,
  DropdownViewRender,
} from '../../types';
import menuItemsMeta from '../meta';

import MenuItemView, { DISABLED_CLASSNAME } from './MenuItem';

const DROPDWON_ITEM_CLASSNAME = 'NgxEditor__Dropdown';
const DROPWDOWN_OPEN_CLASSNAME = `${DROPDWON_ITEM_CLASSNAME}--Open`;
const ACTIVE_DROPDOWN_ITEM_CLASSNAME = `${DROPDWON_ITEM_CLASSNAME}--Active`;
const SELECTED_DROPDOWN_ITEM_CLASSNAME = `${DROPDWON_ITEM_CLASSNAME}--Selected`;

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

      const spec: MenuItemSpec = {
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

export default DropDownView;
