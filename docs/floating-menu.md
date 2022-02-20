# Floating Menu

Include the floating menu in the template.

```html
<ngx-editor [editor]="editor">
  <ngx-editor-floating-menu [editor]="editor"></ngx-editor-floating-menu>
</ngx-editor>
```

OR

```html
<div class="editor">
  <ngx-editor [editor]="editor"> </ngx-editor>
  <ngx-editor-floating-menu [editor]="editor"></ngx-editor-floating-menu>
</div>
```

### Default Floating menu

<iframe src="https://stackblitz.com/edit/ngx-editor-floating-menu?embed=1&hideExplorer=1&view=preview" height="600"></iframe>

### Floating Menu with custom content.

```html
<div class="editor">
  <ngx-editor [editor]="editor"> </ngx-editor>
  <ngx-editor-floating-menu [editor]="editor">
    <ngx-editor-menu [editor]="editor"></ngx-editor-menu>
  </ngx-editor-floating-menu>
</div>
```

<iframe src="https://stackblitz.com/edit/ngx-editor-floating-menu-custom?embed=1&hideExplorer=1&view=preview" height="600"></iframe>
