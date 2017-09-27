# NgxEditor

<p align="center">
  <img src="./icons/ngx-editor.svg">
</p>

A Simple WYSIWYG Editor for Angular Applications.

## Getting Started

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ngx-editor@1.0.0-alpha --save
# or
yarn add ngx-editor@1.0.0-alpha
```

### Usage

Import `ngx-editor` module

```typescript
import { NgxEditorModule } from 'ngx-editor'

@NgModule({
  imports: [ NgxEditorModule ]
})
```
In HTML

```html
<app-ngx-editor [placeholder]="'Enter text here...'"></app-ngx-editor>
```
