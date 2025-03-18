import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { Observable, Subscription } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { NgxEditorService } from '../../../editor.service';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { HTML } from '../../../trustedTypesUtil';
import { TBItems, ToolbarItem } from '../../../types';
import { MenuService } from '../menu.service';
import { InsertCommands } from '../MenuCommands';

@Component({
  selector: 'ngx-insert-command',
  templateUrl: './insert-command.component.html',
  styleUrls: ['./insert-command.component.scss'],
  imports: [AsyncPipe, SanitizeHtmlPipe],
})
export class InsertCommandComponent implements OnInit, OnDestroy {
  @Input() toolbarItem: ToolbarItem;

  get name(): TBItems {
    return this.toolbarItem as TBItems;
  }

  html: HTML;
  editorView: EditorView;
  disabled = false;
  private updateSubscription: Subscription;

  constructor(
    private ngxeService: NgxEditorService,
    private menuService: MenuService,
  ) {}

  onMouseClick(e: MouseEvent): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    this.insert();
  }

  onKeydown(): void {
    this.insert();
  }

  insert(): void {
    const { state, dispatch } = this.editorView;
    const command = InsertCommands[this.name];
    command.insert()(state, dispatch);
  }

  update = (view: EditorView): void => {
    const { state } = view;
    const command = InsertCommands[this.name];
    this.disabled = !command.canExecute(state);
  };

  getTitle(name: string): Observable<string> {
    return this.ngxeService.locals.get(name);
  }

  ngOnInit(): void {
    this.html = this.ngxeService.getIcon(this.name);

    this.editorView = this.menuService.editor.view;

    this.updateSubscription = this.menuService.editor.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
