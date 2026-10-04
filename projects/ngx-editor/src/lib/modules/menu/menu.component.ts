import {
  Component, ElementRef, HostListener, OnInit, TemplateRef, ChangeDetectionStrategy, afterEveryRender, inject, input,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgxEditorError } from 'ngx-editor/utils';
import Editor from '../../Editor';
import {
  Toolbar,
  ToolbarDropdown,
  ToolbarItem,
  ToolbarLink,
  ToolbarLinkOptions,
  TBTableItems,
} from '../../types';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ImageComponent } from './image/image.component';
import { InsertCommandComponent } from './insert-command/insert-command.component';
import { LinkComponent } from './link/link.component';
import { MenuService } from './menu.service';
import { ToggleCommandComponent } from './toggle-command/toggle-command.component';
import { TableComponent } from './table/table.component';

export const DEFAULT_TOOLBAR: Toolbar = [
  ['bold', 'italic'],
  ['code', 'blockquote'],
  ['underline', 'strike'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['paragraph', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['link', 'image'],
  [
    'table',
    {
      table: [
        'addColumnBefore',
        'addColumnAfter',
        'deleteColumn',
        'addRowBefore',
        'addRowAfter',
        'deleteRow',
        'deleteTable',
        'mergeCells',
        'splitCell',
        'toggleHeaderRow',
        'toggleHeaderColumn',
        'toggleHeaderCell',
        'setCellBackgroundGreen',
        'clearCellBackground',
      ],
    },
  ],
  ['text_color', 'background_color'],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
  ['format_clear'],
];

export const TOOLBAR_MINIMAL: Toolbar = [
  ['bold', 'italic'],
  [{ heading: ['paragraph', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['link', 'image'],
  [
    'table',
    {
      table: [
        'addColumnBefore',
        'addColumnAfter',
        'deleteColumn',
        'addRowBefore',
        'addRowAfter',
        'deleteRow',
        'deleteTable',
        'mergeCells',
        'splitCell',
        'toggleHeaderRow',
        'toggleHeaderColumn',
        'toggleHeaderCell',
        'setCellBackgroundGreen',
        'clearCellBackground',
      ],
    },
  ],
  ['text_color', 'background_color'],
];

export const TOOLBAR_FULL: Toolbar = [
  ['bold', 'italic'],
  ['code', 'blockquote'],
  ['underline', 'strike'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['paragraph', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['link', 'image'],
  [
    'table',
    {
      table: [
        'addColumnBefore',
        'addColumnAfter',
        'deleteColumn',
        'addRowBefore',
        'addRowAfter',
        'deleteRow',
        'deleteTable',
        'mergeCells',
        'splitCell',
        'toggleHeaderRow',
        'toggleHeaderColumn',
        'toggleHeaderCell',
        'setCellBackgroundGreen',
        'clearCellBackground',
      ],
    },
  ],
  ['text_color', 'background_color'],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
  ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
  ['superscript', 'subscript'],
  ['undo', 'redo'],
];

const TOOLBAR_ITEM_SELECTOR = 'button, [role="button"]';

// buttons inside popups and dropdown menus are not part of the toolbar navigation
const POPUP_SELECTOR = '.NgxEditor__Popup, .NgxEditor__Dropdown--DropdownMenu';

const DEFAULT_COLOR_PRESETS = [
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
  '#d4c5f9',
];

@Component({
  selector: 'ngx-editor-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MenuService],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    ColorPickerComponent,
    DropdownComponent,
    ToggleCommandComponent,
    InsertCommandComponent,
    LinkComponent,
    ImageComponent,
    TableComponent,
  ],
})
export class NgxEditorMenuComponent implements OnInit {
  private menuService = inject(MenuService);
  private el = inject(ElementRef<HTMLElement>);

  // the toolbar item that is reachable with Tab (roving tabindex)
  private activeButton: HTMLElement | null = null;

  readonly toolbar = input<Toolbar>(TOOLBAR_MINIMAL);
  readonly colorPresets = input<string[]>(DEFAULT_COLOR_PRESETS);
  readonly disabled = input(false);
  readonly editor = input<Editor>(undefined);
  readonly customMenuRef = input<TemplateRef<unknown> | null>(null);
  readonly dropdownPlacement = input<'top' | 'bottom'>('bottom');

  toggleCommands: ToolbarItem[] = [
    'bold',
    'italic',
    'underline',
    'strike',
    'code',
    'blockquote',
    'ordered_list',
    'bullet_list',
    'align_left',
    'align_center',
    'align_right',
    'align_justify',
    'superscript',
    'subscript',
  ];

  insertCommands: ToolbarItem[] = ['horizontal_rule', 'format_clear', 'indent', 'outdent', 'undo', 'redo'];

  tableCommands: TBTableItems[] = [
    'addColumnBefore',
    'addColumnAfter',
    'deleteColumn',
    'addRowBefore',
    'addRowAfter',
    'deleteRow',
    'deleteTable',
    'mergeCells',
    'splitCell',
    'toggleHeaderRow',
    'toggleHeaderColumn',
    'toggleHeaderCell',
    'setCellBackgroundGreen',
    'clearCellBackground',
  ];
  iconContainerClass = ['NgxEditor__MenuItem', 'NgxEditor__MenuItem--IconContainer'];
  dropdownContainerClass = ['NgxEditor__Dropdown'];
  seperatorClass = ['NgxEditor__Seperator'];

  get presets(): string[][] {
    const col = 8;
    const colors: string[][] = [];

    this.colorPresets().forEach((color, index) => {
      const row = Math.floor(index / col);

      if (!colors[row]) {
        colors.push([]);
      }

      colors[row].push(color);
    });

    return colors;
  }

  isDropDown(item: ToolbarItem): boolean {
    const dropdown = item as ToolbarDropdown;
    if (dropdown?.heading || dropdown?.table) {
      return true;
    }
    return false;
  }

  getDropdownItems(item: ToolbarItem): ToolbarDropdown {
    return item as ToolbarDropdown;
  }

  isLinkItem(item: ToolbarItem): boolean {
    if (item === 'link') {
      return true;
    }

    // NOTE: it is not sufficient to check for a `link` property
    // as String.prototype.link is a valid (although deprecated) method
    return typeof item === 'object' && typeof (item as ToolbarLink)?.link === 'object';
  }

  isLinkWithOptions(item: ToolbarItem): boolean {
    // NOTE: it is not sufficient to check for a `link` property
    // as String.prototype.link is a valid (although deprecated) method
    return typeof item === 'object' && typeof (item as ToolbarLink)?.link === 'object';
  }

  getLinkOptions(item: ToolbarItem): Partial<ToolbarLinkOptions> {
    return (item as ToolbarLink)?.link;
  }

  constructor() {
    afterEveryRender(() => this.updateTabIndex());
  }

  private getButtons(): HTMLElement[] {
    const buttons: HTMLElement[] = Array.from(this.el.nativeElement.querySelectorAll(TOOLBAR_ITEM_SELECTOR));
    return buttons.filter((button) => !button.closest(POPUP_SELECTOR));
  }

  private isDisabled(button: HTMLElement): boolean {
    return (button as HTMLButtonElement).disabled
      || button.getAttribute('aria-disabled') === 'true'
      || button.classList.contains('NgxEditor--Disabled');
  }

  private getEnabledButtons(): HTMLElement[] {
    return this.getButtons().filter((button) => !this.isDisabled(button));
  }

  private updateTabIndex(): void {
    const buttons = this.getButtons();
    const enabled = this.getEnabledButtons();

    if (!enabled.includes(this.activeButton)) {
      [this.activeButton = null] = enabled;
    }

    buttons.forEach((button) => {
      button.tabIndex = button === this.activeButton ? 0 : -1;
    });
  }

  @HostListener('focusin', ['$event']) onFocusIn(e: FocusEvent): void {
    const target = e.target as HTMLElement;

    if (this.getButtons().includes(target)) {
      this.activeButton = target;
      this.updateTabIndex();
    }
  }

  @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent): void {
    const buttons = this.getButtons();
    const index = buttons.indexOf(e.target as HTMLElement);

    if (index === -1) {
      return;
    }

    // the focused item may have been disabled, so only the destination has to be enabled
    const enabled = this.getEnabledButtons();
    const before = enabled.filter((button) => buttons.indexOf(button) < index);
    const after = enabled.filter((button) => buttons.indexOf(button) > index);

    const next: Record<string, HTMLElement | undefined> = {
      ArrowRight: after[0] ?? enabled[0],
      ArrowLeft: before.at(-1) ?? enabled.at(-1),
      Home: enabled[0],
      End: enabled.at(-1),
    };

    if (!next[e.key]) {
      return;
    }

    e.preventDefault();
    next[e.key].focus();
  }


  ngOnInit(): void {
    const editor = this.editor();
    if (!editor) {
      throw new NgxEditorError('Required editor instance to initialize menu component');
    }

    this.menuService.editor = editor;
  }
}
