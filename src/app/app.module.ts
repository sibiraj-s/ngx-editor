import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxEditorModule } from './ngx-editor/ngx-editor.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
