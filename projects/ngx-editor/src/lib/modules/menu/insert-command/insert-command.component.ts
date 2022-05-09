import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { Subscription } from 'rxjs';

import Icon from '../../../icons';
import { InsertCommands } from '../MenuCommands';
import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import { TBItems, ToolbarItem } from '../../../types';

@Component({
  selector: 'ngx-insert-command',
  templateUrl: './insert-command.component.html',
  styleUrls: ['./insert-command.component.scss'],
})

export class InsertCommandComponent implements OnInit, OnDestroy {
  @Input() toolbarItem: ToolbarItem;

  get name(): TBItems {
    return this.toolbarItem as TBItems;
  }

  html: string;
  editorView: EditorView;
  disabled = false;
  private updateSubscription: Subscription;

  constructor(
    private ngxeService: NgxEditorService,
    private menuService: MenuService,
  ) { }

  insert(e: MouseEvent): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    const { state, dispatch } = this.editorView;
    const command = InsertCommands[this.name];
    command.insert()(state, dispatch);
  }

  update = (view: EditorView): void => {
    const { state } = view;
    const command = InsertCommands[this.name];
    this.disabled = !command.canExecute(state);
  };

  getTitle(name: string): string {
    return this.ngxeService.locals.get(name);
  }

  ngOnInit(): void {
    this.html = Icon.get(this.name);

    this.editorView = this.menuService.editor.view;

    this.updateSubscription = this.menuService.editor.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
