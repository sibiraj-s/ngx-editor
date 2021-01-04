### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ngx-editor --save
# or
yarn add ngx-editor
```

### Usage

Import `ngx-editor` module

```ts
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [NgxEditorModule],
})
export class AppModule {}
```

Initialize editor in the component

```ts
import { Editor } from 'ngx-editor';

export class AppComponent implements OnInit, OnDestroy {
  html = '';
  editor: Editor;
  ngOnInit(): void {
    this.editor = new Editor({
      schema,
      plugins,
      nodeViews,
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
```

Then in HTML

```html
<ngx-editor [editor]="editor" [ngModel]="html"></ngx-editor>
```

<iframe src="https://stackblitz.com/edit/ngx-editor-quickstart?embed=1&file=src/app/app.component.ts&hideExplorer=1&view=preview" height="600"></iframe>

For `ngModel` to work, You must import `FormsModule` from `@angular/forms`

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
