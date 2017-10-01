# NgxEditor

<p align="center">
 <a href="https://github.com/Sibiraj-S/ngx-editor">
   <img src="https://raw.githubusercontent.com/Sibiraj-S/ngx-editor/master/src/assets/icons/ngx-editor.png" alt="ngxEditor">
 </a>
</p>
<p align="center">A Simple WYSIWYG Editor for Angular2+ Applications.</p>

## Getting Started

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ngx-editor@1.0.0-beta.1 --save
# or
yarn add ngx-editor@1.0.0-beta.1
```

### Usage

Import `ngx-editor` module

```typescript
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [ NgxEditorModule ]
})
```

Import [font-awesome](https://github.com/FortAwesome/Font-Awesome) into your application

Then in HTML

```html
<app-ngx-editor [placeholder]="'Enter text here...'" [(html)]="htmlContent"></app-ngx-editor>
```

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[github]: https://sibiraj-s.github.io/