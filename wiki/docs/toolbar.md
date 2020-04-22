# Toolbar

Toolbar option is an array of arrays. The default is

```JSON
[
    ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
    ["fontSize", "color"],
    ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
    ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
    ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
    ["link", "unlink", "image"]
]
```

and it can be customized. Each array represents a button group and the value represents the name of the button.

Toolbar is provided with the editor configuration as

```JSON
{
  "toolbar": [
     ["bold", "italic", "underline", "strikeThrough"],
     ["justifyLeft", "justifyRight", "justifyFull" "outdent"]
  ]
}
```

Providing empty toolbar array will enable all default buttons
