# Enable history support in the editor

Reference

- https://prosemirror.net/docs/ref/#history
- https://prosemirror.net/docs/ref/#keymap

```ts
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';

NgxEditorModule.forRoot({
  plugins: [
    history(), // enable history support
    keymap({
      // configure shortcuts
      'Mod-z': undo,
      'Shift-Mod-z': redo
    })
  ]
});
```
