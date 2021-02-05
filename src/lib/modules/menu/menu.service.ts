import { Injectable, TemplateRef } from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { Subject } from 'rxjs';

import Editor from '../../Editor';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  #editor: Editor;
  customMenuRefChange: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>();


  constructor() { }

  set editor(e: Editor) {
    this.#editor = e;
  }

  get editor(): Editor {
    return this.#editor;
  }

  setCustomMenuRef(c: TemplateRef<any>): void {
    this.customMenuRefChange.next(c);
  }
}
