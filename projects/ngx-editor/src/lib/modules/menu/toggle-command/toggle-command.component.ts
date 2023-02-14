import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { Subscription } from 'rxjs';

import { ToggleCommands } from '../MenuCommands';
import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import { TBItems, ToolbarItem } from '../../../types';
import Icon from '../../../icons/index';

@Component({
  selector: 'ngx-toggle-command',
  templateUrl: './toggle-command.component.html',
  styleUrls: ['./toggle-command.component.scss'],
})

export class ToggleCommandComponent implements OnInit, OnDestroy {
  @Input() toolbarItem: ToolbarItem;

  get name(): TBItems {
    return this.toolbarItem as TBItems;
  }

  html: string;
  editorView: EditorView;
  isActive = false;
  disabled = false;
  private updateSubscription: Subscription;

  constructor(
    private ngxeService: NgxEditorService,
    private menuService: MenuService,
  ) { }

  toggle(e: MouseEvent): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    const { state, dispatch } = this.editorView;
    const command = ToggleCommands[this.name];
    command.toggle()(state, dispatch);
  }

  update = (view: EditorView): void => {
    const { state } = view;
    const command = ToggleCommands[this.name];
    this.isActive = command.isActive(state);
    this.disabled = !command.canExecute(state);
  };

  getTitle(name: string): string {
    return this.ngxeService.locals.get(name);
  }

  ngOnInit(): void {
    const icon = this.ngxeService.config.icons[this.name]
      ? this.ngxeService.config.icons[this.name]
      : Icon.get(this.name);
    this.html = icon;

    this.editorView = this.menuService.editor.view;

    this.updateSubscription = this.menuService.editor.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
