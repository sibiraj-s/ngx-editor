import {
  Component, ElementRef, HostBinding,
  HostListener, OnDestroy, Input
} from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { Subscription } from 'rxjs';

import Icon from '../../../icons';
import { NgxEditorService } from '../../../editor.service';
import { SharedService } from '../../../services/shared/shared.service';
import { TextColor as TextColorCommand, TextBackgroundColor as TextBackgorundColorCommand } from '../MenuCommands';

type Command = typeof TextColorCommand | typeof TextBackgorundColorCommand;

@Component({
  selector: 'ngx-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnDestroy {

  constructor(
    private el: ElementRef,
    private sharedService: SharedService,
    private ngxeService: NgxEditorService
  ) {
    this.editorView = this.sharedService.view;

    this.pluginUpdateSubscription = this.sharedService.plugin.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  @HostBinding('class.NgxEditor__MenuItem--Active') get valid(): boolean {
    return this.isActive || this.showPopup;
  }

  @HostBinding('class.NgxEditor--Disabled') get disabled(): boolean {
    return !this.canExecute;
  }

  get colorMap(): string[][] {
    return [
      this.presets.slice(0, this.presets.length / 2),
      this.presets.slice(this.presets.length / 2, this.presets.length)
    ];
  }

  get title(): string {
    return this.getLabel(this.type === 'text_color' ? 'text_color' : 'background_color');
  }

  get icon(): string {
    return Icon.get(this.type === 'text_color' ? 'text_color' : 'color_fill');
  }

  private get command(): Command {
    return this.type === 'text_color' ? TextColorCommand : TextBackgorundColorCommand;
  }

  private pluginUpdateSubscription: Subscription;
  private presets = [
    '#b60205',
    '#d93f0b',
    '#fbca04',
    '#0e8a16',
    '#006b75',
    '#1d76db',
    '#0052cc',
    '#5319e7',
    '#e99695',
    '#f9d0c4',
    '#fef2c0',
    '#c2e0c6',
    '#bfdadc',
    '#c5def5',
    '#bfd4f2',
    '#d4c5f9'
  ];

  private editorView: EditorView;
  showPopup = false;
  isActive = false;
  activeColors = [];
  private canExecute = true;

  @Input() type: string;

  getContrastYIQ(hexcolor: string): string {
    hexcolor = hexcolor.replace('#', '');
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  }

  @HostListener('document:mousedown', ['$event']) onDocumentClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
      this.hidePopup();
    }
  }

  private hidePopup(): void {
    this.showPopup = false;
  }

  togglePopup(e: MouseEvent): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    this.showPopup = !this.showPopup;
  }

  remove(e: MouseEvent): void {
    e.preventDefault();
    const { state, dispatch } = this.editorView;

    this.command.remove(state, dispatch);
    this.hidePopup();
  }

  onColorSelect(e: MouseEvent, color: string): void {
    e.preventDefault();

    const { state, dispatch } = this.editorView;

    const attrs: { [key: string]: string } = {};

    if (this.type === 'text_color') {
      attrs.color = color;
    } else {
      attrs.backgroundColor = color;
    }

    this.command.execute(attrs)(state, dispatch);

    if (!this.editorView.hasFocus()) {
      this.editorView.focus();
    }

    this.hidePopup();
  }

  private update = (view: EditorView) => {
    const { state } = view;
    this.canExecute = this.command.execute(null)(state);
    this.isActive = this.command.isActive(state);
    this.activeColors = [];

    if (this.isActive) {
      this.activeColors = this.command.getActiveColors(state);
    }
  }

  getLabel(key: string): string {
    return this.ngxeService.locals.get(key);
  }

  ngOnDestroy(): void {
    this.pluginUpdateSubscription.unsubscribe();
  }
}
