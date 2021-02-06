import {
  Component, ElementRef,
  Input, OnDestroy, OnInit
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { EditorView } from 'prosemirror-view';
import { Subscription } from 'rxjs';

import Editor from '../../../Editor';
import Icon from '../../../icons';
import { TBItems } from '../../../types';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { ToggleCommands } from '../MenuCommands';

@Component({
  selector: 'ngx-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent implements OnInit, OnDestroy {
  constructor(private el: ElementRef<HTMLElement>, private sanitizeHTML: SanitizeHtmlPipe) { }

  private get view(): EditorView {
    return this.editor.view;
  }

  @Input() editor: Editor;

  private updateSubscription: Subscription;
  execulableItems: TBItems[] = [];
  activeItems: TBItems[] = [];

  toolbar: TBItems[][] = [
    ['bold', 'italic', 'underline', 'strike'],
    ['ordered_list', 'bullet_list', 'blockquote', 'code'],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];

  toggleCommands: TBItems[] = [
    'bold', 'italic', 'underline', 'strike',
    'ordered_list', 'bullet_list', 'blockquote', 'code',
    'align_left', 'align_center', 'align_right', 'align_justify'
  ];

  getIcon(name: TBItems): SafeHtml {
    const icon = Icon.getPath(name);
    return this.sanitizeHTML.transform(icon);
  }

  onClick(e: MouseEvent, commandName: TBItems): void {
    e.preventDefault();
    if (e.button !== 0) {
      return;
    }

    const { state, dispatch } = this.view;

    const command = ToggleCommands[commandName];
    command.toggle()(state, dispatch);
  }

  private update(view: EditorView): void {
    this.activeItems = [];
    this.execulableItems = [];
    const { state } = view;

    this.toggleCommands.forEach(toolbarItem => {
      const command = ToggleCommands[toolbarItem];

      const isActive = command.isActive(state);
      if (isActive) {
        this.activeItems.push(toolbarItem);
      }

      const canExecute = command.canExecute(state);

      if (canExecute) {
        this.execulableItems.push(toolbarItem);
      }
    });
  }

  ngOnInit(): void {
    this.updateSubscription = this.editor.update
      .subscribe((view) => {
        this.update(view);
      });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
