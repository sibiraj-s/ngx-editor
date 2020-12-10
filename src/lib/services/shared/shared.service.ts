import { Injectable, TemplateRef } from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  #view: EditorView;
  customMenuRefChange: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>();

  plugin = {
    update: new Subject<EditorView>(),
    destroy:  new Subject<void>()
  };

  constructor() { }

  set view(v: EditorView) {
    this.#view = v;
  }

  get view(): EditorView {
    return this.#view;
  }

  setCustomMenuRef(c: TemplateRef<any>): void {
    this.customMenuRefChange.next(c);
  }
}
