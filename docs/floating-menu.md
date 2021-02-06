# Floating Menu

The editor exposes a component which renders a minimal menu. Place it anywhere in the HTML. Technically it is just a wrapper which provides a wrapper and positions it relative to selection. You can render anything inside it as required.

```html
<ngx-editor [editor]="editor">
  <ngx-editor-floating-menu [editor]="editor"></ngx-editor-floating-menu>
</ngx-editor>
```

OR

HTML

```html
<div class="editor">
  <ngx-editor [editor]="editor"> </ngx-editor>
  <ngx-editor-floating-menu [editor]="editor"></ngx-editor-floating-menu>
</div>
```

CSS

```css
.editor {
  position: relative; // important
}
```

**Note:** Make sure the wrapping element has relative position. Not required if placed inside the editor

### Default Floating menu

<iframe src="https://stackblitz.com/edit/ngx-editor-floating-menu?embed=1&hideExplorer=1&view=preview" height="600"></iframe>

### Floating Menu with custom element.

<iframe src="https://stackblitz.com/edit/ngx-editor-floating-menu-custom?embed=1&hideExplorer=1&view=preview" height="600"></iframe>
