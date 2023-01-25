---
title: Migrating from v6 to v7
---

You may need to remove the plugins added to enable the basic features such as history, keyboard shortcuts and input rules associated to the build schema. They are included by default.

## History

Editor now comes with inbuilt history support. You can enable or disable this by

```ts
import { Editor } from 'ngx-editor';

new Editor({
  history: true,
});
```

## Keyboard Shortcuts

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

and some other default shortcuts based on OS

**Note**: History based shortcuts will be enabled only if `history` option is `true`

## Input Rules

```ts
import { Editor } from 'ngx-editor';

new Editor({
  inputRules: true,
});
```

Enables the following input rules like

- Typing `>+{space}` will toggle blockquote
- Typing `#+{space}` will toggle heading
