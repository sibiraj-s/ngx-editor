# Menu

```ts
NgxEditorModule.forRoot({
  menu: [
    ['bold', 'italic'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ],
  locals: {
    // menu
    bold: 'Bold',
    italic: 'Italic',
    code: 'Code',
    blockquote: 'Blockquote',
    bullet_list: 'Bullet List',
    ordered_list: 'Ordered List',
    heading: 'Heading',
    h1: 'Header 1',
    h2: 'Header 2',
    h3: 'Header 3',
    h4: 'Header 4',
    h5: 'Header 5',
    h6: 'Header 6',
    align_left: 'Left Align',
    align_center: 'Center Align',
    align_right: 'Right Align',
    align_justify: 'Justify',
    text_color: 'Text Color',
    background_color: 'Background Color',

    // pupups, forms, others...
    url: 'URL',
    text: 'Text',
    openInNewTab: 'Open in new tab',
    insert: 'Insert',
    altText: 'Alt Text',
    title: 'Title',
    remove: 'Remove',
  },
});
```

## Custom Menu

The editorView will be available from the init function

#### Editor

```html
<div class="editor">
  <ngx-editor
    [ngModel]="editorContent"
    (ngModelChange)="editorContentChange($event)"
    (init)="init($event)"
    [customMenuRef]="customMenu"
  >
  </ngx-editor>
</div>
<ng-template #customMenu>
  <app-custom-menu [editorView]="editorView"></app-custom-menu>
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

import { isNodeActive } from 'ngx-editor/helpers';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss'],
})
export class CustomMenuComponent implements OnInit {
  constructor() {}

  @Input() editorView: EditorView;
  isActive = false;
  isDisabled = false;

  onClick(e: MouseEvent): void {
    e.preventDefault();
    const { state, dispatch } = this.editorView;
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

    const newState = this.editorView.state.reconfigure({
      plugins: this.editorView.state.plugins.concat([plugin]),
    });

    this.editorView.updateState(newState);
  }
}
```
