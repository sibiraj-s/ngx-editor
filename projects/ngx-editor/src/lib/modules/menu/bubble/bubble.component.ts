import { Component, OnDestroy, OnInit, input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { EditorView } from 'prosemirror-view';
import { Observable, Subscription } from 'rxjs';

import { AsyncPipe, CommonModule } from '@angular/common';
import Editor from '../../../Editor';
import { NgxEditorService } from '../../../editor.service';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { TBItems } from '../../../types';
import { ToggleCommands } from '../MenuCommands';

@Component({
  selector: 'ngx-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
  imports: [AsyncPipe, CommonModule],
  providers: [SanitizeHtmlPipe],
})
export class BubbleComponent implements OnInit, OnDestroy {
  constructor(
    private sanitizeHTML: SanitizeHtmlPipe,
    private ngxeService: NgxEditorService,
  ) { }

  private get view(): EditorView {
    return this.editor().view;
  }

  readonly editor = input<Editor>(undefined);

  private updateSubscription: Subscription;
  execulableItems: TBItems[] = [];
  activeItems: TBItems[] = [];

  toolbar: TBItems[][] = [
    ['bold', 'italic', 'underline', 'strike'],
    ['ordered_list', 'bullet_list', 'blockquote', 'code'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  toggleCommands: TBItems[] = [
    'bold',
    'italic',
    'underline',
    'strike',
    'ordered_list',
    'bullet_list',
    'blockquote',
    'code',
    'align_left',
    'align_center',
    'align_right',
    'align_justify',
  ];

  getIcon(name: TBItems): SafeHtml {
    return this.sanitizeHTML.transform(this.ngxeService.getIcon(name));
  }

  getTitle(name: string): Observable<string> {
    return this.ngxeService.locals.get(name);
  }

  trackByIndex(index: number): number {
    return index;
  }

  onClick(e: MouseEvent, commandName: TBItems): void {
    e.preventDefault();
    e.stopPropagation();

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

    this.toggleCommands.forEach((toolbarItem) => {
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
    this.updateSubscription = this.editor().update.subscribe((view) => {
      this.update(view);
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
