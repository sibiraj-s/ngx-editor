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
    ]
}
```
