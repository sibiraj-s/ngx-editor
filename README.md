# NgxEditor

<p align="center">
  <img src="./icons/ngx-editor.png">
</p>

A Simple WYSIWYG Editor for Angular Applications.

## Getting Started

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ngx-editor@1.0.0-alpha.2 --save
# or
yarn add ngx-editor@1.0.0-alpha.2
```

### Usage

Import `ngx-editor` module

```typescript
import { NgxEditorModule } from 'ngx-editor'

@NgModule({
  imports: [ NgxEditorModule ]
})
```

Import [font-awesome](https://github.com/FortAwesome/Font-Awesome) into your application

Then in HTML

```html
<app-ngx-editor [placeholder]="'Enter text here...'"></app-ngx-editor>
```
