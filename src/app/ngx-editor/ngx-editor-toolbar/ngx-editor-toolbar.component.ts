import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
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
  /** holds values of the insert video form */
  videoForm: FormGroup;
  /** set to false when image is being uploaded */
  uploadComplete = true;
  /** upload percentage */
  updloadPercentage = 0;
  /** set to true when the image is being uploaded */
  isUploading = false;
  /** which tab to active for color insetion */
  selectedColorTab = 'textColor';
  /** font family name */
  fontName = '';
  /** font size */
  fontSize = '';
  /** hex color code */
  hexColor = '';
  /** show/hide image uploader */
  isImageUploader = false;
  /** font color list */
  colors = [
    ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'],
    ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'],
    ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'],
    ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'],
    ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'],
    ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'],
    ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'],
    ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
  ];
  /** font size list */
  sizes = [
    '10px', '12px', '14px', '16px', '18px', '20px', '24px', '36px', '40px'
  ];
  /**
   * Editor configuration
   */
  @Input() config: any;
  @ViewChild('urlPopover') urlPopover;
  @ViewChild('imagePopover') imagePopover;
  @ViewChild('videoPopover') videoPopover;
  @ViewChild('fontSizePopover') fontSizePopover;
  @ViewChild('colorPopover') colorPopover;
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
  buildImageForm(): void {

    this.imageForm = this._formBuilder.group({
      imageUrl: ['', [Validators.required]]
    });

    return;
  }

  /**
   * create insert image form
   */
  buildVideoForm(): void {

    this.videoForm = this._formBuilder.group({
      videoUrl: ['', [Validators.required]],
      height: [''],
      width: ['']
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
    this.buildImageForm();
    /** close inset URL pop up */
    this.imagePopover.hide();

    return;
  }

  /** insert image in the editor */
  insertVideo(): void {
    try {
      this._commandExecutorService.insertVideo(this.videoForm.value);
    } catch (error) {
      this._messageService.sendMessage(error.message);
    }

    /** reset form to default */
    this.buildVideoForm();
    /** close inset URL pop up */
    this.videoPopover.hide();

    return;
  }

  /** inser text/background color */
  insertColor(color: string, where: string): void {

    try {
      this._commandExecutorService.insertColor(color, where);
    } catch (error) {
      this._messageService.sendMessage(error.message);
    }

    this.colorPopover.hide();
    return;
  }

  /** set font size */
  setFontSize(fontSize: string): void {

    try {
      this._commandExecutorService.setFontSize(fontSize);
    } catch (error) {
      this._messageService.sendMessage(error.message);
    }

    this.fontSizePopover.hide();
    return;
  }

  /** set font Name/family */
  setFontName(fontName: string): void {

    try {
      this._commandExecutorService.setFontName(fontName);
    } catch (error) {
      this._messageService.sendMessage(error.message);
    }

    this.fontSizePopover.hide();
    return;
  }

  /**
   * allow only numbers
   *
   * @param event keypress event
   */
  onlyNumbers(event: KeyboardEvent): boolean {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  /**
   * add style
   * @param i index of first *ngFor
   * @param j index of second *ngFor
   */
  getColor(i, j): any {
    const style = {
      'color': this.colors[i][j],
      'cursor': 'pointer'
    };
    return style;
  }

  /**
   * add style
   * @param size font size
   */
  getSize(size): any {
    const style = {
      'font-size': size,
      'cursor': 'pointer'
    };
    return style;
  }

  ngOnInit() {
    this.buildUrlForm();
    this.buildImageForm();
    this.buildVideoForm();
  }

}
