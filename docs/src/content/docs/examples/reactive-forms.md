---
title: Reactive Forms
---

### Configure the Module

```ts
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Component

```ts title="app.component.ts"
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    editorContent: new FormControl(null, [Validators.required()]),
  });

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
```

### Template

```html title="app.component.html"
<form [formGroup]="form">
  <ngx-editor [editor]="editor" formControlName="editorContent"></ngx-editor>
</form>
```

### Validators

```ts
import { Validators } from 'ngx-editor';

Validators.required(schema); // pass schema if you are using a custom schema else leave it empty
Validators.maxLength(maxLenght, schema);
Validators.minLength(minLenght, schema);
```

### Enable or disable the editor via Forms API

If using reactive forms, enabling and disabling of the component should be accomplished by enabling or disabling the form control
rather than through the html `disabled` attribute.

For example:

```ts
this.form.get('editorContent').disable();
this.form.get('editorContent').enable();
```
