# Reactive Forms

## Module

```ts
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NgxEditorModule } from "ngx-editor";

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, NgxEditorModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## AppComponent

```ts
import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})

export class AppComponent {
  form = new FormGroup({
    editorContent: new FormControl(null)
  });

  ngOnInit() {
    this.form.valueChanges.subscribe((val) => {
      console.log("Value Changes:", val);
    });
  }
}
```

## Template

```html
<form [formGroup]="form">
  <ngx-editor formControlName="editorContent"></ngx-editor>
</form>
```
