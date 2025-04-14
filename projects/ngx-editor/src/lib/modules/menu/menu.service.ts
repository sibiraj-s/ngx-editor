import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import Editor from '../../Editor';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  editor: Editor;
  customMenuRefChange: Subject<TemplateRef<unknown>> = new Subject<TemplateRef<unknown>>();

  setCustomMenuRef(c: TemplateRef<unknown>): void {
    this.customMenuRefChange.next(c);
  }
}
