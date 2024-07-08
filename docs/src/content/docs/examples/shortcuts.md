---
title: Shortcuts
---

Enable/disable default keyboard shortcuts. Enabled by default

```ts
import { Editor } from 'ngx-editor';

new Editor({
  keyboardShortcuts: true,
});
```

Enables the following shortcuts. `Mod` represents `CMD in Mac` and `CTRL in Windows`

- **Mod-b** - toggle bold
- **Mod-i** - toggle italics
- **Mod-`** - toggle code
- **Enter** - insert new line, split list
- **Mod-[** - lift the list item around the selection up into a wrapping list
- **Mod-]** - sink the list item around the selection down into an inner list
- **Tab** - sink the list item around the selection down into an inner list
- **Mod-z** - undo
- **Mod-y** - redo (only in windows)
- **Shift-Mod-z** - redo (only in Mac)

and some other default shortcuts based on OS.

**Note**: History based shortcuts will be enabled only if `history` option is `true`

Related Links

- https://prosemirror.net/docs/ref/#keymap
