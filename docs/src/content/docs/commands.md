---
title: Commands
---

Commands is a getter function and each command creates new transaciton.

```ts
this.editor.commands
  .textColor('red')
  .insertText('Hello world!')
  .focus()
  .scrollIntoView()
  .exec();
```

:::note
You must invoke `exec` method at the end to apply the changes to the editor.

And, `exec` method is not chainable.
:::
