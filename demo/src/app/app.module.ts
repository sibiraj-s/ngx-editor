import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    NgxEditorModule.forRoot({
      schema,
      plugins,
      nodeViews
    }),
  ],
  declarations: [
    AppComponent,
    CustomMenuComponent,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
