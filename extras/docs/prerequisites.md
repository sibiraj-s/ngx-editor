# Prerequisites

## Peer Dependencies

You must install all the following `peerDependencies` in order for `ngx-editor to work

* [CodeMirror](https://codemirror.net/) - Code Edit/Preview
* [FontAwesome](https://fontawesome.com/v4.7.0/) - Toolbar icons
* [NgxBootstrap](https://valor-software.com/ngx-bootstrap/) - Popover

## Note

* `CodeMirror` and `ngx-bootstrap` are mandatory peerDependency which needs to be installed and there is no need for them to be imported.

## Stylesheets

Import codemirror`s css into your project

```bash
node_modules/codemirror/lib/codemirror.css
```

## Modules

For `ngModel` and `image upload` work properly, you must inlcude `FormsModule` and `HttpClientModule` respectively in your project.

```ts
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
```
