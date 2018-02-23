import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { PopoverConfig } from 'ngx-bootstrap';
import { CommandExecutorService } from '../common/services/command-executor.service';
import { MessageService } from '../common/services/message.service';
import * as Utils from '../common/utils/ngx-editor.utils';

@Component({
  selector: 'app-ngx-editor-toolbar',
  templateUrl: './ngx-editor-toolbar.component.html',
  styleUrls: ['./ngx-editor-toolbar.component.scss'],
  providers: [PopoverConfig]
})

export class NgxEditorToolbarComponent implements OnInit {

  /** holds values of the insert link form */
  urlForm: FormGroup;
  /** holds values of the insert image form */
  imageForm: FormGroup;
  /** set to false when image is being uploaded */
  uploadComplete = true;
  /** upload percentage */
  updloadPercentage = 0;
  /** set to true when the image is being uploaded */
  isUploading = false;
  /** which tab to active for color insetion */
  selectedColorTab = 'textColor';

  /**
   * Editor configuration
   */
  @Input() config: any;
  @ViewChild('urlPopover') urlPopover;
  @ViewChild('imagePopover') imagePopover;
  /**
   * Emits an event when a toolbar button is clicked
   */
  @Output() execute: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _popOverConfig: PopoverConfig,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _commandExecutorService: CommandExecutorService) {
    this._popOverConfig.outsideClick = true;
    this._popOverConfig.placement = 'bottom';
    this._popOverConfig.container = 'body';
  }

  /**
   * enable or diable toolbar based on configuration
   *
   * @param value name of the toolbar buttons
   */
  canEnableToolbarOptions(value): boolean {
    return Utils.canEnableToolbarOptions(value, this.config['toolbar']);
  }

  /**
   * triggers command from the toolbar to be executed and emits an event
   *
   * @param command name of the command to be executed
   */
  triggerCommand(command: string): void {
    this.execute.emit(command);
  }

  /**
   * create URL insert form
   */
  buildUrlForm(): void {

    this.urlForm = this._formBuilder.group({
      urlLink: ['', [Validators.required]],
      urlText: ['', [Validators.required]],
      urlNewTab: [true]
    });

    return;
  }

  /**
   * inserts link in the editor
   */
  insertLink(): void {

    try {
      this._commandExecutorService.createLink(this.urlForm.value);
    } catch (error) {
      this._messageService.sendMessage(error.message);
    }

    /** reset form to default */
    this.buildUrlForm();
    /** close inset URL pop up */
    this.urlPopover.hide();

    return;
  }

  /**
   * create insert image form
   */
  buildInsertImageForm(): void {

    this.imageForm = this._formBuilder.group({
      imageUrl: ['', [Validators.required]]
    });

    return;
  }

  /**
   * Executed when file is selected
   *
   * @param e onChange event
   */
  onFileChange(e): void {

    this.uploadComplete = false;
    this.isUploading = true;

    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      try {
        this._commandExecutorService.uploadImage(file, this.config.imageEndPoint).subscribe(event => {

          if (event.type) {
            this.updloadPercentage = Math.round(100 * event.loaded / event.total);
          }

          if (event instanceof HttpResponse) {
            try {
              this._commandExecutorService.insertImage(event.body.url);
            } catch (error) {
              this._messageService.sendMessage(error.message);
            }
            this.uploadComplete = true;
            this.isUploading = false;
          }
        });
      } catch (error) {
        this._messageService.sendMessage(error.message);
        this.uploadComplete = true;
        this.isUploading = false;
      }

    }

    return;
  }

  /** insert image in the editor */
  insertImage(): void {
    try {
      this._commandExecutorService.insertImage(this.imageForm.value.imageUrl);
    } catch (error) {
      this._messageService.sendMessage(error.message);
    }

    /** reset form to default */
    this.buildInsertImageForm();
    /** close inset URL pop up */
    this.imagePopover.hide();
  }

  /** inser text/background color */
  insertColor(color: string, where: string): void {

    try {
      this._commandExecutorService.insertColor(color, where);
    } catch (error) {
      this._messageService.sendMessage(error.message);
    }

    return;
  }

  ngOnInit() {
    this.buildUrlForm();
    this.buildInsertImageForm();
  }

}
