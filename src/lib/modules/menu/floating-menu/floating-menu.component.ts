import {
  Component, ContentChild, ContentChildren, ElementRef, HostBinding,
  HostListener, Input, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NodeSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { asyncScheduler, fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import Editor from '../../../Editor';
import Icon from '../../../icons';
import { TBItems } from '../../../types';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize/sanitize-html.pipe';
import { ToggleCommands } from '../MenuCommands';

interface BubblePosition {
  top: number;
  left: number;
}

@Component({
  selector: 'ngx-editor-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss']
})
export class FloatingMenuComponent implements OnInit, OnDestroy {

  constructor(public el: ElementRef<HTMLElement>, private sanitizeHTML: SanitizeHtmlPipe) { }

  @HostBinding('style') get display(): Partial<CSSStyleDeclaration> {
    if (!this.showMenu) {
      return {
        visibility: 'hidden'
      };
    }

    return {
      visibility: 'visible',
      top: this.posTop + 'px',
      left: this.posLeft + 'px',
    };
  }

  private get view(): EditorView {
    return this.editor.view;
  }

  @Input() editor: Editor;

  private posLeft = 0;
  private posTop = 0;
  private showMenu = false;
  private updateSubscription: Subscription;
  private dragging = false;
  private clicked = false;
  private resizeSubscription: Subscription;
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

  @HostListener('document:mousedown') onMouseDown(): void {
    this.dragging = true;
  }

  @HostListener('document:keydown') onKeyDown(): void {
    this.dragging = true;
  }

  @HostListener('document:mouseup') onMouseUp(): void {
    this.dragging = false;
    this.useUpdate();
  }

  @HostListener('document:keyup') onKeyUp(): void {
    this.dragging = false;
    this.useUpdate();
  }

  private useUpdate(): void {
    if (!this.view) {
      return;
    }
    this.update(this.view);
  }

  getIcon(name: TBItems): SafeHtml {
    const icon = Icon.getPath(name);
    return this.sanitizeHTML.transform(icon);
  }

  private hide(): void {
    this.clicked = false;
    this.showMenu = false;
  }

  private show(): void {
    this.showMenu = true;
  }

  private calculateBubblePosition(view: EditorView): BubblePosition {
    const { state: { selection } } = view;
    const { from } = selection;

    // the floating bubble itself
    const bubbleEl = this.el.nativeElement;
    const bubble = bubbleEl.getBoundingClientRect();

    // The box in which the tooltip is positioned, to use as base
    const box = bubbleEl.parentElement.getBoundingClientRect();

    const start = view.coordsAtPos(from);

    let left = start.left - box.left;

    const overflowsRight = (
      box.right < (start.left + bubble.width) ||
      bubble.right > box.right
    );

    if (overflowsRight) {
      left = box.width - bubble.width;
    }

    // if
    if (left < 0) {
      left = 0;
    }

    const bubbleHeight = bubble.height + parseInt(getComputedStyle(bubbleEl).marginBottom, 10);
    const top = (start.top - box.top) - bubbleHeight;

    return {
      left,
      top
    };
  }

  private update(view: EditorView): void {
    const { state } = view;
    const { selection } = state;
    const { empty } = selection;

    if (selection instanceof NodeSelection) {
      if (selection.node.type.name === 'image') {
        this.hide();
        return;
      }
    }

    const hasFocus = this.view.hasFocus();

    if (!hasFocus || empty || this.dragging) {
      this.hide();
      return;
    }

    const { top, left } = this.calculateBubblePosition(this.view);

    this.posLeft = left;
    this.posTop = top;

    if (!this.clicked) {
      this.show();
    }
  }

  onClick(e: MouseEvent, commandName: TBItems): void {
    e.preventDefault();
    if (e.button !== 0) {
      return;
    }

    const { state, dispatch } = this.view;

    const command = ToggleCommands[commandName];
    command.toggle()(state, dispatch);
    this.clicked = true;
  }

  private findActiveAndDisabledItems(view: EditorView): void {
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
        this.findActiveAndDisabledItems(view);
      });

    this.resizeSubscription = fromEvent(window, 'resize').pipe(
      throttleTime(500, asyncScheduler, { leading: true, trailing: true })
    ).subscribe(() => {
      this.useUpdate();
    });
  }


  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
    this.resizeSubscription.unsubscribe();
  }
}
