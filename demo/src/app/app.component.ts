import { Component, ViewEncapsulation } from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { environment } from '../environments/environment';

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

  editorContent: object = jsonDoc;

  editorContentChange(doc: object): void {
    this.editorContent = doc;
  }

  init(view: EditorView): void {
    this.editorView = view;
  }
}
