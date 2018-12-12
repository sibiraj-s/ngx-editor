# Configuration

The Configuration can be provided using `config` property

## Usage

```HTML
<app-ngx-editor [config]="editorConfig" [(ngModel)]="htmlContent"></app-ngx-editor>
```

### Default Configuration

The config property is a JSON object.

```JSON
{
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "0",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
        ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
        ["fontName", "fontSize", "color"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
        ["link", "unlink", "image", "video"]
    ],
    "toolbarTitle": {
      "bold": "Bold",
      "italic": "Italic",
      "underline": "Underline",
      "strikeThrough": "strikeThrough",
      "superscript": "Superscript",
      "subscript": "Subscript",
      "fontName": "Font Family",
      "fontSize": "Font Size",
      "color": "Color Picker",
      "justifyLeft": "Justify Left",
      "justifyCenter": "Justify Center",
      "justifyRight": "Justify Right",
      "justifyFull": "Justify Full",
      "indent": "Indent",
      "outdent": "Outdent",
      "cut": "Cut",
      "copy": "Copy",
      "delete": "Delete",
      "removeFormat": "Clear Formatting",
      "undo": "Undo",
      "redo": "Redo",
      "paragraph": "Paragraph",
      "blockquote": "Blockquote",
      "removeBlockquote": "Remove Blockquote",
      "horizontalLine": "Horizontal Line",
      "orderedList": "Ordered List",
      "unorderedList": "Color Picker",
      "link": "Insert Link",
      "URLInput": "URL",
      "urlTextInput": "Text",
      "urlNewTab": "Open in new tab",
      "linkSubmit": "Submit",
      "unlink": "Unlink",
      "image": "Insert Image",
      "chooseImage": "Choose Image",
      "uploadingimage": "Uploading Image",
      "imageURLInput": "URL",
      "imageSubmit": "Submit",
      "video": "Insert Video",
      "videoURLInput": "URL",
      "height": "height (px)",
      "width": "width (px)",
      "heightwidth": "Height/Width",
      "videoSubmit": "Submit",
      "textColor": "Text",
      "backgroundColor": "Background",
      "hexInput": "Hex Color",
      "hexSubmit": "Submit",
      "fontSubmit": "Submit",
      "example": "Ex:"
  } 
}
```
