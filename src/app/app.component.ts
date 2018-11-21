import { Component, ViewEncapsulation } from '@angular/core';

declare var Prism: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = "ngx-editor";

  editorConfig = {
    editable: true,
    spellcheck: false,
    height: "10rem",
    minHeight: "5rem",
    placeholder: "Type something. Test the Editor... ヽ(^。^)丿",
    translate: "no",
    imageEndPoint: "https://localhost:44364/api/Electrocardiography/UploadFile"
  };

  htmlContent = ``;

  public myChange(val) {
    setTimeout(function() {
      Prism.highlightAll();
    }, 1000);
  }
}
