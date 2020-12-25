import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxEditorModule } from 'ngx-editor';

import schema from './schema';
import plugins from './plugins';
import nodeViews from './nodeviews';
import { CustomMenuComponent } from './components/custom-menu/custom-menu.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule.forRoot({
      schema,
      plugins,
      nodeViews,
      menu: [
        ['bold', 'italic'],
        ['underline'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
      ]
    }),
  ],
  declarations: [
    AppComponent,
    CustomMenuComponent,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
