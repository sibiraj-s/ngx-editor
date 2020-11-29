import { EditorView } from 'prosemirror-view';
import { toggleMark } from 'prosemirror-commands';
import { EditorState, NodeSelection } from 'prosemirror-state';

import { isMarkActive, removeLink } from 'ngx-editor/helpers';

import MenuItem from '../views/base/MenuItem';
import { MenuItemSpec, MenuItemViewRender } from '../../types';

import Popup from '../views/base/Popup';
import FormView, { FormInputs, OnSubmitData } from '../views/base/Form';

const getFormInputs = (defaultValue = '', disableText = false): FormInputs => [
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
      defaultValue,
      disabled: disableText
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
  const { dom, update: updateDom, toggleIcon } = new MenuItem(spec);

  const onPopupOpen = () => {
    const { state } = view;
    const { doc, selection: { from, to, empty }, schema } = state;
    const isActive = isMarkActive(state, schema.marks.link);

    if (isActive) {
      removeLink(view);
      return false;
    }

    const selectedText = !empty ? doc.textBetween(from, to) : '';

    const nodeSelection = state.selection as NodeSelection;
    const isImageNode = nodeSelection.node?.type.name === 'image';
    const isTextDisabled = isImageNode ?? false;

    renderForm(getFormInputs(selectedText, isTextDisabled));
    return true;
  };

  const onPopupClose = () => {
    setActiveState();
    return true;
  };

  const { dom: popupDom, closePopup } = new Popup({
    menuDOM: dom,
    onOpen: onPopupOpen,
    onClose: onPopupClose
  });

  const onSubmit = (data: OnSubmitData) => {
    updateLink(view, data);
    closePopup();
  };

  const { dom: formDom, render: renderForm } = new FormView({ inputs: getFormInputs(), onSubmit });

  const isPopupOpen = false;
  popupDom.appendChild(formDom);
  dom.appendChild(popupDom);

  const setActiveState = () => {
    updateDom({
      active: isPopupOpen,
      disabled: false
    });
  };

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
