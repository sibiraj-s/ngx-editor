import { Component, Input, OnDestroy, TemplateRef, ViewEncapsulation } from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { Subscription } from 'rxjs';

import { ToolbarItem } from '../../types';

import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MenuComponent implements OnDestroy {
  @Input() toolbar: any;
  @Input() editorView: EditorView;

  customMenuRef: TemplateRef<any> = null;
  customMenuRefSubscription: Subscription;

  simpleCommands = [
    'bold', 'italic',
    'underline', 'strike',
    'code', 'blockquote',
    'ordered_list', 'bullet_list',
    'align_left', 'align_center', 'align_right', 'align_justify'
  ];

  iconContainerClass = ['NgxEditor__MenuItem', 'NgxEditor__MenuItem--Icon'];
  dropdownContainerClass = ['NgxEditor__Dropdown'];
  seperatorClass = ['NgxEditor__Seperator'];

  constructor(private sharedService: SharedService) {
    this.customMenuRefSubscription = this.sharedService.customMenuRefChange.subscribe((ref) => {
      this.customMenuRef = ref;
    });
  }

  isDropDown(item: ToolbarItem): boolean {
    if (typeof item === 'object') {
      return true;
    }

    return false;
  }

  ngOnDestroy(): void {
    this.customMenuRefSubscription.unsubscribe();
  }
}
