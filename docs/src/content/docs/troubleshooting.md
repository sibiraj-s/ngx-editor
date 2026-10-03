---
title: Troubleshooting
---

### Multiple versions of prosemirror packages

```
RangeError: Can not convert <> to a Fragment (looks like multiple versions of prosemirror-model were loaded)
```

This error, or similar errors like `Adding different instances of a keyed plugin`, happens when more than one copy of a prosemirror package is installed. ProseMirror relies on `instanceof` checks, so objects created by one copy are rejected by the other.

Check for duplicate versions:

```bash
npm ls prosemirror-model prosemirror-state prosemirror-view
```

If more than one version is listed, deduplicate them:

```bash
npm dedupe
```

If that doesn't help, delete `node_modules` and the lockfile and install again.

When another dependency needs a different version, force a single version with [overrides](https://docs.npmjs.com/cli/configuring-npm/package-json#overrides) for npm or [resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/) for yarn. The version should satisfy the range required by ngx-editor.

```json
{
  "overrides": {
    "prosemirror-model": "^1.25.12"
  }
}
```

If you install prosemirror packages directly in your app, use versions compatible with the ones ngx-editor depends on.
