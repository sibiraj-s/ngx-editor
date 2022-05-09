import {
  Component, ElementRef, HostBinding,
  HostListener, Input, OnDestroy, OnInit,
} from '@angular/core';
import { NodeSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { asyncScheduler, fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import type { VirtualElement } from '@floating-ui/core';
import { computePosition, detectOverflow, offset, autoPlacement } from '@floating-ui/dom';

import { NgxEditorError } from 'ngx-editor/utils';
import Editor from '../../../Editor';

interface BubblePosition {
  top: number;
  left: number;
}

@Component({
  selector: 'ngx-editor-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss'],
})
export class FloatingMenuComponent implements OnInit, OnDestroy {
  constructor(public el: ElementRef<HTMLElement>) { }

  @HostBinding('style') get display(): Partial<CSSStyleDeclaration> {
    return {
      visibility: this.showMenu ? 'visible' : 'hidden',
      opacity: this.showMenu ? '1' : '0',
      top: `${this.posTop}px`,
      left: `${this.posLeft}px`,
    };
  }

  private get view(): EditorView {
    return this.editor.view;
  }

  @Input() editor: Editor;
  @Input() autoPlace = false;

  private posLeft = 0;
  private posTop = 0;
  private showMenu = false;
  private updateSubscription: Subscription;
  private dragging = false;
  private resizeSubscription: Subscription;

  @HostListener('document:mousedown', ['$event']) onMouseDown(e: MouseEvent): void {
    const target = e.target as Node;

    if (this.el.nativeElement.contains(target) && target.nodeName !== 'INPUT') {
      e.preventDefault();
      return;
    }

    this.dragging = true;
  }

  @HostListener('document:keydown', ['$event']) onKeyDown(e: KeyboardEvent): void {
    const target = e.target as Node;

    if (target.nodeName === 'INPUT') {
      return;
    }

    this.dragging = true;
    this.hide();
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp(e: MouseEvent): void {
    const target = e.target as Node;

    if (this.el.nativeElement.contains(target) || target.nodeName === 'INPUT') {
      e.preventDefault();
      return;
    }

    this.dragging = false;
    this.useUpdate();
  }

  @HostListener('document:keyup', ['$event']) onKeyUp(e: KeyboardEvent): void {
    const target = e.target as Node;

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

  private async calculateBubblePosition(view: EditorView): Promise<BubblePosition> {
    const { state: { selection } } = view;
    const { from, to } = selection;

    const start = view.coordsAtPos(from);
    const end = view.coordsAtPos(to);

    const selectionElement: VirtualElement = {
      getBoundingClientRect() {
        if (selection instanceof NodeSelection) {
          const node = view.nodeDOM(from) as HTMLElement;
          return node.getBoundingClientRect();
        }

        const { top, left } = start;
        const { bottom, right } = end;

        return {
          x: left,
          y: top,
          top,
          bottom,
          left,
          right,
          width: right - left,
          height: bottom - top,
        };
      },
    };

    // the floating bubble itself
    const bubbleEl = this.el.nativeElement;

    const { x: left, y: top } = await computePosition(selectionElement, bubbleEl, {
      placement: 'top',
      middleware: [
        offset(5),
        this.autoPlace && autoPlacement({
          boundary: view.dom,
          padding: 5,
          allowedPlacements: ['top', 'bottom'],
        }),
        {
          // prevent overflow on right and left side
          // since only top and bottom placements are allowed
          // autoplacement can't handle overflows on the right and left
          name: 'overflowMiddleware',
          async fn(middlewareArgs) {
            const overflow = await detectOverflow(middlewareArgs, {
              boundary: view.dom,
              padding: 5,
            });

            // overflows left
            if (overflow.left > 0) {
              return {
                x: middlewareArgs.x + overflow.left,
              };
            }

            // overflows right
            if (overflow.right > 0) {
              return {
                x: middlewareArgs.x - overflow.right,
              };
            }

            return {};
          },
        },
      ].filter(Boolean),
    });

    return {
      left,
      top,
    };
  }

  private canShowMenu(view: EditorView): Boolean {
    const { state } = view;
    const { selection } = state;
    const { empty } = selection;

    if (selection instanceof NodeSelection) {
      if (selection.node.type.name === 'image') {
        return false;
      }
    }

    const hasFocus = this.view.hasFocus();

    if (!hasFocus || empty || this.dragging) {
      this.hide();
      return false;
    }

    return true;
  }

  private update(view: EditorView): void {
    const canShowMenu = this.canShowMenu(view);

    if (!canShowMenu) {
      this.hide();
      return;
    }

    this.calculateBubblePosition(this.view).then(({ top, left }) => {
      if (!this.canShowMenu) {
        this.hide();
        return;
      }

      this.posLeft = left;
      this.posTop = top;

      this.show();
    });
  }

  ngOnInit(): void {
    if (!this.editor) {
      throw new NgxEditorError('Required editor instance to initialize floating menu component');
    }

    this.updateSubscription = this.editor.update
      .subscribe((view) => {
        this.update(view);
      });

    this.resizeSubscription = fromEvent(window, 'resize').pipe(
      throttleTime(500, asyncScheduler, { leading: true, trailing: true }),
    ).subscribe(() => {
      this.useUpdate();
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
    this.resizeSubscription.unsubscribe();
  }
}
