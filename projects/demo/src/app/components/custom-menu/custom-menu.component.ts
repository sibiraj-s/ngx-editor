import { CommonModule } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { setBlockType } from 'prosemirror-commands';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { Editor } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AppCustomMenuComponent implements OnInit {
  readonly editor = input<Editor>(undefined);
  isActive = false;
  isDisabled = false;

  onClick(e: MouseEvent): void {
    e.preventDefault();
    const { state, dispatch } = this.editor()().view;
    this.execute(state, dispatch);
  }

  execute(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const { schema } = state;

    if (this.isActive) {
      return setBlockType(schema.nodes['paragraph'])(state, dispatch);
    }

    return setBlockType(schema.nodes['code_mirror'])(state, dispatch);
  }

  update = (view: EditorView): void => {
    const { state } = view;
    const { schema } = state;
    this.isActive = isNodeActive(state, schema.nodes['code_mirror']);
    this.isDisabled = !this.execute(state, null); // returns true if executable
  };

  ngOnInit(): void {
    this.editor()().update.subscribe((view) => this.update(view));
  }
}
