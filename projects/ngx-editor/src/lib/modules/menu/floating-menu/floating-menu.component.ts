import {
  Component, ElementRef, HostBinding,
  HostListener, Input, OnDestroy, OnInit
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
    return {
      visibility: this.showMenu ? 'visible' : 'hidden',
      opacity: this.showMenu ? '1' : '0',
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
  private resizeSubscription: Subscription;
  execulableItems: TBItems[] = [];
  activeItems: TBItems[] = [];

  @HostListener('document:mousedown', ['$event']) onMouseDown(e: MouseEvent): void {
    const target = e.target as Node

    if (this.el.nativeElement.contains(target) && target.nodeName !== 'INPUT') {
      e.preventDefault();
      return;
    }

    this.dragging = true;
  }

  @HostListener('document:keydown', ['$event']) onKeyDown(e: KeyboardEvent): void {
    const target = e.target as Node

    if (target.nodeName === 'INPUT') {
      return;
    }

    this.dragging = true;
    this.hide();
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp(e: MouseEvent): void {
    const target = e.target as Node

    if (this.el.nativeElement.contains(target) || target.nodeName === 'INPUT') {
      e.preventDefault();
      return
    }

    this.dragging = false;
    this.useUpdate();
  }

  @HostListener('document:keyup', ['$event']) onKeyUp(e: KeyboardEvent): void {
    const target = e.target as Node

    if (target.nodeName === 'INPUT') {
      return;
    }

    this.dragging = false;
    this.useUpdate();
  }

  private useUpdate(): void {
    if (!this.view) {
      return;
    }

    this.update(this.view);
  }

  private hide(): void {
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

    this.show();
  }

  ngOnInit(): void {
    if (!this.editor) {
      throw new Error('NgxEditor: Required editor instance');
    }

    this.updateSubscription = this.editor.update
      .subscribe((view) => {
        this.update(view);
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
