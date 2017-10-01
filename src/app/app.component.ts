import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ngx-editor';

  editorConfig = {
    spellcheck: false,
    placeholder: 'Enter text here...',
    translate: 'no'
  };

  htmlContent = '<span>WYSIWYG Editor for Angular Applications.</span>';

}
