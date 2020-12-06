import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { EditorView } from 'prosemirror-view';

import { SimpleCommands } from '../MenuCommands';
import Icon from '../../../icons';
import { NgxEditorService } from '../../../editor.service';

@Component({
  selector: 'ngx-simple-command',
  templateUrl: './simple-command.component.html',
  styleUrls: ['./simple-command.component.scss']
})

export class SimpleCommandComponent implements OnInit {
  @Input() name: string;

  html: string;
  editorView: EditorView;

  constructor(private ngxeService: NgxEditorService) {
    this.editorView = this.ngxeService.view;

    this.ngxeService.editorUpdate.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  @HostBinding('class.NgxEditor__MenuItem--Active') isActive = false;
  @HostBinding('class.NgxEditor--Disabled') disabled = false;

  toggle(e: MouseEvent): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    const { state, dispatch } = this.editorView;
    const command = SimpleCommands.get(this.name);
    command.execute(state, dispatch);
  }

  update = (view: EditorView) => {
    const { state } = view;
    const command = SimpleCommands.get(this.name);
    this.isActive = command.isActive(state);
    this.disabled = !command.canExecute(state);
  }

  getTitle(name: string): string {
    return this.ngxeService.i18n.get(name);
  }

  ngOnInit(): void {
    this.html = Icon.get(this.name);
  }
}
