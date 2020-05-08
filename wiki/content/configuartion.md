# Configuration

The Configuration can be provided using `config` property

## Usage

```ts
import { menu, placeholder } from "ngx-editor";

NgxEditorModule.forRoot({
  plugins: [
    menu({
      // default options (Optional)
      toolbar: [
        ["bold", "italic", "code"], // inline icons
        ["ordered_list", "bullet_list"],
        [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }], // dropdown
      ],
      labels: {
        bold: "Bold",
        italics: "Italics",
        code: "Code",
        ordered_list: "Ordered List",
        bullet_list: "Bullet List",
        heading: "Heading",
      },
    }),
    placholder("Type something here..."),
  ],
});
```
