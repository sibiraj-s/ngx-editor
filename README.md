# NgxEditor

<p align="center">
  <a href="https://github.com/sibiraj-s/ngx-editor">
   <img src="./sketch/ngx-editor.svg" alt="ngxEditor">
  </a>
</p>
<p align="center">The Rich Text Editor for Angular, Built on ProseMirror</p>
<p align="center">
  <a href="https://github.com/sibiraj-s/ngx-editor/actions">
    <img alt="Tests" src="https://github.com/sibiraj-s/ngx-editor/workflows/Tests/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/ngx-editor">
    <img alt="npm version" src="https://badgen.net/npm/v/ngx-editor">
  </a>
  <a href="https://www.npmjs.com/package/ngx-editor">
    <img alt="npm" src="https://badgen.net/npm/dm/ngx-editor">
  </a>
  <a href="https://www.npmjs.com/package/ngx-editor">
    <img alt="npm" src="https://badgen.net/npm/dt/ngx-editor">
  </a>
  <br />
  <a href="https://github.com/sibiraj-s/ngx-editor/blob/master/LICENSE">
    <img alt="licence" src="https://badgen.net/npm/license/ngx-editor">
  </a>
</p>

> A simple rich text editor for angular applications built with ProseMirror. It is a drop in and easy-to-use editor
> and can be easily extended using prosemirror plugins to build any additional or missing features

## Getting Started

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
  <ngx-editor [editor]="editor" [ngModel]="html" [disabled]="false" [placeholder]="'Type here...'"></ngx-editor>
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
this.editor.commands.textColor('red').insertText('Hello world!').focus().scrollIntoView().exec();
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
- Safari
- Opera

## Angular Compatibility

Angular 14+.

## Collaborative Editing

See https://sibiraj-s.github.io/ngx-editor/#/collab

## Icons

Icons are from https://fonts.google.com/icons

## Contributing

All contributions are welcome. See [CONTRIBUTING.md](./.github/CONTRIBUTING.md) to get started.

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[documentation]: https://sibiraj-s.github.io/ngx-editor
[demo]: https://ngx-editor.stackblitz.io/
[stackblitz]: https://stackblitz.com/edit/ngx-editor
[migration]: https://sibiraj-s.github.io/ngx-editor/#/migration
