# Links

To enable link support in menu

```ts
import { schema } from 'ngx-editor';

NgxEditorModule.forRoot({
  menu: [['link']],
});
```

To enable link tooltip inside the editor to when the selection has a link.

```ts
import { link } from 'ngx-editor/plugins';

NgxEditorModule.forRoot({
  plugins: [link()],
});
```
