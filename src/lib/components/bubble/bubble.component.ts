import {
  Component, ElementRef, OnDestroy,
  OnInit, Renderer2
} from '@angular/core';
import { NodeSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Mark } from 'prosemirror-model';
import { Subscription } from 'rxjs';

import { calculateBubblePos, getSelectionMarks, isLinkActive } from 'ngx-editor/helpers';
import { removeLink } from 'ngx-editor/commands';

import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'ngx-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent implements OnInit, OnDestroy {
  private view: EditorView;
  activeLinkItem: Mark;
  private pluginUpdateSubscription: Subscription;

  constructor(
    private sharedService: SharedService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.pluginUpdateSubscription = this.sharedService.plugin.update.subscribe((view: EditorView) => {
      this.view = view;
      this.update(view);
    });
  }

  private setDomPosition(view: EditorView): void {
    // Otherwise, reposition it and update its content
    this.showBubble();

    const { bottom, left } = calculateBubblePos(view, this.el.nativeElement);

    this.renderer.setStyle(this.el.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(this.el.nativeElement, 'bottom', `${bottom}px`);
  }

  private showBubble(): void {
    this.renderer.setStyle(this.el.nativeElement, 'display', '');
  }

  private hideBubble(): void {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }

  removeLink(): void {
    const { state, dispatch } = this.view;
    removeLink()(state, dispatch);
    this.view.focus();
  }

  private update(view: EditorView): void {
    const { state } = view;
    const { schema, selection } = state;

    if (!schema.marks.link) {
      return;
    }

    if (selection instanceof NodeSelection) {
      if (selection.node.type.name === 'image') {
        return;
      }
    }

    const hasFocus = view.hasFocus();
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
    this.setDomPosition(view);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.pluginUpdateSubscription.unsubscribe();
  }
}
