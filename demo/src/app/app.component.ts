import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { EditorView } from 'prosemirror-view';
import { environment } from '../environments/environment';
import { Validators } from 'ngx-editor';

import jsonDoc from './doc';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  isProdMode = environment.production;
  editorView: EditorView;
  editordoc = jsonDoc;

  form = new FormGroup({
    editorContent: new FormControl(jsonDoc, Validators.required())
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent');
  }

  init(view: EditorView): void {
    this.editorView = view;
  }
}
