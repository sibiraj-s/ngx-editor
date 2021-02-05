# Migrating from v7 to v8

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

#### Removed Editor.focus and Editor.blur methods

```ts
const editor = new Editor();

editor.focus.subscribe(() => {}); // no longer exposed
editor.blur.subscribe(() => {}); // no longer exposed
```

#### Miscellaneous

- `@angular/elements` is a peerDependency
