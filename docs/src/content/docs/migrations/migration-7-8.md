---
title: Migrating from v7 to v8
---

#### Rename Editor.onContentChange -> Editor.valueChanges

Before

```ts
const editor = new Editor();
editor.onContentChange.subscribe(() => {});
```

After

```ts
const editor = new Editor();
editor.valueChanges.subscribe(() => {});
```

#### Rename Editor.onUpdate -> Editor.update

Before

```ts
const editor = new Editor();
editor.onUpdate.subscribe(() => {});
```

After

```ts
const editor = new Editor();
editor.update.subscribe(() => {});
```

#### Make sure to call editor.destory manually during onDestory.

```ts
class AppComponent implements OnInit, OnDestroy {
  editor: Editor;

  ngOnInit() {
    this.editor = new Editor();
  }

  ngOnDestroy() {
    this.editor.destroy();
  }
}
```

#### Image plugin is included by default.

Image plugin is included by default. No need to manually add it.

```ts
import { image } from 'ngx-editor';

new Editor({
  plugins: [
    image(), // remove
  ],
});
```

#### Removed Editor.focus and Editor.blur events

```ts
const editor = new Editor();

editor.focus.subscribe(() => {}); // no longer exposed
editor.blur.subscribe(() => {}); // no longer exposed
```

Alternatively you can use the props on the editor component for the same

```html
<ngx-editor
  [editor]="editor"
  focusOut="onBlur()"
  focusIn="onFocus()"
></ngx-editor>
```

#### Remvoed Editor.enable and Editor.disable methods

**Before:**

```ts
const editor = new Editor({});

editor.enable(); // enable edititng
editor.disable(); // disable editing
```

**After:**

Set the enabled prop to `true` or `false` to enable/disable the editor.

```html
<ngx-editor [editor]="editor" enabled="true"></ngx-editor>
```

#### Miscellaneous

- Some CSS Bug fixes might affect existing components
