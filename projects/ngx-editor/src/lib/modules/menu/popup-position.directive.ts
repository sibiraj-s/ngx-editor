import { AfterViewInit, Directive, ElementRef, OnDestroy, booleanAttribute, inject, input } from '@angular/core';
import { autoUpdate, computePosition, flip, offset, shift, size } from '@floating-ui/dom';

// positions menu popups and dropdowns relative to their menu item,
// so that they flip or shift instead of being clipped by the container
@Directive({
  selector: '[ngxPopupPosition]',
})
export class PopupPositionDirective implements AfterViewInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private cleanup: (() => void) | null = null;

  // make the popup at least as wide as the menu item
  readonly ngxPopupMatchWidth = input(false, { transform: booleanAttribute });

  // align the popup to the center or the start of the menu item
  readonly ngxPopupAlign = input<'center' | 'start'>('center');

  ngAfterViewInit(): void {
    const floating = this.el.nativeElement;
    const reference = floating.parentElement;

    if (!reference) {
      return;
    }

    this.cleanup = autoUpdate(reference, floating, () => this.updatePosition(reference, floating));
  }

  private async updatePosition(reference: HTMLElement, floating: HTMLElement): Promise<void> {
    const reverse = Boolean(reference.closest('.NgxEditor__MenuBar--Reverse'));
    const side = reverse ? 'top' : 'bottom';

    const { x, y } = await computePosition(reference, floating, {
      strategy: 'fixed',
      placement: this.ngxPopupAlign() === 'start' ? `${side}-start` : side,
      middleware: [
        offset(2),
        flip(),
        shift({ padding: 5 }),
        // scroll the popup when it is taller than the available space
        size({
          padding: 5,
          apply({ availableHeight }) {
            Object.assign(floating.style, {
              maxHeight: `${Math.max(0, availableHeight)}px`,
              overflowY: 'auto',
            });
          },
        }),
      ],
    });

    Object.assign(floating.style, {
      position: 'fixed',
      top: `${y}px`,
      left: `${x}px`,
      bottom: 'auto',
    });

    if (this.ngxPopupMatchWidth()) {
      floating.style.minWidth = `${reference.offsetWidth}px`;
    }
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}
