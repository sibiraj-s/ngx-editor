import { EditorView } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Mark } from 'prosemirror-model';

import {
  calculateBubblePos, isLinkActive, getSelectionMarks,
  removeLink
} from 'ngx-editor/helpers';

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
    link.target = item.attrs.target;
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
    const { state } = view;
    const { schema } = state;

    if (!schema.marks.link) {
      return;
    }

    // const hasFocus = view.hasFocus();
    const isActive = isLinkActive(state);
    const linkMarks: Mark[] = getSelectionMarks(state).filter(mark => mark.type === schema.marks.link);

    // hide for selection and show only for clicks
    if (!isActive) {
      this.hideBubble();
      return;
    }

    const [linkItem] = linkMarks;

    this.clearBubbleContent();

    const removeCB = (e: MouseEvent) => {
      e.preventDefault();

      removeLink(view);
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
