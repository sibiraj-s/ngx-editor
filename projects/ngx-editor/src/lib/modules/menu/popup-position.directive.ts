import { AfterViewInit, Directive, ElementRef, OnDestroy, booleanAttribute, inject, input } from '@angular/core';
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

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

    const { x, y } = await computePosition(reference, floating, {
      strategy: 'fixed',
      placement: reverse ? 'top-start' : 'bottom-start',
      middleware: [offset(2), flip(), shift({ padding: 5 })],
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
