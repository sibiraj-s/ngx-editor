# Configuration

```ts
import { schema } from 'ngx-editor';
import { placeholder } from 'ngx-editor/plugins';

NgxEditorModule.forRoot({
  schema, // optional scheama, see https://sibiraj.dev/ngx-editor/#/schema
  plugins: [placholder('Type something here...')],
  menu: [
    ['bold', 'italic'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ],
  locals: {
    // menu
    bold: 'Bold',
    italic: 'Italic',
    code: 'Code',
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

    // pupups, forms, others...
    url: 'URL',
    text: 'Text',
    openInNewTab: 'Open in new tab',
    insert: 'Insert',
    altText: 'Alt Text',
    title: 'Title',
  },
  nodeViews: {}, // optional, for example see https://prosemirror.net/examples/footnote/
});
```

**Note**: _Providing new options to the config overrides the defaults_

## Component Props

- placeholder [`string`] - (Optional) - A placeholder for the editor. If you are using custom set of plugins, you must also include `placeholder` plugin from `ngx-editor/plugins` plugins for this to work
