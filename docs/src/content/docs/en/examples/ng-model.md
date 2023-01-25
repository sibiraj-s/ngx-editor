---
title: NgModel
---

Input can be a [prosemirror document object](https://prosemirror.net/docs/ref/#model.Document_Structure) or `undefined` or `null`

```ts
export class AppComponent implements OnInit, OnDestroy {
  html = '';

  onChange(html: object) {
    this.html = '';
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestory(): void {
    this.editor.destroy();
  }
}
```

```html
<ngx-editor [ngModel]="html" (ngModelChange)="onChange"></ngx-editor>
```
