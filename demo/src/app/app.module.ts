import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxEditorModule } from 'ngx-editor';

import schema from './schema';
import plugins from './plugins';
import nodeViews from './nodeviews';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgxEditorModule.forRoot({
      schema,
      plugins,
      nodeViews
    }),
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
