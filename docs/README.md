# NgxEditor

<p align="center">
  <a href="https://github.com/sibiraj-s/ngx-editor">
   <img src="./ngx-editor.svg" alt="ngxEditor">
  </a>
</p>
<p align="center">A Simple WYSIWYG Editor for Angular Applications.</p>
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

> NOTE: This is documentation for ngx-editor v5.x. View here for [ngx-editor@4.x documentation](https://github.com/sibiraj-s/ngx-editor/tree/v4.1.0). v4 just uses plain contentediable and is not recommened since the behaviour is inconsitent across browsers.

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ngx-editor --save
# or
yarn add ngx-editor
```

### Usage

**Note**: By default the editor comes with bare minimal features enabled to reduce the size of the bundle. Refer the [demo](#demo) and [documentation](#documentation) for more details and examples.

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
<ngx-editor [ngModel]="jsonDoc"></ngx-editor>
```

For `ngModel` to work, You must import `FormsModule` from `@angular/forms`

### Optional Configuration

```ts
import { menu, placeholder, schema } from 'ngx-editor';

NgxEditorModule.forRoot({
  schema, // optional scheama, see https://sibiraj.dev/ngx-editor/#/schema
  plugins: [
    menu({
      // default options (Optional)
      toolbar: [
        ['bold', 'italic', 'code'], // inline icons
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }][codemirror], // dropdown // custom menu, https://sibiraj.dev/ngx-editor/#/menu
      ],
      labels: {
        bold: 'Bold',
        italics: 'Italics',
        code: 'Code',
        ordered_list: 'Ordered List',
        bullet_list: 'Bullet List',
        heading: 'Heading',
      },
    }),
    placholder('Type something here...'),
  ],
  nodeViews: {}, // optional, see https://prosemirror.net/examples/footnote/
});
```

## Browser Compatibility

All Evergreen-Browsers are supported

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Opera

## Angular Compatibility

Angular 9+.

## Demo

Demo at stackblitz https://ngx-editor.stackblitz.io/

Edit the stackblitz here https://stackblitz.com/edit/ngx-editor

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[github]: https://sibiraj-s.github.io/
[wiki]: https://github.com/sibiraj-s/ngx-editor/wiki/ngxEditor
