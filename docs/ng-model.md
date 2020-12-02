# NgModel

Input can be a [prosemirror document object](https://prosemirror.net/docs/ref/#model.Document_Structure) or `undefined` or `null`

```ts
class AppComponent {
  jsonDoc = null;

  onChange(doc: object) {
    this.jsonDoc = doc;
  }
}
```

```html
<ngx-editor [ngModel]="jsonDoc" (ngModelChange)="onChange"></ngx-editor>
```
