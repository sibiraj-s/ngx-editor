# Examples

### List Items

Reference

- https://prosemirror.net/docs/ref/#keymap
- https://prosemirror.net/docs/ref/#schema-list

```ts
import { Editor, schema } from 'ngx-editor';
import {
  splitListItem,
  liftListItem,
  sinkListItem,
} from 'prosemirror-schema-list';
import { keymap } from 'prosemirror-keymap';

new Editor({
  plugins: [
    keymap({
      Enter: splitListItem(schema.nodes.list_item),
      'Mod-[': liftListItem(schema.nodes.list_item),
      'Mod-]': sinkListItem(schema.nodes.list_item),
      Tab: sinkListItem(schema.nodes.list_item),
    }),
  ],
});
```

### Marks

Reference

- https://prosemirror.net/docs/ref/#commands
- https://prosemirror.net/docs/ref/#keymap

```ts
import { Editor, schema } from 'ngx-editor';
import { keymap } from 'prosemirror-keymap';
import { toggleMark, baseKeymap } from 'prosemirror-commands';

new Editor({
  plugins: [
    keymap({
      'Mod-b': toggleMark(schema.marks.strong), // toggle strong
      'Mod-i': toggleMark(schema.marks.em), // toggle italics
      'Mod-`': toggleMark(schema.marks.code), // toggle code
    }),
    keymap(baseKeymap),
  ],
});
```
