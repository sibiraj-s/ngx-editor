import { EditorState } from 'prosemirror-state';
import { isNodeActive, toggleBlockType, ToolbarCustomMenuItem } from 'ngx-editor';

import schema from '../../schema';

const codeMirror: ToolbarCustomMenuItem = (editorView) => {
  const dom: HTMLElement = document.createElement('div');
  dom.innerHTML = 'CodeMirror';

  dom.classList.add('NgxEditor-MenuItem');
  dom.classList.add('CustomMenuItem');

  const type = schema.nodes.code_block;

  let command;

  dom.addEventListener('mousedown', (e: MouseEvent) => {
    e.preventDefault();

    // don't execute if not left click
    if (e.buttons !== 1) {
      return;
    }

    command = toggleBlockType(type, schema.nodes.paragraph);
    command(editorView.state, editorView.dispatch);
  });


  const update = (state: EditorState): void => {
    const isActive = isNodeActive(state, type);
    let canExecute = true;

    if (command) {
      canExecute = command(state, null);
    }

    dom.classList.toggle(`NgxEditor-MenuItem__Active`, isActive);
    dom.classList.toggle(`disabled`, !canExecute);
  };

  return {
    dom,
    update
  };
};

export default codeMirror;
