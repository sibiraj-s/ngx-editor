---
title: CodeMirror
layout: ../../../layouts/MainLayout.astro
---

# Embedded code editor

<iframe src="https://stackblitz.com/edit/ngx-editor-codemirror?embed=1&hideExplorer=1&view=preview" height="600"></iframe>

Ref: https://prosemirror.net/examples/codemirror/

Example: https://github.com/sibiraj-s/ngx-editor/tree/master/demo for examples.

See https://sibiraj-s.github.io/ngx-editor/#/menu?id=custom-menu for implementing custom to toggle the codemirror block

### Editor

```ts
import { Editor } from 'ngx-editor';
import { CodeMirrorView } from 'prosemirror-codemirror-6';
import { minimalSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';

import schema from './schema.ts';

new Editor({
  schema,
  nodeViews: {
    code_mirror: (
      // first define schema `code_mirror`. see schema section
      node: ProseMirrorNode,
      view: EditorView,
      getPos: () => number
    ) => {
      return new CodeMirrorView({
        node,
        view,
        getPos,
        cmOptions: {
          extensions: [minimalSetup, javascript()],
        },
      });
    },
  },
});
```
