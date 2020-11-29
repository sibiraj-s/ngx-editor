const POPOUP_ITEM_CLASSNAME = 'NgxEditor__Popup';
const POPOUP_ITEM_OPEN_CLASSNAME = `${POPOUP_ITEM_CLASSNAME}--Open`;

type OnPopupOpen = () => boolean | null;
type OnPopupClose = () => boolean | null;
type AfterPopupOpen = () => unknown;
type AfterPopupClose = () => unknown;

interface PopupOptions {
  menuDOM: HTMLElement;
  onOpen: OnPopupOpen;
  afterOpen: AfterPopupOpen;
  onClose: OnPopupClose;
  afterClose: AfterPopupClose;
}

class Popup {
  dom: HTMLElement;
  menuDOM: HTMLElement;
  popupIsOpen = false;
  onOpen: OnPopupOpen;
  onClose: OnPopupClose;
  afterOpen: AfterPopupOpen;
  afterClose: AfterPopupClose;

  constructor(options: PopupOptions) {
    const { menuDOM, onOpen, afterOpen, onClose, afterClose } = options;

    this.menuDOM = menuDOM;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.afterOpen = afterOpen;
    this.afterClose = afterClose;

    this.dom = document.createElement('div');
    this.dom.classList.add(POPOUP_ITEM_CLASSNAME);

    this.setupEventListeners();
  }

  isPopupOpen = (): boolean => {
    return this.popupIsOpen;
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
    this.afterOpen();
    window.addEventListener('mousedown', this.mousedownHandler);
  }

  closePopup = (e?: MouseEvent) => {
    if (e && this.dom.contains(e.target as HTMLElement)) {
      return;
    }

    e?.preventDefault();
    this.onClose();
    this.hide();
    this.afterClose();
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
