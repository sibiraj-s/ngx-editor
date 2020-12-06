import { Component, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { EditorView } from 'prosemirror-view';

import { ToolbarItem } from '../../types';

import { NgxEditorService } from '../../ngx-editor.service';

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MenuComponent implements OnInit {
  @Input() toolbar: any;
  @Input() editorView: EditorView;

  customMenuRef: TemplateRef<any> = null;

  simpleCommands = [
    'bold', 'italic',
    'code', 'blockquote',
    'ordered_list', 'bullet_list',
    'align_left', 'align_center', 'align_right', 'align_justify'
  ];

  iconContainerClass = ['NgxEditor__MenuItem', 'NgxEditor__MenuItem--Icon'];
  dropdownContainerClass = ['NgxEditor__Dropdown'];
  seperatorClass = ['NgxEditor__Seperator'];

  constructor(private ngxeService: NgxEditorService) {
    this.ngxeService.customMenuRefChange.subscribe((ref) => {
      this.customMenuRef = ref;
    });
  }

  isDropDown(item: ToolbarItem): boolean {
    if (typeof item === 'object') {
      return true;
    }

    return false;
  }

  ngOnInit(): void {
  }
}
