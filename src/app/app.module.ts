import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgxEditorModule } from './ngx-editor/ngx-editor.module';
import { SourceCodeDialogComponent } from './ngx-editor/source-code-dialog/source-code-dialog.component';

import {
  MatFormFieldModule, MatDialogModule,
} from '@angular/material';


@NgModule({
  declarations: [AppComponent, SourceCodeDialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEditorModule,
    FormsModule,
    BrowserAnimationsModule,

    MatFormFieldModule,
    MatDialogModule,

  ],
  providers: [],
  entryComponents: [SourceCodeDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
