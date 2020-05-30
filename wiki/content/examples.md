# Examples

### Implement undo/redo history

Reference

- https://prosemirror.net/docs/ref/#history
- https://prosemirror.net/docs/ref/#keymap

```ts
import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";

NgxEditorModule.forRoot({
  plugins: [
    history(), // enable history support
    keymap({
      // configure shortcuts
      "Mod-z": undo,
      "Shift-Mod-z": redo,
    }),
  ],
});
```

### Configure shortcts to work with list items

Reference

- https://prosemirror.net/docs/ref/#keymap
- https://prosemirror.net/docs/ref/#schema-list

```ts
import { schema } from "ngx-editor";
import { splitListItem, liftListItem, sinkListItem } from "prosemirror-schema-list";
import { keymap } from "prosemirror-keymap";

NgxEditorModule.forRoot({
  plugins: [
    keymap({
      Enter: splitListItem(schema.nodes.list_item),
      "Mod-[": liftListItem(schema.nodes.list_item),
      "Mod-]": sinkListItem(schema.nodes.list_item),
      Tab: sinkListItem(schema.nodes.list_item),
    }),
  ],
});
```

### Shortcuts to work with makrs

Reference

- https://prosemirror.net/docs/ref/#commands
- https://prosemirror.net/docs/ref/#keymap

```ts
import { schema } from "ngx-editor";
import { keymap } from "prosemirror-keymap";
import { toggleMark, baseKeymap } from "prosemirror-commands";

NgxEditorModule.forRoot({
  plugins: [
    keymap({
      "Mod-b": toggleMark(schema.marks.strong), // toggle strong
      "Mod-i": toggleMark(schema.marks.em), // toggle italics
      "Mod-`": toggleMark(schema.marks.code), // toggle code
    }),
    keymap(baseKeymap),
  ],
});
```
