import { EditorState } from 'prosemirror-state';

import { toggleBlockType } from 'ngx-editor/commands';
import { isNodeActive } from 'ngx-editor/helpers';
import { ToolbarCustomMenuItem } from 'ngx-editor/plugins';

import schema from '../../schema';

// Ref: https://prosemirror.net/examples/codemirror/

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
