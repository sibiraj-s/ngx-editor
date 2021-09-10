import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { environment } from '../environments/environment';

import { Validators, Editor, Toolbar, DEFAULT_TOOLBAR } from 'ngx-editor';

import jsonDoc from './doc';
import schema from './schema';
import plugins from './plugins';
import nodeViews from './nodeviews';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, OnDestroy {
  isProdMode = environment.production;

  editordoc = jsonDoc;

  editor: Editor;
  toolbar: Toolbar = DEFAULT_TOOLBAR;

  form = new FormGroup({
    editorContent: new FormControl({ value: jsonDoc, disabled: false }, Validators.required(schema))
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent');
  }

  ngOnInit(): void {
    this.editor = new Editor({
      schema,
      plugins,
      nodeViews,
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
      attributes: { enterkeyhint: 'enter' },
      features: {
        linkOnPaste: true,
        resizeImage: true
      }
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
