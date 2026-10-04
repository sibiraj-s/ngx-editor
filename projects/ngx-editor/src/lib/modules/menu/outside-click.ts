import { ChangeDetectorRef, DestroyRef, ElementRef, Renderer2, inject } from '@angular/core';

export interface OutsideClickListener {
  toggle(listen: boolean): void;
}

// listens for clicks outside of the host element only while a popup is open,
// so closed popups don't run a document listener on every click on the page
export const outsideClick = (onOutsideClick: () => void): OutsideClickListener => {
  const el = inject<ElementRef<HTMLElement>>(ElementRef);
  const renderer = inject(Renderer2);
  const cdr = inject(ChangeDetectorRef);
  let unlisten: (() => void) | null = null;

  const stop = (): void => {
    unlisten?.();
    unlisten = null;
  };

  inject(DestroyRef).onDestroy(stop);

  return {
    toggle(listen: boolean): void {
      if (!listen) {
        stop();
        return;
      }

      unlisten ??= renderer.listen('document', 'mousedown', (e: MouseEvent) => {
        // e.target is retargeted to the shadow host when used inside a shadow root
        if (!e.composedPath().includes(el.nativeElement)) {
          onOutsideClick();
          cdr.markForCheck();
        }
      });
    },
  };
};
