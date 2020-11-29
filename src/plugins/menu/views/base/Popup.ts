const POPOUP_ITEM_CLASSNAME = 'NgxEditor__Popup';
const POPOUP_ITEM_OPEN_CLASSNAME = `${POPOUP_ITEM_CLASSNAME}--Open`;

interface PopupOptions {
  menuDOM: HTMLElement;
  onOpen: () => boolean | null;
  onClose: () => boolean | null;
}

class Popup {
  dom: HTMLElement;
  menuDOM: HTMLElement;
  popupIsOpen = false;
  onOpen: () => boolean | null;
  onClose: () => boolean | null;

  constructor({ menuDOM, onOpen, onClose }: PopupOptions) {

    this.menuDOM = menuDOM;
    this.onOpen = onOpen;
    this.onClose = onClose;

    this.dom = document.createElement('div');
    this.dom.classList.add(POPOUP_ITEM_CLASSNAME);

    this.setupEventListeners();
  }

  show = (): void => {
    this.popupIsOpen = true;
    this.dom.classList.toggle(POPOUP_ITEM_OPEN_CLASSNAME, true);
  }

  hide = (): void => {
    this.popupIsOpen = false;
    this.dom.classList.toggle(POPOUP_ITEM_OPEN_CLASSNAME, false);
  }

  mousedownHandler = (e: MouseEvent) => {
    if (!this.menuDOM.contains(e.target as Node)) {
      this.closePopup(e);
    }
  }

  showPopup = (e: MouseEvent) => {
    e.preventDefault();
    const canShowPopup = this.onOpen();

    if (!canShowPopup) {
      return;
    }

    this.show();
    window.addEventListener('mousedown', this.mousedownHandler);
  }

  closePopup = (e?: MouseEvent) => {
    if (e && this.dom.contains(e.target as HTMLElement)) {
      return;
    }

    e?.preventDefault();
    this.onClose();
    this.hide();
    window.removeEventListener('mousedown', this.mousedownHandler);
  }

  setupEventListeners(): void {
    this.menuDOM.addEventListener('mousedown', (e: MouseEvent) => {
      if (this.popupIsOpen) {
        this.closePopup(e);
      } else {
        this.showPopup(e);
      }
    });
  }
}

export default Popup;
