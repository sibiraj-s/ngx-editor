---
title: Menu
layout: ../../layouts/MainLayout.astro
---

Menu is not part of the editor component. Include `ngx-editor-menu` in your HTML manually.

## Component props

- **editor** - (`Required`) editor instance
- **toolbar** - (`Optional`)
- **disabled** - (`Optional`) enable/disable menu bar
- **colorPresets** - (`Optional`) - colors for color picker
- **customMenuRef** - (`Optional`) - Template reference to custom menu item
- **dropdownPlacement** - (`Optional`) - Placement for the dropdown. Can be `top` or `bottom`

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
    ['horizontal_rule', 'format_clear'],
  ];
  colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];

  ngOnInit(): void {
    this.editor = new Editor();
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

To insert custom menu items into the editor-menu. Create a template and pass its reference to `ngx-editor-menu` via `customMenuRef` input prop. The template will be rendered after the toolbar items.

Note: The input is just a `TemplateRef`, the menu component will render whatever template passed to it. Refer the existing toolbar items for classnames and reuse them as needed.

#### Editor

```html
<ngx-editor-menu
  [editor]="editor"
  [toolbar]="toolbar"
  [customMenuRef]="customMenu"
>
</ngx-editor-menu>

<!-- Create template reference -->
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

    return setBlockType(schema.nodes.code_mirror)(state, dispatch);
  }

  update = (view: EditorView) => {
    const { state } = view;
    const { schema } = state;
    this.isActive = isNodeActive(state, schema.nodes.code_mirror);
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

## Floating Menu

The editor exposes a component which by default renders a minimal menu. Place it anywhere in the HTML. Technically it is just a wrapper which provides a wrapper and positions it relative to selection. You can render anything inside it as required.

```html
<ngx-editor [editor]="editor">
  <ngx-editor-floating-menu [editor]="editor"></ngx-editor-floating-menu>
</ngx-editor>
```

OR

```html
<div class="editor">
  <ngx-editor [editor]="editor"> </ngx-editor>
  <ngx-editor-floating-menu [editor]="editor"></ngx-editor-floating-menu>
</div>
```

## Component props

- **editor** - (`Required`) editor instance
- **autoPlace** - (`Optional`) positions automatically to the top or bottom based on the space available. `false` by default
