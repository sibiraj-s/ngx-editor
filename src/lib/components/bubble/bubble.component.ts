import {
  Component, ElementRef, Input, OnDestroy,
  OnInit, Renderer2
} from '@angular/core';
import { NodeSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Mark } from 'prosemirror-model';
import { Subscription } from 'rxjs';

import { calculateBubblePos, getSelectionMarks, isLinkActive } from 'ngx-editor/helpers';
import { removeLink } from 'ngx-editor/commands';

import Editor from '../../Editor';

@Component({
  selector: 'ngx-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent implements OnInit, OnDestroy {
  @Input() editor: Editor;

  private view: EditorView;
  private updateSubscription: Subscription;
  activeLinkItem: Mark;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  private setDomPosition(): void {
    // Otherwise, reposition it and update its content
    this.showBubble();

    const { bottom, left } = calculateBubblePos(this.view, this.el.nativeElement);

    this.renderer.setStyle(this.el.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(this.el.nativeElement, 'bottom', `${bottom}px`);
  }

  private showBubble(): void {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
  }

  private hideBubble(): void {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }

  removeLink(): void {
    const { state, dispatch } = this.view;
    removeLink()(state, dispatch);
    this.view.focus();
  }

  private update(): void {
    const { state } = this.view;
    const { schema, selection } = state;

    if (!schema.marks.link) {
      return;
    }

    if (selection instanceof NodeSelection) {
      if (selection.node.type.name === 'image') {
        return;
      }
    }

    const hasFocus = this.view.hasFocus();
    const isActive = isLinkActive(state);
    const linkMarks: Mark[] = getSelectionMarks(state).filter(mark => mark.type === schema.marks.link);

    // hide for selection and show only for clicks
    if (!hasFocus || !isActive) {
      this.hideBubble();
      return;
    }

    const [linkItem] = linkMarks;
    this.activeLinkItem = linkItem;

    // update dom position
    this.setDomPosition();
  }

  ngOnInit(): void {
    this.view = this.editor.view;

    this.updateSubscription = this.editor.update.subscribe(() => {
      this.update();
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
