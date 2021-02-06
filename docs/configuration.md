# Configuration

### Editor

```ts
import { Editor } from 'ngx-editor';

editor = new Editor({
  content: '',
  plugins: [],
  schema,
  nodeViews: {},
  placeholder: 'Type here',
  enabled: true,
  history: true,
  keyboardShortcuts: true,
  inputRules: true,
});
```

Options like `content`, `placeholder` and `enabled` will be overridden by options in the component

### Locals

```ts
import { schema } from 'ngx-editor/schema';

NgxEditorModule.forRoot({
  locals: {
    // menu
    bold: 'Bold',
    italic: 'Italic',
    code: 'Code',
    underline: 'Underline',
    strike: 'Strike',
    blockquote: 'Blockquote',
    bullet_list: 'Bullet List',
    ordered_list: 'Ordered List',
    heading: 'Heading',
    h1: 'Header 1',
    h2: 'Header 2',
    h3: 'Header 3',
    h4: 'Header 4',
    h5: 'Header 5',
    h6: 'Header 6',
    align_left: 'Left Align',
    align_center: 'Center Align',
    align_right: 'Right Align',
    align_justify: 'Justify',
    text_color: 'Text Color',
    background_color: 'Background Color',

    // pupups, forms, others...
    url: 'URL',
    text: 'Text',
    openInNewTab: 'Open in new tab',
    insert: 'Insert',
    altText: 'Alt Text',
    title: 'Title',
    remove: 'Remove',
  },
});
```

## Component Props

- editor - (Required) - editor instance
- placeholder [`string`] - (Optional) - placeholder for the editor
- enabled [`boolean`] - (Optional) - enabled/disable the editor
- outputFormat [`doc` | `html`] - (Optional) - output value type
