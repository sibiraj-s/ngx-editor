# Configuration

```ts
import { menu, placeholder, schema } from 'ngx-editor';

NgxEditorModule.forRoot({
  schema, // optional scheama, see https://sibiraj.dev/ngx-editor/additional-documentation/schema.html
  plugins: [
    menu({
      // default options (Optional)
      toolbar: [
        ['bold', 'italic', 'code'], // inline icons
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }] // dropdown
      ],
      labels: {
        bold: 'Bold',
        italics: 'Italics',
        code: 'Code',
        ordered_list: 'Ordered List',
        bullet_list: 'Bullet List',
        heading: 'Heading'
      }
    }),
    placholder('Type something here...')
  ],
  nodeViews: {} // optional, for example see https://prosemirror.net/examples/footnote/
});
```
