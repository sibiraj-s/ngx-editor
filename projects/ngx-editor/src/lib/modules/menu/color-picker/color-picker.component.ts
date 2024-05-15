import {
  Component, ElementRef,
  HostListener, OnDestroy, Input, OnInit,
} from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { Observable, Subscription } from 'rxjs';

import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import { TextColor, TextBackgroundColor } from '../MenuCommands';
import { HTML } from '../../../trustedTypesUtil';

type Command = typeof TextColor | typeof TextBackgroundColor;

@Component({
  selector: 'ngx-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit, OnDestroy {
  @Input() presets: string[][];
  @Input() type: string;

  constructor(
    private el: ElementRef,
    private menuService: MenuService,
    private ngxeService: NgxEditorService,
  ) { }

  get title(): Observable<string> {
    return this.getLabel(this.type === 'text_color' ? 'text_color' : 'background_color');
  }

  get icon(): HTML {
    return this.ngxeService.getIcon(this.type === 'text_color' ? 'text_color' : 'color_fill');
  }

  private get command(): Command {
    return this.type === 'text_color' ? TextColor : TextBackgroundColor;
  }

  private updateSubscription: Subscription;
  private editorView: EditorView;
  showPopup = false;
  isActive = false;
  activeColors: string[] = [];
  canExecute = true;

  getContrastYIQ(hexcolor: string): string {
    const color = hexcolor.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  }

  @HostListener('document:mousedown', ['$event']) onDocumentClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
      this.hidePopup();
    }
  }

  private hidePopup(): void {
    this.showPopup = false;
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  onTogglePopupMouseClick(e: MouseEvent): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    this.togglePopup();
  }

  onTogglePopupKeydown(): void {
    this.togglePopup();
  }

  remove(): void {
    const { state, dispatch } = this.editorView;

    this.command.remove()(state, dispatch);
    this.hidePopup();
  }

  onRemoveMouseClick(e: MouseEvent): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    e.preventDefault();
    this.remove();
  }

  onRemoveKeydown(): void {
    this.remove();
  }

  trackByIndex(index: number): number {
    return index;
  }

  selectColor(color:string):void {
    const { state, dispatch } = this.editorView;

    if (this.type === 'text_color') {
      const attrs = { color };
      this.command.apply(attrs)(state, dispatch);
    } else {
      const attrs = { backgroundColor: color };
      this.command.apply(attrs)(state, dispatch);
    }

    if (!this.editorView.hasFocus()) {
      this.editorView.focus();
    }

    this.hidePopup();
  }

  onColorSelectMouseClick(e: MouseEvent, color: string): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    this.selectColor(color);
  }

  onColorSelectKeydown(color: string): void {
    this.selectColor(color);
  }

  private update = (view: EditorView) => {
    const { state } = view;
    this.canExecute = this.command.canExecute(state);
    this.isActive = this.command.isActive(state);
    this.activeColors = [];

    if (this.isActive) {
      this.activeColors = this.command.getActiveColors(state);
    }
  };

  getLabel(key: string): Observable<string> {
    return this.ngxeService.locals.get(key);
  }

  ngOnInit(): void {
    this.editorView = this.menuService.editor.view;

    this.updateSubscription = this.menuService.editor.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
