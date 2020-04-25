# Configuration

The Configuration can be provided using `config` property

## Usage

```html
<ngx-editor [config]="editorConfig" [(ngModel)]="jsonDoc" placeholder="Enter text here..."> </ngx-editor>
```

### Default Configuration

The config property is a JSON object.

```json
{
  "toolbar": [["bold", "italic", "code"]]
}
```

Configuration Type definition

```ts
interface Config {
  toolbar: boolean | null | string[][];
}
```
