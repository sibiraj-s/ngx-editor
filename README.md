# NgxEditor

<p align="center">
  <a href="https://github.com/sibiraj-s/ngx-editor">
   <img src="./sketch/ngx-editor.png" alt="ngxEditor">
  </a>
</p>
<p align="center">Rich Text Editor for angular using ProseMirror</p>
<p align="center">
  <a href="https://travis-ci.org/sibiraj-s/ngx-editor">
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
  <a href="https://github.com/sibiraj-s/ngx-editor/blob/master/LICENSE">
    <img alt="licence" src="https://badgen.net/npm/license/ngx-editor">
  </a>
</p>

## Getting Started

[demo] | [edit on stackblitz][stackblitz] | [documentation] | [migrating from v4][migration] | [migrating from other editors][migration]

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ngx-editor --save
# or
yarn add ngx-editor
```

### Usage

**Note**: By default the editor comes with bare minimal features. Refer the [demo](#demo) and [documentation] for more details and examples.

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
import { Editor, Toolbar } from 'ngx-editor';

export class EditorComponent implements OnInit, OnDestroy {
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  html: '';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
```

Then in HTML

```html
<div class="NgxEditor__Wrapper">
  <ngx-editor-menu [editor]="editor" [toolbar]="toolbar"> </ngx-editor-menu>
  <ngx-editor
    [editor]="editor"
    [ngModel]="html"
    [editable]="true"
    [placeholder]="Type here..."
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
    // menu
    bold: 'Bold',
    italic: 'Italic',
    code: 'Code',
    underline: 'Underline',
    strike: 'Strike',
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

## Browser Compatibility

Mostly works on all Evergreen-Browsers like

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Opera

## Angular Compatibility

Angular 9+.

## Demo

Demo at stackblitz https://ngx-editor.stackblitz.io/

Edit the stackblitz here https://stackblitz.com/edit/ngx-editor

## Collaborative Editing

See https://sibiraj-s.github.io/ngx-editor/#/collab

## Icons

Icons are from https://material.io/resources/icons/

## Contributing

All contributions are welcome.

See [CONTRIBUTING.md](./.github/CONTRIBUTING.md) to get started.

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[documentation]: https://sibiraj-s.github.io/ngx-editor
[demo]: https://ngx-editor.stackblitz.io/
[stackblitz]: https://stackblitz.com/edit/ngx-editor
[migration]: https://sibiraj-s.github.io/ngx-editor/#/migration
