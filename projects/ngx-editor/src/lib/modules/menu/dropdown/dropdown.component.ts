import {
  Component, ElementRef, HostListener, Input, OnDestroy, OnInit,
} from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { EditorState, Transaction } from 'prosemirror-state';
import { Observable, Subscription } from 'rxjs';

import { AsyncPipe, CommonModule } from '@angular/common';
import { NgxEditorService } from '../../../editor.service';
import { TBHeadingItems, TBTableItems } from '../../../types';
import { MenuService } from '../menu.service';
import { ToggleCommands } from '../MenuCommands';
import {
  addColumnAfter, addColumnBefore, deleteColumn, addRowAfter, addRowBefore, deleteRow,
  mergeCells, splitCell, setCellAttr, toggleHeaderRow, toggleHeaderColumn, toggleHeaderCell, deleteTable
} from 'prosemirror-tables';

@Component({
  selector: 'ngx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [AsyncPipe, CommonModule],
})
export class DropdownComponent implements OnInit, OnDestroy {
  private editorView: EditorView;
  private updateSubscription: Subscription;

  @Input() group: string;
  @Input() items: (TBHeadingItems | TBTableItems)[] = [];

  isDropdownOpen = false;

  disabledItems: (TBHeadingItems | TBTableItems)[] = [];
  activeItem: TBHeadingItems | TBTableItems | null;

  constructor(
    private ngxeService: NgxEditorService,
    private menuService: MenuService,
    private el: ElementRef,
  ) {}

  get isSelected(): boolean {
    return Boolean(this.activeItem || this.isDropdownOpen);
  }

  get isDropdownDisabled(): boolean {
    return this.disabledItems.length === this.items.length;
  }

  @HostListener('document:mousedown', ['$event.target']) onDocumentClick(target: Node): void {
    if (!this.el.nativeElement.contains(target) && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  getName(key: string): Observable<string> {
    return this.ngxeService.locals.get(key);
  }

  getIsDropdownActive(item: TBHeadingItems | TBTableItems): boolean {
    return this.activeItem === item;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onToggleDropdownMouseClick(e: MouseEvent): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    this.toggleDropdown();
  }

  onToggleDropdownKeydown(): void {
    this.toggleDropdown();
  }

  trackByIndex(index: number): number {
    return index;
  }

  selectItem(item: TBHeadingItems | TBTableItems): void {
    if (this.group === 'table') {
        const tableCommands: { [key in TBTableItems]: (state: EditorState, dispatch?: (tr: Transaction) => void) => boolean } = {
        addColumnBefore,
        addColumnAfter,
        deleteColumn,
        addRowBefore,
        addRowAfter,
        deleteRow,
        deleteTable,
        mergeCells,
        splitCell,
        toggleHeaderRow,
        toggleHeaderColumn,
        toggleHeaderCell,
        setCellBackgroundGreen: setCellAttr('background', '#dfd'),
        clearCellBackground: setCellAttr('background', null),
      };
       const command = tableCommands[item as TBTableItems];
       const { state, dispatch } = this.editorView;
       command(state, dispatch)
    }else{
        const command = ToggleCommands[item as TBHeadingItems];
        const { state, dispatch } = this.editorView;
        command.toggle()(state, dispatch);
    }


    this.isDropdownOpen = false;
  }

  onDropdownItemMouseClick(e: MouseEvent, item: TBHeadingItems | TBTableItems): void {
    e.preventDefault();

    // consider only left click
    if (e.button !== 0) {
      return;
    }

    this.selectItem(item);
  }

  onDropdownItemKeydown(event: Event, item: TBHeadingItems | TBTableItems): void {
    const e = event as KeyboardEvent;
    e.preventDefault();
    this.selectItem(item);
  }

  private update = (view: EditorView) => {
    const { state } = view;
    this.disabledItems = [];
    const activeItems: (TBHeadingItems | TBTableItems)[] = [];

    this.items.forEach((item: TBHeadingItems | TBTableItems) => {
      let isActive = false;
      let canExecute = false;

      if(this.group === 'table'){
          const tableCommands: { [key in TBTableItems]: (state: EditorState, dispatch?: (tr: Transaction) => void) => boolean } = {
          addColumnBefore,
          addColumnAfter,
          deleteColumn,
          addRowBefore,
          addRowAfter,
          deleteRow,
          deleteTable,
          mergeCells,
          splitCell,
          toggleHeaderRow,
          toggleHeaderColumn,
          toggleHeaderCell,
          setCellBackgroundGreen: setCellAttr('background', '#dfd'),
          clearCellBackground: setCellAttr('background', null),
        };
        const command = tableCommands[item as TBTableItems];
        if (command) {
          // Table commands lack 'isActive', so defaulting to false.
          isActive = false; 
          canExecute = command(state);
        }
      }else{
        const command = ToggleCommands[item as TBHeadingItems];
        if(command){
          isActive = command.isActive(state);
          canExecute = command.canExecute(state);
        }
      }

      if (isActive) {
        activeItems.push(item);
      }

      if (!canExecute) {
        this.disabledItems.push(item);
      }
    });
    if (activeItems.length === 1) {
      [this.activeItem] = activeItems;
    } else {
      this.activeItem = null;
    }
  };

  ngOnInit(): void {
    this.editorView = this.menuService.editor.view;
    this.update(this.editorView);
    this.updateSubscription = this.menuService.editor.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
