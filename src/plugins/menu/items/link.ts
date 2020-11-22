import { EditorView } from 'prosemirror-view';
import { toggleMark } from 'prosemirror-commands';
import { EditorState } from 'prosemirror-state';

import { isMarkActive, removeLink } from 'ngx-editor/helpers';

import { getMenuItemDom } from '../views/MenuItem';
import { MenuItemSpec, MenuItemViewRender } from '../../types';

import Popup from '../views/Popup';
import FormView, { FormInputs, OnSubmitData } from '../views/FormView';

const getFormInputs = (defaultValue = ''): FormInputs => [
  [
    {
      type: 'url',
      required: true,
      label: 'URL',
      name: 'href'
    }
  ],
  [
    {
      type: 'text',
      required: true,
      label: 'Text',
      name: 'text',
      defaultValue
    }
  ],
  [
    {
      type: 'checkbox',
      required: false,
      defaultChecked: true,
      label: 'Open in new tab',
      name: 'openInNewTab'
    }
  ]
];

const updateLink = (view: EditorView, data: OnSubmitData) => {
  const { dispatch, state: { schema, selection, tr } } = view;
  const attrs = {
    title: data.text,
    href: data.href,
    target: data.openInNewTab ? '_blank' : '_self'
  };

  if (selection.empty) {
    const node = schema.text(data.text, [schema.marks.link.create(attrs)]);
    dispatch(tr.replaceSelectionWith(node, false));
  } else {
    const command = toggleMark(schema.marks.link, attrs);
    command(view.state, dispatch);
  }
};

const link = (view: EditorView, spec: MenuItemSpec): MenuItemViewRender => {
  const { dom, update: updateDom, toggleIcon } = getMenuItemDom(spec);

  const onSubmit = (data: OnSubmitData) => {
    updateLink(view, data);
    closePopup();
  };

  const { dom: popupDom, show, hide } = new Popup();
  const { dom: formDom, render: renderForm } = new FormView({ inputs: getFormInputs(), onSubmit });

  let isPopupOpen = false;
  popupDom.appendChild(formDom);
  dom.appendChild(popupDom);

  const mouseDownHandler = (e: MouseEvent) => {
    if (!dom.contains(e.target as Node)) {
      closePopup(e);
    }
  };

  const setActiveState = () => {
    updateDom({
      active: isPopupOpen,
      disabled: false
    });
  };

  const showPopup = (e: MouseEvent) => {
    e.preventDefault();

    const { state } = view;
    const { doc, selection: { from, to, empty }, schema } = state;
    const isActive = isMarkActive(state, schema.marks.link);

    if (isActive) {
      return removeLink(view);
    }

    const selectedText = !empty ? doc.textBetween(from, to) : '';
    renderForm(getFormInputs(selectedText));

    show();
    isPopupOpen = true;
    setActiveState();
    window.addEventListener('mousedown', mouseDownHandler);
  };

  const closePopup = (e?: MouseEvent) => {
    if (e && popupDom.contains(e.target as HTMLElement)) {
      return;
    }

    e?.preventDefault();

    hide();
    isPopupOpen = false;
    setActiveState();
    window.removeEventListener('mousedown', mouseDownHandler);
  };

  dom.addEventListener('click', (e: MouseEvent) => {
    if (isPopupOpen) {
      closePopup(e);
    } else {
      showPopup(e);
    }
  });


  const update = (editorState: EditorState) => {
    const { schema } = editorState;
    const command = toggleMark(schema.marks.link);
    const canExecute = command(editorState, null);
    const isActive = isMarkActive(editorState, schema.marks.link);

    toggleIcon(isActive);

    updateDom({
      active: isPopupOpen || isActive,
      disabled: !canExecute
    });
  };

  return {
    dom,
    update
  };
};

export default link;
