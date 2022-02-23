import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxEditorModule } from 'ngx-editor';

import { CustomMenuComponent } from './components/custom-menu/custom-menu.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ],
  declarations: [
    AppComponent,
    CustomMenuComponent,
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
