# Configuration

The Configuration can be provided using `config` property

## Usage

```html
<ngx-editor
  [config]="editorConfig"
  [(ngModel)]="jsonDoc"
  placeholder="Enter text here..."
>
</ngx-editor>
```

### Default Configuration

The config property is a JSON object. Each array is a group which is seperated by sperator.

```jsonc
{
  "toolbar": [
    ["bold", "italic", "code"], // inline icons
    ["ordered_list", "bullet_list"],
    [{ "heading": ["h1", "h2", "h3", "h4", "h5", "h6"] }] // dropdown
  ]
}
```

Configuration Type definition

```ts
interface Config {
  toolbar: boolean | null | string[][];
}
```
