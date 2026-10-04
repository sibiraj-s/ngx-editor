---
title: Theming
---

The editor, menu and bubble menu are styled with CSS variables. Override them to match your app.

```css
:root {
  --ngx-editor-background-color: #1e1e1e;
  --ngx-editor-text-color: #e0e0e0;
}
```

### Variables

| Variable                                    | Default                                  |
| ------------------------------------------- | ---------------------------------------- |
| `--ngx-editor-border-radius`                | `4px`                                    |
| `--ngx-editor-background-color`             | `#fff`                                   |
| `--ngx-editor-text-color`                   | `#000`                                   |
| `--ngx-editor-placeholder-color`            | `#6c757d`                                |
| `--ngx-editor-border-color`                 | `rgba(0, 0, 0, 0.2)`                     |
| `--ngx-editor-wrapper-border-color`         | `rgba(0, 0, 0, 0.2)`                     |
| `--ngx-editor-menubar-bg-color`             | `#fff`                                   |
| `--ngx-editor-menubar-padding`              | `3px`                                    |
| `--ngx-editor-menubar-height`               | `30px`                                   |
| `--ngx-editor-blockquote-color`             | `#ddd`                                   |
| `--ngx-editor-blockquote-border-width`      | `3px`                                    |
| `--ngx-editor-icon-size`                    | `30px`                                   |
| `--ngx-editor-popup-bg-color`               | `#fff`                                   |
| `--ngx-editor-popup-border-radius`          | `4px`                                    |
| `--ngx-editor-popup-shadow`                 | `rgba(60, 64, 67, 0.15) 0px 2px 6px 2px` |
| `--ngx-editor-menu-item-border-radius`      | `2px`                                    |
| `--ngx-editor-menu-item-active-color`       | `#1a73e8`                                |
| `--ngx-editor-menu-item-hover-bg-color`     | `#f1f1f1`                                |
| `--ngx-editor-menu-item-active-bg-color`    | `#e8f0fe`                                |
| `--ngx-editor-seperator-color`              | `#ccc`                                   |
| `--ngx-editor-bubble-bg-color`              | `#000`                                   |
| `--ngx-editor-bubble-text-color`            | `#fff`                                   |
| `--ngx-editor-bubble-item-hover-color`      | `#636262`                                |
| `--ngx-editor-bubble-seperator-color`       | `#fff`                                   |
| `--ngx-editor-table-header-bg-color`        | `#f5f5f5`                                |
| `--ngx-editor-table-resize-handle-color`    | `#adf`                                   |
| `--ngx-editor-table-selected-cell-bg-color` | `rgba(200, 200, 255, 0.4)`               |
| `--ngx-editor-focus-ring-color`             | `#5e9ed6`                                |
| `--ngx-editor-error-color`                  | `red`                                    |
| `--ngx-editor-click-pointer`                | `default`                                |

The image resize border uses `--ngx-editor-menu-item-active-color`.
