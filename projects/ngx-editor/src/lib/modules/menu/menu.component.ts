import { Component, Input, OnInit, TemplateRef } from '@angular/core';

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
  TBHeadingItems,
} from '../../types';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ImageComponent } from './image/image.component';
import { InsertCommandComponent } from './insert-command/insert-command.component';
import { LinkComponent } from './link/link.component';
import { MenuService } from './menu.service';
import { ToggleCommandComponent } from './toggle-command/toggle-command.component';
import { TableComponent } from './table/table.component';
import { EditorState } from 'prosemirror-state';

export const DEFAULT_TOOLBAR: Toolbar = [
  ['bold', 'italic'],
  ['code', 'blockquote'],
  ['underline', 'strike'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
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
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
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
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
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
  @Input() toolbar: Toolbar = TOOLBAR_MINIMAL;
  @Input() colorPresets: string[] = DEFAULT_COLOR_PRESETS;
  @Input() disabled = false;
  @Input() editor: Editor;
  @Input() customMenuRef: TemplateRef<unknown> | null = null;
  @Input() dropdownPlacement: 'top' | 'bottom' = 'bottom';

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

  constructor(private menuService: MenuService) {}

  get presets(): string[][] {
    const col = 8;
    const colors: string[][] = [];

    this.colorPresets.forEach((color, index) => {
      const row = Math.floor(index / col);

      if (!colors[row]) {
        colors.push([]);
      }

      colors[row].push(color);
    });

    return colors;
  }

  trackByIndex(index: number): number {
    return index;
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

  ngOnInit(): void {
    if (!this.editor) {
      throw new NgxEditorError('Required editor instance to initialize menu component');
    }

    this.menuService.editor = this.editor;
  }
}
