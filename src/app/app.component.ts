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

  importCode = `
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [ NgxEditorModule ]
})`;

}
