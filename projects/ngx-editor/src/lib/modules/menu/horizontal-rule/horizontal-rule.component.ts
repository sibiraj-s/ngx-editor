import {
  OnInit,
  OnDestroy,
  HostBinding,
  Component,
  HostListener
} from '@angular/core';
import {
  EditorView
} from 'prosemirror-view';
import {
  Subscription
} from 'rxjs';
import {
  NgxEditorService
} from '../../../editor.service';
import Icon from '../../../icons';
import {
  MenuService
} from '../menu.service';
import {
  HorizontalRule} from '../MenuCommands';
@Component({
  selector: 'ngx-horizontal-rule',
  templateUrl: './horizontal-rule.component.html',
  styleUrls: ['./horizontal-rule.component.scss']
})
export class HorizontalRuleComponent implements OnInit, OnDestroy {

  html: string;
  private editorView: EditorView;
  private pluginUpdateSubscription: Subscription;

  constructor(
    private ngxeService: NgxEditorService,
    private menuService: MenuService
  ) {
  }

  @HostBinding('class.NgxEditor__MenuItem--Active') isActive = false;
    
  @HostListener('document:mousedown', ['$event']) onDocumentClick(e: MouseEvent): void {
      const target = e.target as any;
    if (target.nodeName == 'HR') {
      this.isActive = true;
      target.classList.add('NgxEditor__HorizontalRule--Selected');
    } else {
      this.isActive = false;

      // Remove selected class to all hr tags
      var editor = document.getElementsByClassName('NgxEditor')[0];
      var rules = editor.getElementsByTagName('hr');
      for (let index = 0; index < rules.length; index++) {
        const element = rules[index];
        element.classList.remove('NgxEditor__HorizontalRule--Selected');
      }
    }
  }

  toggle(e: MouseEvent): void {
    e.preventDefault();
    const {
      dispatch,
      state
    } = this.editorView;

    HorizontalRule.insert()(state, dispatch);
    this.editorView.focus();
  }

  update = (view: EditorView) => {
    // I think there is no update to do...
  }

  getTitle(): string {
    return this.ngxeService.locals.get('horizontal_rule');
  }

  ngOnInit(): void {
    this.html = Icon.get('horizontal_rule');
    this.editorView = this.menuService.editor.view;

    this.pluginUpdateSubscription = this.menuService.editor.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  ngOnDestroy(): void {
    this.pluginUpdateSubscription.unsubscribe();
  }
}
