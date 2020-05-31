import { EditorState } from 'prosemirror-state';
import { isNodeActive, toggleBlockType, ToolbarCustomMenuItem } from 'ngx-editor';

import schema from '../../schema';

const codeMirror: ToolbarCustomMenuItem = (editorView) => {
  const dom: HTMLElement = document.createElement('div');
  dom.innerHTML = 'CodeMirror';

  dom.classList.add('NgxEditor__MenuItem');
  dom.classList.add('NgxEditor__MenuItem--Text');

  const type = schema.nodes.code_block;

  const command = toggleBlockType(type, schema.nodes.paragraph);

  dom.addEventListener('mousedown', (e: MouseEvent) => {
    e.preventDefault();

    // don't execute if not left click
    if (e.buttons !== 1) {
      return;
    }

    command(editorView.state, editorView.dispatch);
  });

  const update = (state: EditorState): void => {
    const isActive = isNodeActive(state, type);

    const canExecute = command(state, null);

    dom.classList.toggle(`NgxEditor__MenuItem--Active`, isActive);
    dom.classList.toggle(`NgxEditor--Disabled`, !canExecute);
  };

  return {
    dom,
    update
  };
};

export default codeMirror;
