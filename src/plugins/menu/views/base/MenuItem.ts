import { DOMUpdateOptions, MenuItemSpec } from '../../../types';

export class MenuItem {
  dom: HTMLElement;
  spec: MenuItemSpec;
  iconContainer: HTMLElement | undefined;

  constructor(spec: MenuItemSpec) {
    this.dom = document.createElement('div');
    this.spec = spec;

    this.render();
  }

  private render = () => {
    const { spec, dom } = this;

    if (spec.classNames) {
      spec.classNames.forEach(className => {
        dom.classList.add(className);
      });
    }

    if (spec.attrs) {
      Object.entries(spec.attrs).forEach(obj => {
        dom.setAttribute(obj[0], obj[1]);
      });
    }

    if (spec.icon) {
      const icon = document.createElement('div');
      icon.className = spec.iconContainerClass;

      icon.innerHTML = spec.icon.default;

      this.iconContainer = icon;

      dom.appendChild(icon);
    } else if (spec.textContent) {
      dom.textContent = spec.textContent;
    } else {
      dom.textContent = '';
    }
  }


  update = (options: DOMUpdateOptions) => {
    const { dom, spec } = this;

    dom.classList.toggle(spec.activeClass, options.active);
    dom.classList.toggle(spec.disabledClass, options.disabled);
  }

  toggleIcon = (toggle: boolean) => {
    const { iconContainer, spec } = this;

    if (!iconContainer) {
      return;
    }

    iconContainer.innerHTML = toggle ? spec.icon.alt : spec.icon.default;
  }
}

export default MenuItem;
