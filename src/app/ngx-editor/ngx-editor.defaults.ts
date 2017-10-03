export const ngxEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '5rem',
  minHeight: 'inherit',
  translate: 'yes',
  placeholder: 'Enter text here...',
  toolbar: {
    text: ['fontFamily', 'fontSize', 'bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
    align: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
    action: ['cut', 'copy', 'paste', 'delete', 'removeFormat', 'undo', 'redo'],
    insert: ['image', 'paragraph', 'blockquote', 'removeBlockquote', 'html', 'horizontalLine', 'orderedList', 'unorderedList'],
    extras: ['code', 'fullscreen', 'print']
  }
};
