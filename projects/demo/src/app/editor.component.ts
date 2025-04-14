import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation, isDevMode } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  DEFAULT_TOOLBAR,
  Editor,
  NgxEditorComponent,
  NgxFloatingMenuComponent,
  NgxMenuComponent,
  Toolbar,
  Validators,
} from 'ngx-editor';

import { AppCustomMenuComponent } from './components/custom-menu/custom-menu.component';
import jsonDoc from './doc';
import nodeViews from './nodeviews';
import schema from './schema';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorComponent,
    NgxMenuComponent,
    NgxFloatingMenuComponent,
    AppCustomMenuComponent,
  ],
})
export class EditorComponent implements OnInit, OnDestroy {
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
