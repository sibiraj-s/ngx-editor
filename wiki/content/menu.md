# Menu Plugin

Configuring the plugin

```ts
import { menu, placeholder } from 'ngx-editor';

NgxEditorModule.forRoot({
  plugins: [
    menu({
      // default options (Optional)
      toolbar: [
        ['bold', 'italic', 'code'], // inline icons
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }], // dropdown
        [codemirror] // custom menu, example below
      ],
      labels: {
        bold: 'Bold',
        italics: 'Italics',
        code: 'Code',
        ordered_list: 'Ordered List',
        bullet_list: 'Bullet List',
        heading: 'Heading'
      }
    })
  ]
});
```

## Custom Menu

Custom menu should return an `update` function (invoked for every transcation) and `dom` html-element (to mount in the menubar).

Example:

```ts
import { EditorState } from 'prosemirror-state';
import { isNodeActive, toggleBlockType, ToolbarCustomMenuItem } from 'ngx-editor';

import schema from '../../schema';

const codeMirror: ToolbarCustomMenuItem = (editorView) => {
  const dom: HTMLElement = document.createElement('div');
  dom.innerHTML = 'CodeMirror';

  dom.classList.add('NgxEditor__MenuItem');
  dom.classList.add('NgxEditor__MenuItem--Text');

  // you must add `code_block` to schema first
  // see https://prosemirror.net/examples/schema/
  // https://sibiraj.dev/ngx-editor/additional-documentation/schema.html
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
```
