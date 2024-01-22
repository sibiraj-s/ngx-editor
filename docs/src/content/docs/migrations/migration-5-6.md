---
title: Migrating from v5 to v6
---

## Menu

**Before**

```ts
import { NgxEditorModule } from 'ngx-editor';

NgxEditorModule.forRoot({
  menu: {
    toolbar: [],
    colorPresets: [],
  },
});
```

**After**

Menu is a seperate component, has to be included manually if required.

Component

```ts
export class AppComponent implements OnInit, OnDestroy {
  isProdMode = environment.production;

  editor: Editor;
  toolbar: Toolbar = [['bold', 'italic']];
  colorPresets = ['red', 'blue', 'green'];

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
```

HTML

```html
<ngx-editor-menu
  [editor]="editor"
  [toolbar]="toolbar"
  [colorPresets]="colorPresets"
>
</ngx-editor-menu>
```

## CustomMenu

Before

```html
<ngx-editor [customMenuRef]="customMenu"> </ngx-editor>
```

After

```html
<ngx-editor-menu [customMenuRef]="customMenu"> </ngx-editor-menu>
```

## ProseMirror Configuration

**Before**

```ts
import { NgxEditorModule } from 'ngx-editor';

NgxEditorModule.forRoot({
  plugins: [],
  schema: {},
  nodeViews: {},
});
```

**After**

```ts
import { Editor } from 'ngx-editor';

new Editor({
  plugins: [],
  schema: {},
  nodeViews: {},
});
```
