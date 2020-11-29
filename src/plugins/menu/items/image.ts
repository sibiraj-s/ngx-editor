import { EditorView } from 'prosemirror-view';
import { toggleMark } from 'prosemirror-commands';
import { EditorState, NodeSelection } from 'prosemirror-state';

import MenuItem from '../views/base/MenuItem';
import { MenuItemSpec, MenuItemViewRender } from '../../types';

import Popup from '../views/base/Popup';
import FormView, { FormInputs, OnSubmitData } from '../views/base/Form';

const getFormInputs = (url = '', alt = '', title = ''): FormInputs => [
  [
    {
      type: 'url',
      required: true,
      label: 'URL',
      name: 'url',
      defaultValue: url
    }
  ],
  [
    {
      type: 'text',
      required: false,
      label: 'Alt Text',
      name: 'altText',
      defaultValue: alt
    }
  ],
  [
    {
      type: 'text',
      required: false,
      label: 'Title',
      name: 'title',
      defaultValue: title
    }
  ]
];

const updateImage = (view: EditorView, data: OnSubmitData) => {
  const { dispatch, state: { schema, tr } } = view;

  const attrs = {
    src: data.url,
    alt: data.altText ?? '',
    title: data.title ?? ''
  };

  dispatch(tr.replaceSelectionWith(schema.nodes.image.createAndFill(attrs)));
};

const image = (view: EditorView, spec: MenuItemSpec): MenuItemViewRender => {
  const { dom, update: updateDom } = new MenuItem(spec);

  const onPopupOpen = () => {
    const { state: { selection } } = view;

    if (selection instanceof NodeSelection) {
      const { src, alt, title } = selection.node.attrs;
      renderForm(getFormInputs(src, alt, title));
    } else {
      renderForm(getFormInputs());
    }

    return true;
  };

  const onPopupClose = () => {
    return true;
  };

  const updateActiveState = () => {
    setActiveState();
  };

  const popupOptions = {
    menuDOM: dom,
    onOpen: onPopupOpen,
    afterOpen: updateActiveState,
    onClose: onPopupClose,
    afterClose: updateActiveState
  };

  const { dom: popupDOM, closePopup, isPopupOpen } = new Popup(popupOptions);

  const onSubmit = (data: OnSubmitData) => {
    updateImage(view, data);
    closePopup();
  };

  const { dom: formDom, render: renderForm } = new FormView({ inputs: getFormInputs(), onSubmit });

  popupDOM.appendChild(formDom);
  dom.appendChild(popupDOM);

  const setActiveState = () => {
    updateDom({
      active: isPopupOpen(),
      disabled: false
    });
  };

  const update = (state: EditorState) => {
    const { schema, selection } = state;

    const command = toggleMark(schema.nodes.image);
    const canExecute = command(state, null);

    let isActive = false;

    if (selection instanceof NodeSelection) {
      isActive = selection.node.type.name === 'image';
    }

    updateDom({
      active: isPopupOpen() || isActive,
      disabled: !canExecute
    });
  };

  return {
    dom,
    update
  };
};

export default image;
