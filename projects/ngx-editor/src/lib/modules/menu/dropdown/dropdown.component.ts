import {
  Component, ElementRef, HostListener, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, inject,
  input
} from '@angular/core';
import { EditorView } from 'prosemirror-view';
import type { Command } from 'prosemirror-state';
import { Observable, Subscription } from 'rxjs';

import { AsyncPipe, CommonModule } from '@angular/common';
import { NgxEditorService } from '../../../editor.service';
import { TBHeadingItems, TBTableItems } from '../../../types';
import { MenuService } from '../menu.service';
import { PopupPositionDirective } from '../popup-position.directive';
import { ToggleCommands } from '../MenuCommands';
import {
  addColumnAfter, addColumnBefore, deleteColumn, addRowAfter, addRowBefore, deleteRow,
  mergeCells, splitCell, setCellAttr, toggleHeaderRow, toggleHeaderColumn, toggleHeaderCell, deleteTable
} from 'prosemirror-tables';

@Component({
  selector: 'ngx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [AsyncPipe, CommonModule, PopupPositionDirective],
})
export class DropdownComponent implements OnInit, OnDestroy {
  private ngxeService = inject(NgxEditorService);
  private menuService = inject(MenuService);
  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  private editorView: EditorView;
  private updateSubscription: Subscription;

  readonly group = input<string>(undefined);
  readonly items = input<(TBHeadingItems | TBTableItems)[]>([]);

  isDropdownOpen = false;

  disabledItems: (TBHeadingItems | TBTableItems)[] = [];
  activeItem: TBHeadingItems | TBTableItems | null;

  get isSelected(): boolean {
    return Boolean(this.activeItem || this.isDropdownOpen);
  }

  get isDropdownDisabled(): boolean {
    return this.disabledItems.length === this.items().length;
  }

  @HostListener('document:mousedown', ['$event']) onDocumentClick(e: MouseEvent): void {
    // e.target is retargeted to the shadow host when used inside a shadow root
    if (!e.composedPath().includes(this.el.nativeElement) && this.isDropdownOpen) {
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

  selectItem(item: TBHeadingItems | TBTableItems): void {
    if (this.group() === 'table') {
      const tableCommands: Record<TBTableItems, Command> = {
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
      command(state, dispatch);
    } else {
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

    this.items().forEach((item: TBHeadingItems | TBTableItems) => {
      let isActive = false;
      let canExecute = false;

      if(this.group() === 'table'){
          const tableCommands: Record<TBTableItems, Command> = {
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
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
