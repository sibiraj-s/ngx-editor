---
title: Introduction
description: Docs intro
layout: ../../layouts/MainLayout.astro
---

### Getting Started

[demo] | [edit on stackblitz][stackblitz] | [documentation] | [migrating from other editors][migration]

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ngx-editor --save
# or
yarn add ngx-editor
```

### Usage

**Note**: By default the editor comes with minimal features. Refer the [demo](#demo) and [documentation] for more details and examples.

Import `ngx-editor` module

```ts
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [NgxEditorModule],
})
export class AppModule {}
```

Component

```ts
import { Editor } from 'ngx-editor';

export class EditorComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: '';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
```

Then in HTML

```html
<div class="NgxEditor__Wrapper">
  <ngx-editor-menu [editor]="editor"> </ngx-editor-menu>
  <ngx-editor
    [editor]="editor"
    [ngModel]="html"
    [disabled]="false"
    [placeholder]="'Type here...'"
  ></ngx-editor>
</div>
```

Note: Input can be a HTML string or a jsonDoc

### Working with HTML

If the Input to the component is HTML, output will be HTML. To manually convert json output from the editor to html

```ts
import { toHTML } from 'ngx-editor';

const html = toHTML(jsonDoc, schema); // schema is optional
```

Or to convert HTML to json. Optional, as Editor will accept HTML input

```ts
import { toDoc } from 'ngx-editor';

const jsonDoc = toDoc(html);
```

### Commands

```ts
this.editor.commands
  .textColor('red')
  .insertText('Hello world!')
  .focus()
  .scrollIntoView()
  .exec();
```

Run `exec` to apply the changes to the editor.

### Optional Configuration

You can specify locals to be used in the editor

```ts
NgxEditorModule.forRoot({
  locals: {
    bold: 'Bold',
    italic: 'Italic',
    code: 'Code',
    underline: 'Underline',
    // ...
  },
});
```

## Browser Compatibility

Mostly works on all Evergreen-Browsers like

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Opera
- Safari

## Angular Compatibility

Angular 14+.

## Collaborative Editing

See https://sibiraj-s.github.io/ngx-editor/#/collab

## Icons

Icons are from https://fonts.google.com/icons

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[documentation]: https://sibiraj-s.github.io/ngx-editor
[demo]: https://ngx-editor.stackblitz.io/
[stackblitz]: https://stackblitz.com/edit/ngx-editor
[migration]: https://sibiraj-s.github.io/ngx-editor/#/migration
