# Prerequisites

## Peer Dependencies

You must install all the following `peerDependencies` in order for `ngx-editor to work

* [CodeMirror](https://codemirror.net/)
* [FontAwesome](https://fontawesome.com/v4.7.0/)
* [Bootstrap](https://getbootstrap.com/)
* [NgxBootstrap](https://valor-software.com/ngx-bootstrap/)

`Bootstrap` is a temporary dependency and it will be removed sooner.

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
