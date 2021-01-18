# Editor

This is the core module. Create the editor and pass it to the components. The editor accepts the following options

```ts
import { Editor, schema } from 'ngx-editor';

const editor = new Editor({
  content: '',
  placeholder: 'Type here',
  enabled: true,
  history: true,
  keyboardShortcuts: true,
  inputRules: true,
  plugins: [], //https://prosemirror.net/docs/guide/#state
  schema, //https://prosemirror.net/examples/schema/
  nodeViews: {}, //https://prosemirror.net/docs/guide/#state,
});
```

Some options may be overwritten by the component props

## Options

- **content** - (`Optional`) - a HTML string or json doc
- **placeholder** - (`Optional`) - default placeholder. This will be overwritten by component prop if provided
- **enabled** - (`Optional`) - enable/disable the editor. This will be overwritten by component prop if provided
- **plugins** - (`Optional`) - prosemirror plugins
- **schema** - (`Optional`) - prosemirror plugins
- **nodeViews** - (`Optional`) - prosemirror nodeViews
- **history** - (`Optional`) - enables history support in editor
- **keyboardShortcuts** - (`Optional`) - enables keyboard shortcuts for the inbuilt schema
- **inputRules** - (`Optional`) - enables inputrules for the inbuilt schema

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

**enable**

Enable the editor

```ts
editor.enable();
```

**disable**

Disable the editor. Make the editor readonly

```ts
editor.disable();
```

**setPlaceholder**

Set placeholder value

```ts
editor.setPlaceholder('Type Here..');
```

**destroy**

Destroy th editor

```ts
editor.destroy();
```
