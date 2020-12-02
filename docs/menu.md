# Menu Plugin

Configuring the plugin

```ts
import { menu, placeholder } from 'ngx-editor/plugins';

NgxEditorModule.forRoot({
  plugins: [
    menu({
      // default options (Optional)
      toolbar: [
        ['bold', 'italic'], // inline icons
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }], // dropdown
        ['link'],
        [codemirror], // custom menu, example below
      ],
      labels: {
        bold: 'Bold',
        italics: 'Italics',
        code: 'Code',
        ordered_list: 'Ordered List',
        bullet_list: 'Bullet List',
        heading: 'Heading',
        link: 'Link',
      },
    }),
  ],
});
```

## Custom Menu

Custom menu should return an `update` function (invoked for every transcation) and `dom` html-element (to mount in the menubar).

Example:

```ts
import { EditorState } from 'prosemirror-state';

import { toggleBlockType } from 'ngx-editor/commands';
import { isNodeActive } from 'ngx-editor/helpers';
import {
  ToolbarCustomMenuItem,
  MenuItem,
  MenuItemSpec,
} from 'ngx-editor/plugins';

import schema from '../../schema';

// Ref: https://prosemirror.net/examples/codemirror/

const codeMirror: ToolbarCustomMenuItem = (editorView) => {
  const spec: MenuItemSpec = {
    classNames: ['NgxEditor__MenuItem', 'NgxEditor__MenuItem--Text'],
    activeClass: 'NgxEditor__MenuItem--Active',
    disabledClass: 'NgxEditor--Disabled',
    textContent: 'CodeMirror',
  };

  const { dom, update: updateDom } = new MenuItem(spec);

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

    updateDom({
      active: isActive,
      disabled: !canExecute,
    });
  };

  return {
    dom,
    update,
  };
};

export default codeMirror;
```
