import { Component, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { NgxEditorService } from '../../../ngx-editor.service';
import { SimpleCommands } from '../MenuCommands';

@Component({
  selector: 'ngx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  view: EditorView;

  @Input() group: any;
  @Input() items: any;

  isDropdownOpen = false;
  selected: string;

  activeItems = [];
  disabledItems = [];
  activeItem: string | null;

  constructor(private ngxeService: NgxEditorService, private el: ElementRef) {
    this.view = this.ngxeService.view;
  }

  @HostBinding('class.NgxEditor__Dropdown--Selected') get isSelected(): boolean {
    return Boolean(this.activeItem || this.isDropdownOpen);
  }

  @HostBinding('class.NgxEditor--Disabled') get isDropdownDisabled(): boolean {
    return this.disabledItems.length === this.items.length;
  }

  @HostListener('document:click', ['$event.target']) onDocumentClick(target: Node): void {
    if (!this.el.nativeElement.contains(target) && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  getName(key: string): string {
    return this.ngxeService.i18n.get(key);
  }

  toggleDropdown(e: MouseEvent): void {
    e.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onClick(e: MouseEvent, item: string): void {
    e.preventDefault();

    // consider only left click
    if (e.button !== 0) {
      return;
    }

    const command = SimpleCommands.get(item);
    const { state, dispatch } = this.view;
    command.execute(state, dispatch);
    this.isDropdownOpen = false;
  }

  update = () => {
    const { state } = this.view;
    this.activeItems = [];
    this.disabledItems = [];

    this.items.forEach((item: string) => {
      const command = SimpleCommands.get(item);
      const isActive = command.isActive(state);

      if (isActive) {
        this.activeItems.push(item);
      }

      if (!command.canExecute(state)) {
        this.disabledItems.push(item);
      }
    });

    if (this.activeItems.length === 1) {
      this.activeItem = this.activeItems[0];
    } else {
      this.activeItem = null;
    }
  }

  ngOnInit(): void {
    this.selected = this.group;

    const plugin = new Plugin({
      key: new PluginKey(`ngx-menu-command-dropdown`),
      view: () => {
        return {
          update: this.update
        };
      }
    });

    const newState = this.view.state.reconfigure({
      plugins: this.view.state.plugins.concat([plugin])
    });

    this.view.updateState(newState);
  }

}
