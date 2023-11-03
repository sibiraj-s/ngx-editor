---
title: Migrating from v8 to v9
---

`enabled` property on the component is renamed to `disabled` to align more with the Forms API.

**Before**

```html
<ngx-editor [enabled]="false"></ngx-editor>
```

**After**

```html
<ngx-editor [disabled]="true"></ngx-editor>
```
