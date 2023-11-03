---
title: Commands
---

Commands is a getter function, creates new transaciton whenever called.

```ts
this.editor.commands.textColor('red').insertText('Hello world!').focus().scrollIntoView().exec();
```

You must invoke `exec` method at the end to apply the changes to the editor.

**Note:** `exec` method is not chainable.
