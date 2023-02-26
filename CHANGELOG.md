# CHANGELOG

All notable changes to this project will be documented in this file.

> **Tags**
>
> - Features
> - Bug Fixes
> - Performance Improvements
> - Dependency Updates
> - Breaking Changes
> - Enhancements
> - Documentation
> - Internal

## v15.3.0 (2023-02-26)

#### Features

- add option to use custom icons in menu component ([5706bc4](https://github.com/sibiraj-s/ngx-editor/commit/5706bc4)),
  ([eda7f2f](https://github.com/sibiraj-s/ngx-editor/commit/eda7f2f))

## v15.2.0 (2023-02-06)

#### Features

- add option to focus command to focus at start ([92d342b](https://github.com/sibiraj-s/ngx-editor/commit/92d342b))

#### Dependency Updates

- update prosemirror dependencies ([8f1a35b](https://github.com/sibiraj-s/ngx-editor/commit/8f1a35b))
- update floating-ui dependencies ([0386c3f](https://github.com/sibiraj-s/ngx-editor/commit/0386c3f))

## v15.1.0 (2022-12-14)

#### Features

- export NgxEditorService ([4168c6b](https://github.com/sibiraj-s/ngx-editor/commit/4168c6b))

#### Dependency Updates

- update prosemirror dependencies ([eb6f692](https://github.com/sibiraj-s/ngx-editor/commit/eb6f692))
- update floating-ui dependencies ([03991ff](https://github.com/sibiraj-s/ngx-editor/commit/03991ff))

## v15.0.1 (2022-10-21)

#### Dependency Updates

- update prosemirror dependencies ([faa9a87](https://github.com/sibiraj-s/ngx-editor/commit/faa9a87))
- update floating-ui dependencies ([68341dc](https://github.com/sibiraj-s/ngx-editor/commit/68341dc))

## v15.0.0 (2022-08-17)

#### Bug Fixes

- remove deprecated ComponenetFactoryResolver ([41524f3](https://github.com/sibiraj-s/ngx-editor/commit/41524f3))

#### Breaking Changes

- requires angular v14.1.0 or greater ([db0c8a7](https://github.com/sibiraj-s/ngx-editor/commit/db0c8a7))

#### Features

- add option to set custom link validation pattern ([98ff517](https://github.com/sibiraj-s/ngx-editor/commit/98ff517))

## v14.2.0 (2022-07-27)

#### Features

- add support for clear formatting ([8fc2647](https://github.com/sibiraj-s/ngx-editor/commit/8fc2647))

#### Bug Fixes

- add missing locale for horizontal rule ([40dd011](https://github.com/sibiraj-s/ngx-editor/commit/40dd011))
- use correct import for rxjs operators ([3e0fd58](https://github.com/sibiraj-s/ngx-editor/commit/3e0fd58))

## v14.1.0 (2022-07-25)

#### Features

- support mailto links ([b9aec15](https://github.com/sibiraj-s/ngx-editor/commit/b9aec15))

#### Dependency Updates

- update prosemirror-view to v1.27.0 ([9adf9e7](https://github.com/sibiraj-s/ngx-editor/commit/9adf9e7))
- update prosemirror-schema-list to v1.2.1 ([6b68cf2](https://github.com/sibiraj-s/ngx-editor/commit/6b68cf2))
- update floating-ui to v1 ([09becd2](https://github.com/sibiraj-s/ngx-editor/commit/09becd2))

## v14.0.0 (2022-06-28)

#### Breaking Changes

- requires angular 14 or greater ([8092c4d](https://github.com/sibiraj-s/ngx-editor/commit/8092c4d))

## v13.0.0 (2022-06-01)

#### Features

- update `prosemirror-*` dependencies ([5bfb813](https://github.com/sibiraj-s/ngx-editor/commit/5bfb813))
- remove DefinitelyTyped `@types/prosemirror-*` dependencies ([5bfb813](https://github.com/sibiraj-s/ngx-editor/commit/5bfb813))
- update `@floating-ui/*` dependencies ([f9282d8](https://github.com/sibiraj-s/ngx-editor/commit/f9282d8))

#### Bug Fixes

- pin all external dependencies ([741cd69](https://github.com/sibiraj-s/ngx-editor/commit/741cd69))

#### Breaking Changes

No breaking changes. Released as major version due to the nature of dependency updates

## v12.4.1 (2022-05-14)

#### Bug Fixes

- pin prosemirror types ([b48929b](https://github.com/sibiraj-s/ngx-editor/commit/b48929b))

## v12.4.0 (2022-05-11)

#### Features

- export injectionToken ([608e978](https://github.com/sibiraj-s/ngx-editor/commit/608e978))
- add option handleScrollToSelection ([c996665](https://github.com/sibiraj-s/ngx-editor/commit/c996665))

#### Bug Fixes

- fix focus plugin registered twice ([9891b96](https://github.com/sibiraj-s/ngx-editor/commit/9891b96))

## v12.3.0 (2022-05-08)

#### Features

- add horizontal rule menu item ([608e978](https://github.com/sibiraj-s/ngx-editor/commit/608e978))

#### Bug Fixes

- fix typings for attributes config ([396be73](https://github.com/sibiraj-s/ngx-editor/commit/396be73))

#### Dependency Updates

- update @floating-ui/core to v0.7.0 ([c86e6b0](https://github.com/sibiraj-s/ngx-editor/commit/c86e6b0))
- update @floating-ui/dom to v0.5.0 ([fc71027](https://github.com/sibiraj-s/ngx-editor/commit/fc71027))

## v12.2.3 (2022-04-26)

#### Bug Fixes

- export getDefaultPlugins and getKeyboardShortcuts methods ([953166e](https://github.com/sibiraj-s/ngx-editor/commit/953166e))

#### Dependency Updates

- update @floating-ui/core to v0.6.2 ([b619819](https://github.com/sibiraj-s/ngx-editor/commit/b619819))
- update @floating-ui/dom to v0.4.5 ([b619819](https://github.com/sibiraj-s/ngx-editor/commit/b619819))
- update prosemirror-commands to v1.2.2 ([25d5d15](https://github.com/sibiraj-s/ngx-editor/commit/25d5d15))
- update prosemirror-view to v1.23.12 ([25d5d15](https://github.com/sibiraj-s/ngx-editor/commit/25d5d15))

## v12.2.2 (2022-03-08)

#### Bug Fixes

- wrap toolbar when it overflows the container ([9f85ea6](https://github.com/sibiraj-s/ngx-editor/commit/9f85ea6))

## v12.2.1 (2022-02-23)

#### Bug Fixes

- remove extra dom node around image component ([210824a](https://github.com/sibiraj-s/ngx-editor/commit/210824a))

## v12.2.0 (2022-02-20)

### Features

- add option `autoPlace` to floating-menu to automatically position the component ([82c1047](https://github.com/sibiraj-s/ngx-editor/commit/82c1047))

### Enhancements

- improve floating-menu positioning with floating-ui ([82c1047](https://github.com/sibiraj-s/ngx-editor/commit/82c1047))

#### Dependency Updates

- update prosemirror dependencies ([8d4d5ea](https://github.com/sibiraj-s/ngx-editor/commit/8d4d5ea))
- update devDependencies ([8171514](https://github.com/sibiraj-s/ngx-editor/commit/8171514))

## v12.1.2 (2022-01-29)

#### Bug Fixes

- show active background color in color palette ([e2d4f43](https://github.com/sibiraj-s/ngx-editor/commit/e2d4f43))
- fix color palette selection in `mat-dialog` ([c7df506](https://github.com/sibiraj-s/ngx-editor/commit/c7df506))
- replace deprecated substr with substring ([9089c5a](https://github.com/sibiraj-s/ngx-editor/commit/9089c5a))

### Enhancements

- inherit svg text using currentColor ([0b785b3](https://github.com/sibiraj-s/ngx-editor/commit/0b785b3))

#### Performance Improvements

- use trackByFn with ngFor loops ([c7df506](https://github.com/sibiraj-s/ngx-editor/commit/c7df506))

#### Dependency Updates

- update dependencies and devDependencies ([ce1ca6b](https://github.com/sibiraj-s/ngx-editor/commit/ce1ca6b))

## v12.1.1 (2022-01-14)

#### Bug Fixes

- set all image attributes during resize ([c4f9426](https://github.com/sibiraj-s/ngx-editor/commit/c4f9426))

#### Dependency Updates

- update devDependencies ([6888b03](https://github.com/sibiraj-s/ngx-editor/commit/6888b03))

## v12.1.0 (2022-01-06)

#### Bug Fixes

- allow editor to be reset via reactive forms api ([dd96ae2](https://github.com/sibiraj-s/ngx-editor/commit/dd96ae2))

#### Breaking Changes

- set correct peerDependencies versions ([0dd68c8](https://github.com/sibiraj-s/ngx-editor/commit/0dd68c8))
- add tslib to dependencies ([0dd68c8](https://github.com/sibiraj-s/ngx-editor/commit/0dd68c8)), ([ebe4dcf](https://github.com/sibiraj-s/ngx-editor/commit/ebe4dcf))
- update prosemirror dependencies ([a0dd0e0](https://github.com/sibiraj-s/ngx-editor/commit/a0dd0e0))

## v12.0.0 (2021-11-25)

#### Breaking Changes

- requires angular 13 ([aadca9c](https://github.com/sibiraj-s/ngx-editor/commit/aadca9c))

## v11.1.1 (2021-10-08)

#### Bug Fixes

- allow link insert without text selection ([551e0ef](https://github.com/sibiraj-s/ngx-editor/commit/551e0ef))

## v11.1.0 (2021-09-10)

#### Features

- add option to enable or disable some editor features ([c0d256f](https://github.com/sibiraj-s/ngx-editor/commit/c0d256f))

## v11.0.0 (2021-09-01)

#### Features

- support editor attributes ([e89e676](https://github.com/sibiraj-s/ngx-editor/commit/e89e676))

#### Breaking Changes

- use px instead of rem for styling ([19464a4](https://github.com/sibiraj-s/ngx-editor/commit/19464a4))

## v10.1.0 (2021-07-09)

#### Features

- add input rules for bold and italics ([ab7d175](https://github.com/sibiraj-s/ngx-editor/commit/ab7d175))

#### Bug Fixes

- use correct shortcut for underline ([c82fce0](https://github.com/sibiraj-s/ngx-editor/commit/c82fce0))

## v10.0.2 (2021-06-12)

#### Bug Fixes

- make input elements editable inside floating menu ([c408d17](https://github.com/sibiraj-s/ngx-editor/commit/c408d17))

## v10.0.1 (2021-05-30)

#### Bug Fixes

- add missing rxjs peerDependency ([63f396f](https://github.com/sibiraj-s/ngx-editor/commit/63f396f))

## v10.0.0 (2021-05-27)

#### Breaking Changes

- requires angular 12 or greater ([2558555](https://github.com/sibiraj-s/ngx-editor/commit/2558555))

## v9.0.2 (2021-05-13)

#### Bug Fixes

- update URL regex to allow query parameters ([a8ec71c](https://github.com/sibiraj-s/ngx-editor/commit/a8ec71c))
- set title for link and image menu items ([d8de693](https://github.com/sibiraj-s/ngx-editor/commit/d8de693))

## v9.0.1 (2021-05-05)

#### Bug Fixes

- check `navigator` before access for SSR ([2a58a3a](https://github.com/sibiraj-s/ngx-editor/commit/2a58a3a))

## v9.0.0 (2021-05-01)

#### Features

- enable or disable the component via Forms API ([042eeea](https://github.com/sibiraj-s/ngx-editor/commit/042eeea))
- add option `dropdownPlacement` to the menu component ([b0f2026](https://github.com/sibiraj-s/ngx-editor/commit/b0f2026))

#### Breaking Changes

- option `enabled` is replaced with `disabled` ([042eeea](https://github.com/sibiraj-s/ngx-editor/commit/042eeea))

## v8.1.1 (2021-03-26)

#### Bug Fixes

- prevent placeholder from rendering on each empty block ([ef2c452](https://github.com/sibiraj-s/ngx-editor/commit/ef2c452))

## v8.1.0 (2021-03-17)

#### Features

- `Shift-Enter` to line break ([e5a4b4c](https://github.com/sibiraj-s/ngx-editor/commit/e5a4b4c))

#### Bug Fixes

- check if link mark exists before evaluation ([f65b0ff](https://github.com/sibiraj-s/ngx-editor/commit/f65b0ff))

#### Dependency Updates

- regenerate package-lock.json ([47a292c](https://github.com/sibiraj-s/ngx-editor/commit/47a292c))
- update prosemirror-view ([a71de7d](https://github.com/sibiraj-s/ngx-editor/commit/a71de7d))
- update devDependencies ([1d56a9e](https://github.com/sibiraj-s/ngx-editor/commit/1d56a9e))

#### Internal

- remove unused imports ([85575e1](https://github.com/sibiraj-s/ngx-editor/commit/85575e1))

## v8.0.1 (2021-03-06)

#### Bug Fixes

- fix placeholder misaligned with with right align ([2b7b06e](https://github.com/sibiraj-s/ngx-editor/commit/2b7b06e))
- fix placeholder caret not displayed in Firefox ([451f275](https://github.com/sibiraj-s/ngx-editor/commit/451f275))

#### Dependency Updates

- update karma to v6 ([077140b](https://github.com/sibiraj-s/ngx-editor/commit/077140b))
- update husky to v5 ([bf7657a](https://github.com/sibiraj-s/ngx-editor/commit/bf7657a))
- update devDependencies ([8b41338](https://github.com/sibiraj-s/ngx-editor/commit/8b41338)), ([28dc6af](https://github.com/sibiraj-s/ngx-editor/commit/28dc6af))
- update angular dependencies ([55700a3](https://github.com/sibiraj-s/ngx-editor/commit/55700a3))
- regenerate package-lock ([ea76b8a](https://github.com/sibiraj-s/ngx-editor/commit/ea76b8a))

#### Documentation

- update migration guide ([bcbfd72](https://github.com/sibiraj-s/ngx-editor/commit/bcbfd72)), ([0002cba](https://github.com/sibiraj-s/ngx-editor/commit/0002cba))

## v8.0.0 (2021-02-17)

#### Features

- add `auto-link` inputrule ([c18d1ed](https://github.com/sibiraj-s/ngx-editor/commit/c18d1ed))
- add `insertHTML` command ([9d41ff0](https://github.com/sibiraj-s/ngx-editor/commit/9d41ff0))

#### Dependency Updates

- update `prosemirror-{view/commands}` ([292e21d](https://github.com/sibiraj-s/ngx-editor/commit/292e21d))

## v8.0.0-beta.8 (2021-02-09)

#### Features

- allow pasting links ([83420ad](https://github.com/sibiraj-s/ngx-editor/commit/83420ad))

#### Bug Fixes

- sync image view's cached node on update ([3859006](https://github.com/sibiraj-s/ngx-editor/commit/3859006))
- prevent floating menu from closing while clicking on disabled items ([83fc998](https://github.com/sibiraj-s/ngx-editor/commit/83fc998))
- show title for floating menu items ([53eb29c](https://github.com/sibiraj-s/ngx-editor/commit/53eb29c))

#### Dependency Updates

- update angular dependencies ([0d71d63](https://github.com/sibiraj-s/ngx-editor/commit/0d71d63))
- regenerate package-lock.json file ([7696230](https://github.com/sibiraj-s/ngx-editor/commit/7696230))

#### Internal

- update LICENSE ([b4cdf2f](https://github.com/sibiraj-s/ngx-editor/commit/b4cdf2f))

## v8.0.0-beta.7 (2021-02-08)

#### Bug Fixes

- remove use of ecma private methods ([41df4bf](https://github.com/sibiraj-s/ngx-editor/commit/41df4bf))
- throw error if editor is not provided to floating bubble ([bae942d](https://github.com/sibiraj-s/ngx-editor/commit/bae942d))
- fix styles for image view ([6fd4a8b](https://github.com/sibiraj-s/ngx-editor/commit/6fd4a8b))

#### Dependency Updates

- update docsify ([d9b3ada](https://github.com/sibiraj-s/ngx-editor/commit/d9b3ada))

## v8.0.0-beta.6 (2021-02-07)

#### Bug Fixes

- set correct image size after resizing while history undo ([0a2d547](https://github.com/sibiraj-s/ngx-editor/commit/0a2d547))
- fix injector destroyed issue with HMR ([f12a5c8](https://github.com/sibiraj-s/ngx-editor/commit/f12a5c8))
- set correct style for active item in floating menu ([2806b07](https://github.com/sibiraj-s/ngx-editor/commit/2806b07))

#### Breaking Changes

`@angualr/elements` is no longer a dependency ([f12a5c8](https://github.com/sibiraj-s/ngx-editor/commit/f12a5c8))

## v8.0.0-beta.5 (2021-02-07)

#### Bug Fixes

- update prosemirror-transform ([5d87c20](https://github.com/sibiraj-s/ngx-editor/commit/5d87c20))
- update prosemirror-view ([8325556](https://github.com/sibiraj-s/ngx-editor/commit/8325556))
- cleanup floating menu show/hide logic ([93afcdc](https://github.com/sibiraj-s/ngx-editor/commit/93afcdc))

## v8.0.0-beta.4 (2021-02-06)

#### Bug Fixes

- fix floating menu component selector ([dfb9603](https://github.com/sibiraj-s/ngx-editor/commit/dfb9603))

## v8.0.0-beta.3 (2021-02-06)

#### Bug Fixes

- prevent floating menu flicker on while selection ([4617294](https://github.com/sibiraj-s/ngx-editor/commit/4617294))
- fix slowness caused by floating menu ([9e6f705](https://github.com/sibiraj-s/ngx-editor/commit/9e6f705))

#### Breaking Changes

Floating menu is now exposed as a component

**Before**

```html
<ngx-editor [editor]="editor" [floatingMenu]="true"></ngx-editor>
```

**After**

```html
<ngx-editor [editor]="editor">
  <ngx-editor-floating-menu [editor]="editor"></ngx-editor-floating-menu>
</ngx-editor>
```

## v8.0.0-beta.2 (2021-02-05)

#### Bug Fixes

- fixes styling issues with `box-sizing:border-box` ([6c26440](https://github.com/sibiraj-s/ngx-editor/commit/6c26440))
- update floating menu styles ([9568769](https://github.com/sibiraj-s/ngx-editor/commit/9568769))
- prevent incorrect updates to toolbar with multiple instances ([908c9cb](https://github.com/sibiraj-s/ngx-editor/commit/908c9cb))

#### Features

- add alignment options to floating menu ([3c0ed54](https://github.com/sibiraj-s/ngx-editor/commit/3c0ed54))

#### Dependency Updates

- update prosemirror-view, prosemirror-model ([a8ecb22](https://github.com/sibiraj-s/ngx-editor/commit/a8ecb22))

#### Enhancements

- use DOM created by ProseMirror ([8c8b738](https://github.com/sibiraj-s/ngx-editor/commit/8c8b738))

## v8.0.0-beta.1 (2021-02-04)

#### Bug Fixes

- add `@angualr/elements` as a peerDependency ([a147ee7](https://github.com/sibiraj-s/ngx-editor/commit/a147ee7))

## v8.0.0-beta.0 (2021-02-04)

#### Bug Fixes

- `valueChanges` and `update` are now observables and not subjects ([04ba120](https://github.com/sibiraj-s/ngx-editor/commit/04ba120))

#### Features

- new floating menu ([102ce62](https://github.com/sibiraj-s/ngx-editor/commit/102ce62))

#### Enhancements

- image plugin is included by default ([a3ab60c](https://github.com/sibiraj-s/ngx-editor/commit/a3ab60c))

#### Breaking Changes

Refer docs for migration https://sibiraj-s.github.io/ngx-editor

- image plugin is included by default ([a3ab60c](https://github.com/sibiraj-s/ngx-editor/commit/a3ab60c))
- editor.focus and editor.blur method no longer exposed ([3804990](https://github.com/sibiraj-s/ngx-editor/commit/3804990))
- `Editor.onContentChange` is now `Editor.valueChanges` ([84da2cf](https://github.com/sibiraj-s/ngx-editor/commit/84da2cf))
- `Editor.onUpdate` is now `Editor.update` ([84da2cf](https://github.com/sibiraj-s/ngx-editor/commit/84da2cf))
- `Editor.destroy` has to be manually called when component is destroyed ([d4db760](https://github.com/sibiraj-s/ngx-editor/commit/d4db760))

## v7.0.5 (2021-01-26)

#### Bug Fixes

- update typings ([a27237e](https://github.com/sibiraj-s/ngx-editor/commit/a27237e))

#### Internal

- update test cases ([849411e](https://github.com/sibiraj-s/ngx-editor/commit/849411e)), ([c39b5cb](https://github.com/sibiraj-s/ngx-editor/commit/c39b5cb))

## v7.0.4 (2021-01-24)

#### Bug Fixes

- set empty document with at-least one node ([8939b80](https://github.com/sibiraj-s/ngx-editor/commit/8939b80))

#### Features

- schema as a secondary endpoint ([9dc6a98](https://github.com/sibiraj-s/ngx-editor/commit/9dc6a98))

```ts
import { schema, marks, nodes } from 'ngx-editor/schema';
```

#### Enhancements

- improve font style ([90d8236](https://github.com/sibiraj-s/ngx-editor/commit/90d8236))

#### Documentation

- fix `code_mirror` example ([454d9be](https://github.com/sibiraj-s/ngx-editor/commit/454d9be))

## v7.0.3 (2021-01-23)

#### Bug Fixes

- fix issues with `buildOptimizer` in angular 9, 10 ([49eba35](https://github.com/sibiraj-s/ngx-editor/commit/49eba35))

#### Enhancements

- update typings ([c048e52](https://github.com/sibiraj-s/ngx-editor/commit/c048e52))

## v7.0.2 (2021-01-22)

#### Dependency Updates

- update `prosemirror-state` ([64a4e5f](https://github.com/sibiraj-s/ngx-editor/commit/64a4e5f))
- update devDependencies ([a573a5d](https://github.com/sibiraj-s/ngx-editor/commit/a573a5d))
- update `@types/prosemirror-*` packages ([8683d27](https://github.com/sibiraj-s/ngx-editor/commit/8683d27))

#### Documentation

- fix typos ([541d6e0](https://github.com/sibiraj-s/ngx-editor/commit/541d6e0))

## v7.0.1 (2021-01-18)

#### Bug Fixes

- fix remove exported prosemirror methods ([86a8a82](https://github.com/sibiraj-s/ngx-editor/commit/86a8a82))

## v7.0.0 (2021-01-18)

#### Features

- default keyboard shortcuts and input rules are enabled by default ([5a4351b](https://github.com/sibiraj-s/ngx-editor/commit/5a4351b))
- history is enabled by default ([5a4351b](https://github.com/sibiraj-s/ngx-editor/commit/5a4351b))

## Migration

Refer docs for migration https://sibiraj-s.github.io/ngx-editor

## v6.1.0 (2021-01-18)

#### Features

- hitory and history keyboard shortcuts are builtin ([5a4351b](https://github.com/sibiraj-s/ngx-editor/commit/5a4351b))

#### Bug Fixes

- prevent errors when plugins field is not defined ([5a4351b](https://github.com/sibiraj-s/ngx-editor/commit/5a4351b))

## v6.1.0-beta.2 (2021-01-15)

#### Bug Fixes

- fix validation on empty string input ([9700f27](https://github.com/sibiraj-s/ngx-editor/commit/9700f27))

#### Dependency Updates

- update prosemirror-view ([15336b8](https://github.com/sibiraj-s/ngx-editor/commit/15336b8))
- update prosemirror-commands ([ced34fd](https://github.com/sibiraj-s/ngx-editor/commit/ced34fd))

#### Features

- add default wrapper css ([f1934b8](https://github.com/sibiraj-s/ngx-editor/commit/f1934b8))

## v6.1.0-beta.1 (2021-01-11)

#### Bug Fixes

- fix hidden broken image placeholder ([e2ae5e7](https://github.com/sibiraj-s/ngx-editor/commit/e2ae5e7))
- fix text align command ([ee0556c](https://github.com/sibiraj-s/ngx-editor/commit/ee0556c))

## v6.1.0-beta.0 (2021-01-11)

#### Features

- add `removeMark` command ([f740817](https://github.com/sibiraj-s/ngx-editor/commit/f740817))
- expose commands ([dc5c8d1](https://github.com/sibiraj-s/ngx-editor/commit/dc5c8d1))

```ts
this.editor.commands.textColor('red').insertText('Hello world!').focus().scrollIntoView().exec();
```

## v6.0.3 (2021-01-08)

#### Bug Fixes

- focus editor after inserting a link or image ([2d10e5f](https://github.com/sibiraj-s/ngx-editor/commit/2d10e5f))
- prevent dispatching a transaction if there is no change after updating a link ([2d10e5f](https://github.com/sibiraj-s/ngx-editor/commit/2d10e5f))
- select the image once inserted ([a33ea83](https://github.com/sibiraj-s/ngx-editor/commit/a33ea83))

## v6.0.2 (2021-01-08)

#### Dependency Updates

- update prosemirror-view to v1.17.0 ([576eabb](https://github.com/sibiraj-s/ngx-editor/commit/576eabb))

#### Enhancements

- removed unwanted entryComponents ([01256c3](https://github.com/sibiraj-s/ngx-editor/commit/01256c3))

#### Documentation

- add migration guide from v4 and from other editors ([73c9016](https://github.com/sibiraj-s/ngx-editor/commit/73c9016))

## v6.0.1 (2021-01-04)

#### Enhancements

- scope menu styles ([3ce6787](https://github.com/sibiraj-s/ngx-editor/commit/3ce6787))

## v6.0.0 (2021-01-03)

Refactor internals ([a5763a3](https://github.com/sibiraj-s/ngx-editor/commit/a5763a3))

## Migration

### Menu

**Before**

```ts
import { NgxEditorModule } from 'ngx-editor';

NgxEditorModule.forRoot({
  menu: {
    toolbar: [],
    colorPresets: [],
  },
});
```

**After**

Menu is a seperate component, has to be included manually if required.

Component

```ts
export class AppComponent implements OnInit, OnDestroy {
  isProdMode = environment.production;

  editor: Editor;
  toolbar: Toolbar = [['bold', 'italic']];
  colorPresets = ['red', 'blue', 'green'];

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
```

HTML

```html
<ngx-editor-menu [editor]="editor" [toolbar]="toolbar" [colorPresets]="colorPresets"> </ngx-editor-menu>
```

### CustomMenu

Before

```html
<ngx-editor [customMenuRef]="customMenu"> </ngx-editor>
```

After

```html
<ngx-editor-menu [customMenuRef]="customMenu"> </ngx-editor-menu>
```

### ProseMirror Configuration

**Before**

```ts
import { NgxEditorModule } from 'ngx-editor';

NgxEditorModule.forRoot({
  plugins: [],
  schema: {},
  nodeViews: {},
});
```

**After**

```ts
import { Editor } from 'ngx-editor';

new Editor({
  plugins: [],
  schema: {},
  nodeViews: {},
});
```

## v5.3.0 (2021-01-01)

#### Features

- add maxLength, minLength validators ([d59051c](https://github.com/sibiraj-s/ngx-editor/commit/d59051c))

## v5.2.1 (2020-12-30)

#### Bug Fixes

- disable menu when editable is set to false ([b7eca21](https://github.com/sibiraj-s/ngx-editor/commit/b7eca21))

## v5.2.0 (2020-12-30)

#### Features

- allow specifying output format ([e71b7d7](https://github.com/sibiraj-s/ngx-editor/commit/e71b7d7))

#### Bug Fixes

- emit HTML if input is a HTML ([e71b7d7](https://github.com/sibiraj-s/ngx-editor/commit/e71b7d7))
- fix validators for HTML input ([9b25119](https://github.com/sibiraj-s/ngx-editor/commit/9b25119))

## v5.1.1 (2020-12-30)

#### Bug Fixes

- return null from `required` validator when valid ([398e1d5](https://github.com/sibiraj-s/ngx-editor/commit/398e1d5))

## v5.1.0 (2020-12-30)

#### Features

- accept HTML as input ([d62d8e4](https://github.com/sibiraj-s/ngx-editor/commit/d62d8e4))

#### Bug Fixes

- don't call onchange on init ([2d7bf59](https://github.com/sibiraj-s/ngx-editor/commit/2d7bf59))

## v5.0.0 (2020-12-29)

#### Features

- support editable prop ([be077d7](https://github.com/sibiraj-s/ngx-editor/commit/be077d7))
- placeholder plugin is included by default ([03ac403](https://github.com/sibiraj-s/ngx-editor/commit/03ac403))
- allow hiding menu component ([998ca3c](https://github.com/sibiraj-s/ngx-editor/commit/998ca3c))

## v5.0.0-beta.3 (2020-12-28)

#### Bug Fixes

- fix active link helper crash with collab module ([e7b7aad](https://github.com/sibiraj-s/ngx-editor/commit/e7b7aad))
- fix cursor for placeholder ([7c8e6f9](https://github.com/sibiraj-s/ngx-editor/commit/7c8e6f9))
- fix heading command crash with collab module ([d26a2af](https://github.com/sibiraj-s/ngx-editor/commit/d26a2af))

#### Documentation

- added example to setup prosemirror-collab ([df6f7a4](https://github.com/sibiraj-s/ngx-editor/commit/df6f7a4))

## v5.0.0-beta.2 (2020-12-25)

#### Features

- support custom color presets ([b82658b](https://github.com/sibiraj-s/ngx-editor/commit/b82658b))

#### Bug Fixes

- prevent crash while selecting highlighting text/background color ([098fc62](https://github.com/sibiraj-s/ngx-editor/commit/098fc62))
- prevent applying color on right click ([9745295](https://github.com/sibiraj-s/ngx-editor/commit/9745295))
- don't autoscroll for applying colors without selection ([91db712](https://github.com/sibiraj-s/ngx-editor/commit/91db712))

## v5.0.0-beta.1 (2020-12-25)

#### Features

- support strikethrough ([098fc62](https://github.com/sibiraj-s/ngx-editor/commit/098fc62))
- support underline ([888573d](https://github.com/sibiraj-s/ngx-editor/commit/888573d))

## v5.0.0-beta.0 (2020-12-24)

#### Bug Fixes

- fix errors while selecting text/background color mark ([b1e85bb](https://github.com/sibiraj-s/ngx-editor/commit/b1e85bb))
- prefer `text-align` style property instead of `align` attribute ([ee03ee7](https://github.com/sibiraj-s/ngx-editor/commit/ee03ee7))

## v5.0.0-alpha.20 (2020-12-24)

#### Bug Fixes

- prevent user-selection on placeholder ([58076c7](https://github.com/sibiraj-s/ngx-editor/commit/58076c7))

#### Features

- color picker with default presets to set text/background color ([9c38412](https://github.com/sibiraj-s/ngx-editor/commit/9c38412))
- expose utilities to work with HTML ([b252358](https://github.com/sibiraj-s/ngx-editor/commit/b252358))

```ts
import { toHTML, toDOC } from 'ngx-editor';
```

## v5.0.0-alpha.19 (2020-12-14)

#### Bug Fixes

- highlight heading menu item when headings inside blockquotes is selected ([45fdb6e](https://github.com/sibiraj-s/ngx-editor/commit/45fdb6e))
- correctly unsubscribe on component destroy ([9f83f3b](https://github.com/sibiraj-s/ngx-editor/commit/9f83f3b))

## v5.0.0-alpha.18 (2020-12-10)

#### Bug Fixes

- update schema to support target `_blank` ([400c636](https://github.com/sibiraj-s/ngx-editor/commit/400c636))
- use `href` as title instead of text ([400c636](https://github.com/sibiraj-s/ngx-editor/commit/400c636))

#### Breaking Changes

- link plugin is no longer required ([63b6aa6](https://github.com/sibiraj-s/ngx-editor/commit/63b6aa6))

Before

```ts
import { link } from 'ngx-editor/plugins';

NgxEditorModule.forRoot({
  plugins: [
    link(), // remove this
  ],
});
```

## v5.0.0-alpha.17 (2020-12-09)

#### Bug Fixes

- prevent menu icons from shrinking on resize ([b4f457c](https://github.com/sibiraj-s/ngx-editor/commit/b4f457c))
- fix image plugin exported with incorrect name ([ac365e7](https://github.com/sibiraj-s/ngx-editor/commit/ac365e7))

#### Features

- allow placeholder to be set via component input ([ef4879a](https://github.com/sibiraj-s/ngx-editor/commit/ef4879a))

## v5.0.0-alpha.16 (2020-12-07)

#### Features

- added custom `required validator` ([6af3ce0](https://github.com/sibiraj-s/ngx-editor/commit/6af3ce0))

#### Bug Fixes

- fix touched property not registered when used with reactive forms ([6af3ce0](https://github.com/sibiraj-s/ngx-editor/commit/6af3ce0))

## v5.0.0-alpha.15 (2020-12-07)

#### Features

- added `focusIn` and `focusOut` events emitted on `focus` and `blur` events respectively.
- added `init` event, dispatched once editor is initialized. emits `EditorView` object
- added `removeLink` command

```ts
import { removeLink } from 'ngx-editor/commands';
```

- added alignment options to menu

```ts
{
  // config
  menu: [['align_left', 'align_center', 'align_right', 'align_justify']];
}
```

#### Dependency Updates

- update `prosemirror-view`
- removed `prosemirror-schema-basic` dependency

#### Enhancements

- allow images to be resized from all directions
- suport locals for all menu items
- improved click area on menu icons
- it is easier to write custom menus now, more angular way

#### Bug Fixes

- fix clicking on links in the bubble doesn't open in new tab

#### Breaking Changes

- removed `menu` plugin

**Before**

```ts
import { menu } from 'ngx-editor';

NgxEditorModule.forRoot({
  plugins: [
    menu({
      // default options (Optional)
      toolbar: [
        ['bold', 'italic', 'code'], // inline icons
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      ],
      labels: {
        bold: 'Bold',
        italics: 'Italics',
        code: 'Code',
        ordered_list: 'Ordered List',
        bullet_list: 'Bullet List',
        heading: 'Heading',
      },
    }),
  ],
});
```

**After**

```ts
NgxEditorModule.forRoot({
  menu: [
    ['bold', 'italic'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ],
  locals: {
    bold: 'Bold',
    italics: 'Italics',
    // '...'
  },
});
```

## v5.0.0-alpha.14 (2020-11-30)

#### Features

- support angular 9 ([0a497f2](https://github.com/sibiraj-s/ngx-editor/commit/0a497f2))

## v5.0.0-alpha.13 (2020-11-29)

#### Features

- support inserting images ([87b1414](https://github.com/sibiraj-s/ngx-editor/commit/87b1414))
- resizable images ([317bf42](https://github.com/sibiraj-s/ngx-editor/commit/317bf42))

#### Bug Fixes

- center align menu icons ([99e7c00](https://github.com/sibiraj-s/ngx-editor/commit/99e7c00))
- prevent menu content overflowing the editor ([9005869](https://github.com/sibiraj-s/ngx-editor/commit/9005869))

#### Enhancements

- remove dependency `prosemirror-schema-basic` ([317bf42](https://github.com/sibiraj-s/ngx-editor/commit/317bf42))

## v5.0.0-alpha.12 (2020-11-23)

#### Bug Fixes

- hide tooltip when editor is not in focus ([0fab30f](https://github.com/sibiraj-s/ngx-editor/commit/0fab30f))
- handle unlink option in menu correctly ([0696e82](https://github.com/sibiraj-s/ngx-editor/commit/0696e82))

## v5.0.0-alpha.11 (2020-11-23)

#### Features

- support links ([59899f4](https://github.com/sibiraj-s/ngx-editor/commit/59899f4))

## v5.0.0-alpha.10 (2020-11-21)

#### Features

- partial link support ([87e8d50](https://github.com/sibiraj-s/ngx-editor/commit/87e8d50))
- support angular 10, 11 ([59ed7e3](https://github.com/sibiraj-s/ngx-editor/commit/59ed7e3))

#### Breaking Changes

- drop angular 9 support ([59ed7e3](https://github.com/sibiraj-s/ngx-editor/commit/59ed7e3))

#### Internal

- publish docs only on release ([5838c2d](https://github.com/sibiraj-s/ngx-editor/commit/5838c2d))
- update to node 14 ([38893d8](https://github.com/sibiraj-s/ngx-editor/commit/38893d8))

## v4.1.1 (2020-11-09)

#### Bug Fixes

- fix validation in insert video form ([74a86ca](https://github.com/sibiraj-s/ngx-editor/commit/74a86ca))

## v5.0.0-alpha.9 (2020-06-13)

#### Bug Fixes

- fix issues with reactive-forms ([bede7a1](https://github.com/sibiraj-s/ngx-editor/commit/bede7a1))

## v5.0.0-alpha.8 (2020-06-08)

#### Bug Fixes

- set active state correctly for nested lists ([453d807](https://github.com/sibiraj-s/ngx-editor/commit/453d807))
- fix vulnerabilities ([9c89d2a](https://github.com/sibiraj-s/ngx-editor/commit/9c89d2a))

#### Features

- add blockquote support ([a26f192](https://github.com/sibiraj-s/ngx-editor/commit/a26f192))

## v5.0.0-alpha.7 (2020-06-01)

#### Enhancements

- remove dependencies `prosemirror-utils` and `prosemirror-tables` ([6e13142](https://github.com/sibiraj-s/ngx-editor/commit/6e13142))

#### Bug Fixes

- handle null value correctly in input ([84104c2](https://github.com/sibiraj-s/ngx-editor/commit/84104c2))
- fix schema usage in example app ([6e13142](https://github.com/sibiraj-s/ngx-editor/commit/6e13142))

#### Documentation

- add input-rules examples ([ce00b5f](https://github.com/sibiraj-s/ngx-editor/commit/ce00b5f))

## v5.0.0-alpha.6 (2020-05-31)

#### Features

- add support for custom menu items in menu plugin ([1737369](https://github.com/sibiraj-s/ngx-editor/commit/1737369))
- support custom prosemirror schema ([1737369](https://github.com/sibiraj-s/ngx-editor/commit/1737369))
- support prosemirror nodeviews config ([1737369](https://github.com/sibiraj-s/ngx-editor/commit/1737369))

#### Breaking Changes

- renamed few css identifiers ([c9555b4](https://github.com/sibiraj-s/ngx-editor/commit/c9555b4))

## v5.0.0-alpha.5 (2020-05-08)

#### Features

- add support for prosemirror plugins ([fcdc39b](https://github.com/sibiraj-s/ngx-editor/commit/fcdc39b))

#### Breaking Changes

- placeholder and config property is replaced with plugins

```ts
import { menu, placeholder } from 'ngx-editor';

NgxEditorModule.forRoot({
  plugins: [menu(), placholder('Type something here...')],
});
```

- shortcuts needs to be configured manually using plugins
- removed peerDependencies `prosemirror-history` and `prosemirror-keymap`

## v5.0.0-alpha.4 (2020-05-05)

#### Features

- add support for headings ([2d7d38e](https://github.com/sibiraj-s/ngx-editor/commit/2d7d38e))

## v5.0.0-alpha.3 (2020-05-04)

#### Features

- add support for list ([274dcc7](https://github.com/sibiraj-s/ngx-editor/commit/274dcc7))

#### Breaking Changes

- prosemirror `peerDependencies` are no longer needed ([274dcc7](https://github.com/sibiraj-s/ngx-editor/commit/274dcc7))

## v5.0.0-alpha.2 (2020-04-30)

#### Bug Fixes

- fix issues with custom config ([613ec52](https://github.com/sibiraj-s/ngx-editor/commit/613ec52))
- remove empty DOM wrapper around the editor ([5f176e1](https://github.com/sibiraj-s/ngx-editor/commit/5f176e1))

## v5.0.0-alpha.1 (2020-04-23)

#### Breaking Changes

- fix issues with ivy compiler ([30b513c](https://github.com/sibiraj-s/ngx-editor/commit/30b513c))

#### Enhancements

- remove unwanted dependencies ([94374c4](https://github.com/sibiraj-s/ngx-editor/commit/94374c4))

## v5.0.0-alpha (2020-04-22)

The package is entirely rewritten with prosemirror as default editor. Most of the options are removed and will be added eventually in upcoming releases.

#### Features

- use prosemirror as default editor ([f17d0ef](https://github.com/sibiraj-s/ngx-editor/commit/f17d0ef))

#### Breaking Changes

- remove `app` prefix from the component ([bbe3daa](https://github.com/sibiraj-s/ngx-editor/commit/bbe3daa))
- upgrade to angular 9 ([b280769](https://github.com/sibiraj-s/ngx-editor/commit/b280769))

#### Internal

- migrate from travis-ci to github actions ([2afb2ec](https://github.com/sibiraj-s/ngx-editor/commit/2afb2ec))
- update devDependencies ([fd3ee1a](https://github.com/sibiraj-s/ngx-editor/commit/fd3ee1a))

## v4.1.0 (2018-10-21)

#### Dependency Updates

- update husky to v1.1.2

#### Internal

- code cleanup

## v4.1.0-beta.0 (2018-10-12)

#### Features

- new MaxLengthvalidator for validation in reactive forms

#### Dependency Updates

- update ng-packagr to v4.3.0

## v4.0.0 (2018-10-04)

🎉 Support Angular 6.

#### Dependency Changes

- update angular to v6 and its dependencies
- update compodoc
- update ng-packagr
- remove commitizen, cz-conventional-changelog

#### Internal

- add prePublishOnly script to prevent accidental publishes

#### Documentation

- recompile docs with compodoc v1.1.5

## v3.3.0 (2018-05-04)

No new changes were introduced.

Follow releases from `v3.3.0-rc0` to `v3.3.0-rc.14` for release notes 🍻

## v3.3.0-rc.14 (2018-05-02)

#### Documentation

- update unclear prerequisites in README ([1c316cb](https://github.com/sibiraj-s/ngx-editor/commit/1c316cb)), closes [#92](https://github.com/sibiraj-s/ngx-editor/issues/92)

#### Enhancements

- update ngx-bootstrap ([eed8aaa](https://github.com/sibiraj-s/ngx-editor/commit/eed8aaa))

#### Internal

- update compodoc ([47f34ad](https://github.com/sibiraj-s/ngx-editor/commit/47f34ad))
- update bootstrap ([ee1555b](https://github.com/sibiraj-s/ngx-editor/commit/ee1555b))
- update ng-packagr ([b174a14](https://github.com/sibiraj-s/ngx-editor/commit/b174a14))

#### Breaking Changes

- remove code-editor support ([24b92e0](https://github.com/sibiraj-s/ngx-editor/commit/24b92e0))

## v3.3.0-rc.13 (2018-03-14)

#### Features

- auto-focus while switching to code-editor mode ([1ed938e](https://github.com/sibiraj-s/ngx-editor/commit/1ed938e)), closes [#79](https://github.com/sibiraj-s/ngx-editor/issues/79)
- show placeholder in code editor ([bae2216](https://github.com/sibiraj-s/ngx-editor/commit/bae2216))
- option to insert video link/ youtube urls ([e074c7a](https://github.com/sibiraj-s/ngx-editor/commit/e074c7a)), closes [#72](https://github.com/sibiraj-s/ngx-editor/issues/72)
- option to set font family ([1248db7](https://github.com/sibiraj-s/ngx-editor/commit/1248db7)), closes [#72](https://github.com/sibiraj-s/ngx-editor/issues/72)

#### Internal

- remove dead code which used to enable or disable toolbar ([00adda2](https://github.com/sibiraj-s/ngx-editor/commit/00adda2))

#### DEPENDENCY UPDATE

- update dependencies in package-lock file to latest satisfying version ([f62d945](https://github.com/sibiraj-s/ngx-editor/commit/f62d945))

## v3.3.0-rc.12 (2018-03-11)

#### Features

- support TAB key to focus the editor's text-area ([8e3e65b](https://github.com/sibiraj-s/ngx-editor/commit/8e3e65b)), closes [#79](https://github.com/sibiraj-s/ngx-editor/issues/79)

#### Bug Fixes

- don't return from writeValue ([36133e1](https://github.com/sibiraj-s/ngx-editor/commit/36133e1)), closes [#78](https://github.com/sibiraj-s/ngx-editor/issues/78)

#### Performance

- remove unused imports/variables ([182152a](https://github.com/sibiraj-s/ngx-editor/commit/182152a))

#### DEPENDENCY UPDATES

- update angular-cli to v1.7.3 ([0f94d1e](https://github.com/sibiraj-s/ngx-editor/commit/0f94d1e))
- update compodoc to v1.0.9 ([a9262c2](https://github.com/sibiraj-s/ngx-editor/commit/a9262c2))

## v3.3.0-rc.11 (2018-03-06)

#### Bug Fixes

- use codemirror's `htmlMixed` mode instead of `xml` mode ([fbf9d1d](https://github.com/sibiraj-s/ngx-editor/commit/fbf9d1d))

#### Internal

- remove redundant karma-cli ([df192b](https://github.com/sibiraj-s/ngx-editor/commit/df192b))

#### DEPENDENCY UPDATES

- update angular-cli to v1.7.2 ([87bb04e](https://github.com/sibiraj-s/ngx-editor/commit/87bb04e))
- update compodoc to v1.0.8 ([47d5ba4](https://github.com/sibiraj-s/ngx-editor/commit/47d5ba4))
- update ng-packagr to v2.2.0 ([ba86da6](https://github.com/sibiraj-s/ngx-editor/commit/ba86da6))

## v3.3.0-rc.10 (2018-02-27)

#### Bug Fixes

- don't override default styles ([5beee77](https://github.com/sibiraj-s/ngx-editor/commit/5beee77)), closes [#68](https://github.com/sibiraj-s/ngx-editor/issues/68)

## v3.3.0-rc.9 (2018-02-26)

#### Features

- **style** - highlight active tabs in popover ([0b7dd99](https://github.com/sibiraj-s/ngx-editor/commit/0b7dd99))
- option to set `font color` and `background color` ([a983fd4](https://github.com/sibiraj-s/ngx-editor/commit/a983fd4)), closes [#65](https://github.com/sibiraj-s/ngx-editor/issues/65)
- option to set `font-size` ([f49e477](https://github.com/sibiraj-s/ngx-editor/commit/f49e477)), closes [#31](https://github.com/sibiraj-s/ngx-editor/issues/31)

#### Bug Fixes

- **style** - center align popover arrow ([2a13ca0](https://github.com/sibiraj-s/ngx-editor/commit/2a13ca0))

#### Internal

- udpate devDependencies ([4fddfac](https://github.com/sibiraj-s/ngx-editor/commit/4fddfac))

## v3.3.0-rc.8 (2018-02-22)

#### Bug Fixes

- fix: links inserted twice ([97398ee](https://github.com/sibiraj-s/ngx-editor/commit/97398ee)), closes [#61](https://github.com/sibiraj-s/ngx-editor/issues/61)

## v3.3.0-rc.7 (2018-02-21)

#### Enhancements

- remove bootstrap from `peerDependency` ([8aa0ffd](https://github.com/sibiraj-s/ngx-editor/commit/8aa0ffd))

## v3.3.0-rc.6 (2018-02-20)

#### Bug Fixes

- fix a typo in toolbar ([367474f](https://github.com/sibiraj-s/ngx-editor/commit/367474f))

#### Enhancements

- added new peer dependencies ([683bbee](https://github.com/sibiraj-s/ngx-editor/commit/683bbee))
- updated docs ([57e4056](https://github.com/sibiraj-s/ngx-editor/commit/57e4056))

## v3.3.0-rc.5 (2018-02-19)

#### Features

- option to open URL in new tab ([d4001c4](https://github.com/sibiraj-s/ngx-editor/commit/d4001c4))
- option to upload images from local filesystem ([09b69b5](https://github.com/sibiraj-s/ngx-editor/commit/09b69b5)), closes [#34](https://github.com/sibiraj-s/ngx-editor/issues/34)

#### Internal

- documentation compiled with compodoc v1.0.7

## v3.3.0-rc.4 (2018-02-08)

#### Internal

- update ng-packager to v2.0.0

## v3.3.0-rc.3 (2018-02-05)

#### Bug Fixes

- remove border for toolbar if hidden ([4eef077](https://github.com/sibiraj-s/ngx-editor/commit/4eef077)), closes [#43](https://github.com/sibiraj-s/ngx-editor/issues/43)
- placeholder gets duplicated if a page has more than one editor ([cdfd4bc](https://github.com/sibiraj-s/ngx-editor/commit/cdfd4bc)), closes [#44](https://github.com/sibiraj-s/ngx-editor/issues/44)
- ngModel binding does not reflects in editor's textarea ([4f4967a](https://github.com/sibiraj-s/ngx-editor/commit/4f4967a)), closes [#45](https://github.com/sibiraj-s/ngx-editor/issues/45)

#### Changes

- update peerDependency codemirror to v5.34.0 ([6012283](https://github.com/sibiraj-s/ngx-editor/commit/6012283))

#### Internal

- update devDependencies ([6012283](https://github.com/sibiraj-s/ngx-editor/commit/6012283))

## v3.3.0-rc.2 (2018-01-19)

#### Bug Fixes

- fix: add missing xml parser for code-mirror ([1078c69](https://github.com/sibiraj-s/ngx-editor/commit/1078c69))

## v3.3.0-rc.1 (2018-01-19)

#### Bug Fixes

- fix error in exporting codemirror ([9f0e19d](https://github.com/sibiraj-s/ngx-editor/commit/9f0e19d)), closes [#40](https://github.com/sibiraj-s/ngx-editor/issues/40)

#### Internal

- update ng-packagr to v2.0.0-rc.11 ([9f0e19d](https://github.com/sibiraj-s/ngx-editor/commit/9f0e19d))

#### Documentation

- update additional docs ([9f0e19d](https://github.com/sibiraj-s/ngx-editor/commit/9f0e19d))
- removed wiki

## v3.3.0-rc.0 (2018-01-19)

#### Features

- added event-emitter to emit `blur` and `focus` events ([2ed79b8](https://github.com/sibiraj-s/ngx-editor/commit/2ed79b8))
- added option to view/edit plain `HTML` code ([2ed79b8](https://github.com/sibiraj-s/ngx-editor/commit/2ed79b8)), closes [#26](https://github.com/sibiraj-s/ngx-editor/issues/26)

#### Internal

- update angular-cli to v1.6.5 ([2ed79b8](https://github.com/sibiraj-s/ngx-editor/commit/2ed79b8))
- update devDependencies ([2ed79b8](https://github.com/sibiraj-s/ngx-editor/commit/2ed79b8))

#### Documentation

- docs autogenerated using [compodoc](<[2ed79b8](https://github.com/sibiraj-s/ngx-editor/commit/2ed79b8)>)

<!-- LINKS -->

[compodoc]: https://compodoc.github.io/website/mpodoc

## v3.2.1 (2017-12-19)

#### Bug Fixes

- add button types to toolbar to avoid firing `submit` while using in reactive forms ([d4ccc79](https://github.com/sibiraj-s/ngx-editor/commit/d4ccc79))

#### Enhancements

- lighten placeholder color ([27ccd72](https://github.com/sibiraj-s/ngx-editor/commit/27ccd72))

## v3.2.0 (2017-12-14)

#### Features

- enable or disable toolbar ([0a915f5](https://github.com/sibiraj-s/ngx-editor/commit/0a915f5))

#### Bug Fixes

- fix: horizontal overflow in editor ([0a915f5](https://github.com/sibiraj-s/ngx-editor/commit/0a915f5))
- minor style tweaks ([4390502](https://github.com/sibiraj-s/ngx-editor/commit/4390502))

## v3.1.2 (2017-12-05)

#### Bug Fixes

- remove methods that are not supported by Internet Explorer ([7be2fd6](https://github.com/sibiraj-s/ngx-editor/commit/7be2fd6))
- fix `grippie` svg not centre aligned in Internet Explorer ([c87c5e4](https://github.com/sibiraj-s/ngx-editor/commit/c87c5e4))
- fix inputs not replacing configuration ([dabac4c](https://github.com/sibiraj-s/ngx-editor/commit/dabac4c))

#### Internal

- update to [@angular/cli v1.5.5](<[9aabe1c](https://github.com/sibiraj-s/ngx-editor/commit/9aabe1c)>)

<!-- LINKS -->

[@angular/cli v1.5.5]: https://github.com/angular/angular-cli/releases/tag/v1.5.5

## v3.1.1 (2017-11-28)

#### Internal

- move dependencies to peerDependencies ([0310191](https://github.com/sibiraj-s/ngx-editor/commit/0310191))

## v3.1.0 (2017-11-25)

#### Features

- Reactive forms support for the editor ([ba350a83](https://github.com/sibiraj-s/ngx-editor/commit/ba350a8))

#### Breaking Changes

- use `ngModel` instead of `html` for HTML bindings ([ba350a83](https://github.com/sibiraj-s/ngx-editor/commit/ba350a8))

## v3.0.2 (2017-11-24)

#### Bug Fixes

- check `html` has been initialized (#17) ([ab0216b](https://github.com/sibiraj-s/ngx-editor/commit/ab0216b)). Thanks to @ssuperczynski

## v3.0.1 (2017-11-23)

#### Internal

- update to [@angular/cli v1.5.4](<[1d3e1b2](https://github.com/sibiraj-s/ngx-editor/commit/1d3e1b2)>)

#### Bug Fixes

- fix: default configuration not set onInit ([443c994](https://github.com/sibiraj-s/ngx-editor/commit/443c994))

<!-- Links -->

[@angular/cli v1.5.4]: https://github.com/angular/angular-cli/releases/tag/v1.5.4

## v3.0.0 (2017-11-23)

#### Bug Fixes

- fix HTML Model not updated after subscription on Observable ([84946ed](https://github.com/sibiraj-s/ngx-editor/commit/84946ed)), closes [#9](https://github.com/sibiraj-s/ngx-editor/issues/9)

#### Internal

- ngx-editor has been refactored. Thanks to @volodymyro-in6k (#11)
- update angular to v1.5.3 fixes a vulnerability warning due to older version of handlebars ([b707409](https://github.com/sibiraj-s/ngx-editor/commit/b707409))
- update [ng-packagr to v1.6.0](<[cd45428](https://github.com/sibiraj-s/ngx-editor/commit/cd45428)>)

<!-- Links -->

[ng-packagr to v1.6.0]: https://github.com/dherges/ng-packagr/blob/master/CHANGELOG.md#160-2017-11-14

## v2.0.1 (2017-11-07)

#### Internal

- update ng-packagr to [v1.5.0](https://github.com/dherges/ng-packagr/blob/master/CHANGELOG.md#150-2017-11-05) ([35fbb57](https://github.com/sibiraj-s/ngx-editor/commit/35fbb57))

## v2.0.0 (2017-11-02)

#### Performance

- update angular to [v5.0.0](https://github.com/angular/angular/blob/master/CHANGELOG.md#500-pentagonal-donut-2017-11-01) ([f12754b](https://github.com/sibiraj-s/ngx-editor/commit/f12754b))
- update bootstrap to [v4.0.0-beta.2](https://github.com/twbs/bootstrap/releases/tag/v4.0.0-beta.2) ([23adb5e](https://github.com/sibiraj-s/ngx-editor/commit/23adb5e))

## v1.2.1 (2017-10-25)

#### Bug Fixes

- downgrade dependency to avoid incompatibility ([45752bc](https://github.com/sibiraj-s/ngx-editor/commit/45752bc))
- update insert image query text ([2748cc3](https://github.com/sibiraj-s/ngx-editor/commit/2748cc3))

## v1.2.0 (2017-10-23)

#### Features

- option to insert/edit link ([63e401b](https://github.com/sibiraj-s/ngx-editor/commit/63e401b))
- option to edit link ([89389ab](https://github.com/sibiraj-s/ngx-editor/commit/89389ab))
- unlink anchor tag ([90f88a5](https://github.com/sibiraj-s/ngx-editor/commit/90f88a5))
- enable toolbar only when editor is focused ([b915d68](https://github.com/sibiraj-s/ngx-editor/commit/b915d68))

#### Internal

- update ng-packagr ([cebc696](https://github.com/sibiraj-s/ngx-editor/commit/cebc696))
- fix dependency mismatches with angular ([26a1a6d](https://github.com/sibiraj-s/ngx-editor/commit/26a1a6d))

#### Enhancements

- CSS Tweaks

#### Bug Fixes

- enable/disbale toolbar on focusing the editor ([8b2bb27](https://github.com/sibiraj-s/ngx-editor/commit/8b2bb27))

## v1.1.1 (2017-10-09)

#### Performance

- use unique CSS classes ([3ddc3b0](https://github.com/sibiraj-s/ngx-editor/commit/3ddc3b0))

## v1.1.0 (2017-10-09)

#### Features

- set `width` and `minWidth` to editor ([731f2fc](https://github.com/sibiraj-s/ngx-editor/commit/731f2fc))
- new resizer added ([864a5be](https://github.com/sibiraj-s/ngx-editor/commit/864a5be))

#### Enhancements

- remove units for zero value ([3978843](https://github.com/sibiraj-s/ngx-editor/commit/3978843))

## v1.0.0 (2017-10-06)

#### Performance

- improve value handling for attributes that hold boolean values ([8695873](https://github.com/sibiraj-s/ngx-editor/commit/8695873))
- better handling of default values ([7a40862](https://github.com/sibiraj-s/ngx-editor/commit/7a40862))

#### Features

- set `height` and `minHeight` for editror ([fdb1b30](https://github.com/sibiraj-s/ngx-editor/commit/fdb1b30))
- toolbar customization ([c6a2151](https://github.com/sibiraj-s/ngx-editor/commit/c6a2151))

#### DOCS

- get latest release direct from github ([b2ddf54](https://github.com/sibiraj-s/ngx-editor/commit/b2ddf54))
- add [wiki](https://github.com/sibiraj-s/ngx-editor/wiki/ngxEditor) ([da7d0c7](https://github.com/sibiraj-s/ngx-editor/commit/da7d0c7))

## v1.0.0-beta.3 (2017-10-03)

#### Bug Fixes

- undefined intialization in editor ([d17c1dd](https://github.com/sibiraj-s/ngx-editor/commit/d17c1dd))

#### Internal

- update angular to [v4.4.4](https://github.com/angular/angular/blob/master/CHANGELOG.md#444-2017-09-28) ([d99dff2](https://github.com/sibiraj-s/ngx-editor/commit/d99dff2))
- update ng-packagr to [v1.2.1](https://github.com/dherges/ng-packagr/blob/master/CHANGELOG.md#121-2017-09-29) ([d99dff2](https://github.com/sibiraj-s/ngx-editor/commit/d99dff2))

## v1.0.0-beta.2 (2017-10-02)

#### Features

- enable (or) disable HTML5 [translate](https://www.w3schools.com/tags/att_translate.asp) [An Experimental Option](<[af66d69](https://github.com/sibiraj-s/ngx-editor/commit/af66d69)>)
- enable (or) disable editable nature of editor ([4bff8e5](https://github.com/sibiraj-s/ngx-editor/commit/4bff8e5))

#### Enhancements

- remove unused fullscreen function ([af66d69](https://github.com/sibiraj-s/ngx-editor/commit/af66d69))
- `spellCheck` attribute renamed to `spellcheck` ([af66d69](https://github.com/sibiraj-s/ngx-editor/commit/af66d69))
- remove instructions from docs ([af66d69](https://github.com/sibiraj-s/ngx-editor/commit/af66d69))

#### Bug Fixes

- fix spellcheck attribute binding to editable area ([af66d69](https://github.com/sibiraj-s/ngx-editor/commit/af66d69))

## v1.0.0-beta.1 (2017-10-01)

#### Features

- bind HTML content with editor

## v1.0.0-alpha.3 (2017-10-01)

#### Changes

- update README
- update [demo](https://sibiraj-s.github.io/ngx-editor/)

## v1.0.0-alpha.2 (2017-09-28)

#### Tweaks

- remove font-awesome loaded by the module. Now font-awesome should be imported separately.

## v1.0.0-alpha.1 (2017-09-27)

#### Bug Fixes

- fixes setting default values for the editor

## v1.0.0-alpha (2017-09-27)

WYSIWYG Editor for Angular Applications.
