# Links

To enable link support in menu

```ts
import { schema } from 'ngx-editor';
import { menu, placeholder } from 'ngx-editor/plugins';

NgxEditorModule.forRoot({
  plugins: [
    menu({
      toolbar: [
        ['link'] // add this
      ]
  ],
});
```

To enable link tooltip inside the editor to when the selection has a link.

```ts
import { link } from 'ngx-editor/plugins';

NgxEditorModule.forRoot({
  plugins: [
    link(),
  ]
});
```
