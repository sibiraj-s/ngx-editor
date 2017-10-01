import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ngx-editor';

  editorConfig = {
    spellCheck: false
  };

  htmlContent = '<span>WYSIWYG Editor for Angular Applications.</span>';

  importCode = `
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [ NgxEditorModule ]
})`;

}
