# Editor

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
  enterKeyHint: 'enter', // https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-enterkeyhint-attribute
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
- **enterKeyHint** - (`Optional`) - enterkeyhint attribute of dom editor (for mobile keyboard)

## Editor Instance

Programatically make changes to the editor. Some options can be passed via component which will override these values, prefer them

**setContent**

Set value to the editor. value can be a `html` or a `json doc`

```ts
editor.setContent(value);
```

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

Destroy th editor

```ts
editor.destroy();
```
