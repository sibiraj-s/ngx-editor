const POPOUP_ITEM_CLASSNAME = 'NgxEditor__Popup';
const POPOUP_ITEM_OPEN_CLASSNAME = `${POPOUP_ITEM_CLASSNAME}--Open`;

class Popup {
  dom: HTMLElement;

  constructor() {
    this.dom = document.createElement('div');
    this.dom.classList.add(POPOUP_ITEM_CLASSNAME);
  }

  show = (): void => {
    this.dom.classList.toggle(POPOUP_ITEM_OPEN_CLASSNAME, true);
  }

  hide = (): void => {
    this.dom.classList.toggle(POPOUP_ITEM_OPEN_CLASSNAME, false);
  }
}

export default Popup;
