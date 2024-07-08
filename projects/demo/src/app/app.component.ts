import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation, isDevMode } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Validators, Editor, Toolbar, DEFAULT_TOOLBAR, NgxEditorModule } from 'ngx-editor';

import jsonDoc from './doc';
import schema from './schema';
import nodeViews from './nodeviews';
import { CustomMenuComponent } from './components/custom-menu/custom-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    CustomMenuComponent,
  ],
})

export class AppComponent implements OnInit, OnDestroy {
  isDevMode = isDevMode();

  editordoc = jsonDoc;

  editor: Editor;
  toolbar: Toolbar = DEFAULT_TOOLBAR;

  form = new FormGroup({
    editorContent: new FormControl({ value: jsonDoc, disabled: false }, Validators.required(schema)),
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent');
  }

  ngOnInit(): void {
    this.editor = new Editor({
      schema,
      nodeViews,
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
      attributes: { enterkeyhint: 'enter' },
      features: {
        linkOnPaste: true,
        resizeImage: true,
      },
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
