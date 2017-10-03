import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})

export class AppComponent implements OnInit {
  title = 'ngx-editor';
  latestRelease: any = {};

  editorConfig = {
    editable: true,
    spellcheck: false,
    placeholder: 'Enter text here...',
    translate: 'no'
  };

  htmlContent = '<span>WYSIWYG Editor for Angular Applications.</span>';

  constructor(private _appService: AppService) { }

  getLatestRelease() {
    this._appService.getLatestRelease().subscribe(
      data => this.latestRelease = data,
      error => { console.log(error); },
      () => {
        // console.log('latest release: ' + this.latestRelease['name']);
      });
  }

  ngOnInit() {
    this.getLatestRelease();
  }

}
