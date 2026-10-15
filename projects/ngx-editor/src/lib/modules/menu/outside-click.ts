import { ChangeDetectorRef, DestroyRef, ElementRef, Renderer2, inject } from '@angular/core';

export interface OutsideClickListener {
  toggle(listen: boolean): void;
}

// listens for clicks and focus moving outside of the host element only while a popup is open,
// so closed popups don't run document listeners on every click on the page.
// focus is tracked so popups also close when navigating the toolbar with the keyboard
export const outsideClick = (onOutsideClick: () => void): OutsideClickListener => {
  const el = inject<ElementRef<HTMLElement>>(ElementRef);
  const renderer = inject(Renderer2);
  const cdr = inject(ChangeDetectorRef);
  let unlisten: (() => void) | null = null;

  const stop = (): void => {
    unlisten?.();
    unlisten = null;
  };

  const onEvent = (e: Event): void => {
    // e.target is retargeted to the shadow host when used inside a shadow root
    if (!e.composedPath().includes(el.nativeElement)) {
      onOutsideClick();
      cdr.markForCheck();
    }
  };

  inject(DestroyRef).onDestroy(stop);

  return {
    toggle(listen: boolean): void {
      if (!listen) {
        stop();
        return;
      }

      if (unlisten) {
        return;
      }

      // focus moving within a shadow root does not reach the document, so the root node is listened too
      const root = el.nativeElement.getRootNode();
      const focusTargets = root instanceof ShadowRoot ? ['document', root] : ['document'];

      const unlisteners = [
        renderer.listen('document', 'mousedown', onEvent),
        ...focusTargets.map((target) => renderer.listen(target, 'focusin', onEvent)),
      ];

      unlisten = (): void => {
        unlisteners.forEach((fn) => fn());
      };
    },
  };
};
