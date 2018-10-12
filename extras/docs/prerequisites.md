# Prerequisites

## Peer Dependencies

You must install the following `peerDependencies` in order for `ngx-editor to work

* [NgxBootstrap](https://valor-software.com/ngx-bootstrap/) - Popover

## Note

* `ngx-bootstrap` is a mandatory peerDependency which needs to be installed and there is no need for them to be imported.

## Modules

For `ngModel` and `image upload` work properly, you must inlcude `FormsModule` and `HttpClientModule` respectively in your project.

```ts
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
```
