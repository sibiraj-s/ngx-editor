---
title: Editor
---

This is the core module. Create the editor and pass it to the components. The editor accepts the following options

```ts
import { Editor } from 'ngx-editor';
import { schema } from 'ngx-editor/schema';

const editor = new Editor({
  content: '',
  history: true,
  keyboardShortcuts: true,
  inputRules: true,
  plugins: [], //https://prosemirror.net/docs/guide/#state
  schema, //https://prosemirror.net/examples/schema/
  nodeViews: {}, //https://prosemirror.net/docs/guide/#state,
  attributes: {}, // https://prosemirror.net/docs/ref/#view.EditorProps.attributes
  linkValidationPattern: '',
  parseOptions: {}, // https://prosemirror.net/docs/ref/#model.ParseOptions
});
```

Some options may be overwritten by the component props

## Options

- **content** - (`Optional`) - a HTML string or json doc
- **plugins** - (`Optional`) - prosemirror plugins
- **schema** - (`Optional`) - prosemirror plugins
- **nodeViews** - (`Optional`) - prosemirror nodeViews
- **history** - (`Optional`) - enables history support in editor
- **keyboardShortcuts** - (`Optional`) - enables keyboard shortcuts for the inbuilt schema
- **inputRules** - (`Optional`) - enables inputrules for the inbuilt schema
- **attributes** - (`Optional`) - editor attributes to forward to ProseMirror
- **linkValidationPattern** - (`Optional`) - sets the Validation Pattern in the Link Component to validate the link

## Editor Instance

Programatically make changes to the editor. Some options can be passed via component which will override these values, prefer them

**setContent**

Set value to the editor. value can be a `html` or a `json doc`

```ts
editor.setContent(value);
```

**valueChanges**

Observable that emits the content as a JSON doc whenever it changes. Use [toHTML](/ngx-editor/doc-html-doc/) to convert it to HTML.

```ts
editor.valueChanges.subscribe((jsonDoc) => {});
```

**update**

Observable that emits the prosemirror [EditorView](https://prosemirror.net/docs/ref/#view.EditorView) on every transaction, including selection changes. Useful for building custom menus.

```ts
editor.update.subscribe((view) => {});
```

**view**

The underlying prosemirror [EditorView](https://prosemirror.net/docs/ref/#view.EditorView). Use it for anything not covered by the editor API, e.g. reading the current content.

```ts
const jsonDoc = editor.view.state.doc.toJSON();
```

**commands**

Chainable commands to programmatically format the content. See [Commands](/ngx-editor/commands/).

```ts
editor.commands.toggleBold().exec();
```

**schema**

The prosemirror schema used by the editor.

**registerPlugin**

Register a new plugin to the editor

```ts
import { Plugin, PluginKey } from 'prosemirror-state';

const plugin = new Plugin({
  key: new PluginKey('plugin'),
});

editor.registerPlugin(plugin);
```

**destroy**

Destroy the editor

```ts
editor.destroy();
```
