---
title: NgModel
---

The editor works with `ngModel` like any other form input. Import `FormsModule` from `@angular/forms` and bind the value with `[(ngModel)]`.

```ts title="app.component.ts"
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorComponent } from 'ngx-editor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [FormsModule, NgxEditorComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  editor: Editor;
  html = '<p>Hello world!</p>';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
```

```html title="app.component.html"
<ngx-editor [editor]="editor" [(ngModel)]="html"></ngx-editor>
```

`html` now always holds the latest content of the editor, and setting `html` updates the editor.

### Value

The value can be

- an HTML string
- a [prosemirror document object](https://prosemirror.net/docs/ref/#model.Document_Structure) (JSON doc)
- `null` or `undefined` for an empty editor

The editor emits the value in the same format it received it. If the initial value is an HTML string, changes are emitted as HTML; otherwise they are emitted as a JSON doc. Use the `outputFormat` prop to always get a specific format.

```html
<ngx-editor
  [editor]="editor"
  [(ngModel)]="html"
  outputFormat="html"
></ngx-editor>
```

To react to every change, split the binding:

```html
<ngx-editor
  [editor]="editor"
  [ngModel]="html"
  (ngModelChange)="onChange($event)"
></ngx-editor>
```

```ts
onChange(html: string): void {
  this.html = html;
}
```

See [Working with HTML/JSON doc](/ngx-editor/doc-html-doc/) to convert between the two formats.
