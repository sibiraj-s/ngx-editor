import { EditorView } from 'prosemirror-view';

interface TooltipPosition {
  bottom: number;
  left: number;
}

export const calculateBubblePos = (view: EditorView, toolTipEl: HTMLElement): TooltipPosition => {
  const { state: { selection } } = view;
  const { from, to } = selection;

  // These are in screen coordinates
  const start = view.coordsAtPos(from);
  const end = view.coordsAtPos(to);

  // The box in which the tooltip is positioned, to use as base
  const parent = toolTipEl.offsetParent;
  const box = parent.getBoundingClientRect();

  // Find a center-ish x position from the selection endpoints (when
  // crossing lines, end may be more to the left)
  const left = Math.max((start.left + end.left) / 2, start.left + 3);

  return {
    left: left - box.left,
    bottom: box.bottom - start.top
  };
};
