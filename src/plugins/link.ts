import { EditorView } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Mark } from 'prosemirror-model';

import { calculateBubblePos } from 'ngx-editor/helpers';
import { isMarkActive, getSelectionMarks } from 'ngx-editor/helpers';

class FloatingOptionsView {
  bubbleEL: HTMLElement = document.createElement('div');

  constructor(view: EditorView) {
    this.render(view);
    this.update(view);
  }

  render(view: EditorView): void {
    this.bubbleEL.className = 'NgxEditor__FloatingBubble';
    view.dom.parentNode?.appendChild(this.bubbleEL);
  }

  setDomPosition(view: EditorView): void {
    // Otherwise, reposition it and update its content
    this.bubbleEL.style.display = '';

    const { bottom, left } = calculateBubblePos(view, this.bubbleEL);
    this.bubbleEL.style.left = left + 'px';
    this.bubbleEL.style.bottom = bottom + 'px';
  }

  createLinkNode(item: Mark, removeCB: (e: MouseEvent) => void): DocumentFragment {
    const el = document.createDocumentFragment();

    const link = document.createElement('a');
    link.href = item.attrs.href;
    link.target = '_blank';
    link.innerText = item.attrs.href;
    link.title = item.attrs.href;

    const commands = document.createElement('div');
    commands.classList.add('commands');

    const editOpt = document.createElement('button');
    editOpt.type = 'button';
    editOpt.classList.add('command');
    editOpt.textContent = 'Edit';

    const removeOpt = document.createElement('button');
    removeOpt.type = 'button';
    removeOpt.classList.add('command');
    removeOpt.textContent = 'Remove';

    removeOpt.onclick = removeCB;

    // commands.appendChild(editOpt);
    commands.appendChild(removeOpt);

    el.appendChild(link);
    el.appendChild(commands);

    return el;
  }

  clearBubbleContent(): void {
    this.bubbleEL.textContent = '';
  }

  hideBubble(): void {
    this.bubbleEL.style.display = 'none';
  }

  update(view: EditorView): void {
    const { state, dispatch } = view;
    const { selection, schema, doc, tr } = state;

    if (!schema.marks.link) {
      return;
    }

    // const hasFocus = view.hasFocus();
    const isActive = isMarkActive(state, schema.marks.link);
    const linkMarks: Mark[] = getSelectionMarks(state).filter(mark => mark.type === schema.marks.link);

    const { $head: { pos }, from, to, anchor, head } = selection;
    const isForwardSelection = anchor === from;

    // hide the popup if selection has non mark text at the begining or at the end
    const selectionHasOnlyMarks = isForwardSelection ?
      (
        state.doc.rangeHasMark(anchor, anchor + 1, schema.marks.link) &&
        state.doc.rangeHasMark(head - 1, head, schema.marks.link)
      ) : (
        state.doc.rangeHasMark(anchor - 1, anchor, schema.marks.link) &&
        state.doc.rangeHasMark(head, head + 1, schema.marks.link)
      );

    // hide for selection and show only for clicks
    if (!isActive || linkMarks.length !== 1 || !selectionHasOnlyMarks) {
      this.hideBubble();
      return;
    }

    const [linkItem] = linkMarks;

    this.clearBubbleContent();

    const removeCB = (e: MouseEvent) => {
      e.preventDefault();

      // if the cursor is on the link without any selection
      if (from === to) {
        const $pos = doc.resolve(pos);
        const linkStart = pos - $pos.textOffset;
        const linkEnd = linkStart + $pos.parent.child($pos.index()).nodeSize;

        tr.removeMark(linkStart, linkEnd);
      } else {
        tr.removeMark(from, to);
      }

      dispatch(tr);
      view.focus();
    };

    const el = this.createLinkNode(linkItem, removeCB);
    this.bubbleEL.appendChild(el);

    // update dom position
    this.setDomPosition(view);
  }

  destroy(): void {
    this.bubbleEL.remove();
  }
}

function linkPlugin(): Plugin {
  return new Plugin({
    key: new PluginKey('link'),
    view(editorView: EditorView): FloatingOptionsView {
      return new FloatingOptionsView(editorView);
    }
  });
}

export default linkPlugin;
