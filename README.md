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

> NOTE: This is documentation for ngx-editor v5.x. View here for [ngx-editor@4.x documentation](https://github.com/sibiraj-s/ngx-editor/tree/v4.1.0).
> v4 just uses plain contentediable and is not recommened since the behaviour is inconsitent across browsers.

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ngx-editor --save
# or
yarn add ngx-editor
```

### Usage

**Note**: By default the editor comes with bare minimal features enabled to reduce the size of the bundle. Refer the [demo](#demo) and [documentation] for more details and examples.

Import `ngx-editor` module

```ts
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [NgxEditorModule],
})
export class AppModule {}
```

Then in HTML

```html
<ngx-editor
  [ngModel]="html"
  [editable]="true"
  [placeholder]="Type here..."
></ngx-editor>
```

Note: Input can be a HTML string or a jsonDoc

### Working with HTML

To convert json output from the editor to html

```ts
import { toHTML } from 'ngx-editor';

const html = toHTML(jsonDoc, schema); // schema is optional
```

To convert HTML to json. Optional, Editor will accept HTML input

```ts
import { toDoc } from 'ngx-editor';

const jsonDoc = toDoc(html);
```

### Optional Configuration

```ts
import { schema } from 'ngx-editor';

NgxEditorModule.forRoot({
  schema, // optional scheama, see https://sibiraj-s.github.io/ngx-editor/#/schema
  plugins: [
    // include other prosemirror plugins
  ],
  menu: [
    // default options (Optional)
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ],
  nodeViews: {}, // optional, see https://prosemirror.net/examples/footnote/
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
[github]: https://sibiraj-s.github.io/
[documentation]: https://sibiraj-s.github.io/ngx-editor
[wiki]: https://github.com/sibiraj-s/ngx-editor/wiki/ngxEditor
