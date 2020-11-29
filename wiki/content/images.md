# Images

```ts
import { schema } from 'ngx-editor';
import { menu } from 'ngx-editor/plugins';

NgxEditorModule.forRoot({
  plugins: [
    menu({
      toolbar: [
        ['image'] // add this
      ]
  ],
});
```

To enable additional features for images, include the image plugin

```ts
import { image } from 'ngx-editor/plugins';

NgxEditorModule.forRoot({
  plugins: [
    image({
      resize: true, // enable or disable image resizing
    }),
  ],
});
```
