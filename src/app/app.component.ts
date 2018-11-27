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
    placeholder: "Your placeholder text is here",
    translate: "no",
    imageEndPoint: "https://localhost:44364/api/Electrocardiography/UploadFile"
  };

  editorConfig2 = {
    editable: true,
    spellcheck: false,
    height: "10rem",
    minHeight: "5rem",
    placeholder: "Your placeholder text is here",
    translate: "no",
    imageEndPoint: "https://localhost:44364/api/Electrocardiography/UploadFile"
  };

  htmlContent = ``;
  inlineHtmlContent = ``;

  inlineText1 = `inline text 1 is here `;
  inlineText2 = `inline text 2 is here `;

  inlineHtmlContent1 = ``;
  inlineHtmlContent2 = ``;

  public myChange(val) {
    setTimeout(function() {
      Prism.highlightAll();
    }, 1000);
  }

  public inlineMyChange(val) {
    setTimeout(function() {
      Prism.highlightAll();
    }, 1000);
  }
}
