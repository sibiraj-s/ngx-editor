# Menu

Menu is not part of the editor component. Include `ngx-editor-menu` in your HTML manually.

## Component props

- **editor** - (`Required`) editor instance
- **toolbar** - (`Optional`)
- **enabled** - (`Optional`) enable/disable menu bar
- **colorPresets** - (`Optional`) - colors for color picker
- **customMenuRef** - (`Optional`) - Template reference to custom menu item

**app.component.ts**

```ts
export class AppComponent implements OnInit, OnDestroy {
  editor: Editor;
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];

  ngOnInit(): void {
    this.editor = new Editor({
      schema,
      plugins,
      nodeViews,
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
```

**component.html**

```html
<ngx-editor-menu
  [editor]="editor"
  [toolbar]="toolbar"
  [colorPresets]="colorPresets"
>
</ngx-editor-menu>
```

## Custom Menu

Create `customMenu` as a template variable using the newly created custom-menu component. The custom-menu will be inserted after the toolbar items.

#### Editor

```html
<ngx-editor-menu
  [editor]="editor"
  [toolbar]="toolbar"
  [customMenuRef]="customMenu"
>
</ngx-editor-menu>

<!-- Editor -->
<ngx-editor [editor]="editor"> </ngx-editor>

<!-- Create template reference variable -->
<ng-template #customMenu>
  <app-custom-menu [editor]="editor"></app-custom-menu>
</ng-template>
```

#### Custom Menu Template

```html
<div class="NgxEditor__Seperator"></div>
<div
  class="NgxEditor__MenuItem NgxEditor__MenuItem--Text"
  (mousedown)="onClick($event)"
  [ngClass]="{'NgxEditor__MenuItem--Active': isActive, 'NgxEditor--Disabled': isDisabled}"
>
  CodeMirror
</div>
```

#### Custom Menu Component

```ts
import { Component, Input, OnInit } from '@angular/core';
import { setBlockType } from 'prosemirror-commands';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { Editor } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss'],
})
export class CustomMenuComponent implements OnInit {
  constructor() {}

  @Input() editor: Editor;
  isActive = false;
  isDisabled = false;

  onClick(e: MouseEvent): void {
    e.preventDefault();
    const { state, dispatch } = this.editor.view;
    this.execute(state, dispatch);
  }

  execute(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const { schema } = state;

    if (this.isActive) {
      return setBlockType(schema.nodes.paragraph)(state, dispatch);
    }

    return setBlockType(schema.nodes.code_block)(state, dispatch);
  }

  update = (view: EditorView) => {
    const { state } = view;
    const { schema } = state;
    this.isActive = isNodeActive(state, schema.nodes.code_block);
    this.isDisabled = !this.execute(state, null); // returns true if executable
  };

  ngOnInit(): void {
    const plugin = new Plugin({
      key: new PluginKey(`custom-menu-codemirror`),
      view: () => {
        return {
          update: this.update,
        };
      },
    });

    this.editor.registerPlugin(plugin);
  }
}
```
