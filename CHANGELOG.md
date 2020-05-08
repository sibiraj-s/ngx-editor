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

## v5.0.0-alpha.5 (2020-05-08)

#### Features

- add support for prosemirror plugins ([fcdc39b](https://github.com/Sibiraj-S/ngx-editor/commit/fcdc39b))

#### Breaking Changes

- placeholder and config property is replaced with plugins

```ts
import { menu, placeholder } from "ngx-editor";

NgxEditorModule.forRoot({
  plugins: [menu(), placholder("Type something here...")],
});
```

- shortcuts needs to be configured manually using plugins
- removed peerDependencies `prosemirror-history` and `prosemirror-keymap`

## v5.0.0-alpha.4 (2020-05-05)

#### Features

- add support for headings ([2d7d38e](https://github.com/Sibiraj-S/ngx-editor/commit/2d7d38e))

## v5.0.0-alpha.3 (2020-05-04)

#### Features

- add support for list ([274dcc7](https://github.com/Sibiraj-S/ngx-editor/commit/274dcc7))

#### Breaking Changes

- prosemirror `peerDependencies` are no longer needed ([274dcc7](https://github.com/Sibiraj-S/ngx-editor/commit/274dcc7))

## v5.0.0-alpha.2 (2020-04-30)

#### Bug Fixes

- fix issues with custom config ([613ec52](https://github.com/Sibiraj-S/ngx-editor/commit/613ec52))
- remove empty DOM wrapper around the editor ([5f176e1](https://github.com/Sibiraj-S/ngx-editor/commit/5f176e1))

## v5.0.0-alpha.1 (2020-04-23)

#### Breaking Changes

- fix issues with ivy compiler ([30b513c](https://github.com/Sibiraj-S/ngx-editor/commit/30b513c))

#### Enhancements

- remove unwanted dependencies ([94374c4](https://github.com/Sibiraj-S/ngx-editor/commit/94374c4))

## v5.0.0-alpha (2020-04-22)

The package is entirely rewritten with prosemirror as default editor. Most of the options are removed and will be added eventually in upcoming releases.

#### Features

- use prosemirror as default editor ([f17d0ef](https://github.com/Sibiraj-S/ngx-editor/commit/f17d0ef))

#### Breaking Changes

- remove `app` prefix from the component ([bbe3daa](https://github.com/Sibiraj-S/ngx-editor/commit/bbe3daa))
- upgrade to angular 9 ([b280769](https://github.com/Sibiraj-S/ngx-editor/commit/b280769))

#### Internal

- migrate from travis-ci to github actions ([2afb2ec](https://github.com/Sibiraj-S/ngx-editor/commit/2afb2ec))
- update devDependencies ([fd3ee1a](https://github.com/Sibiraj-S/ngx-editor/commit/fd3ee1a))

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

- update unclear prerequisites in README ([1c316cb](https://github.com/Sibiraj-S/ngx-editor/commit/1c316cb)), closes [#92](https://github.com/sibiraj-s/ngx-editor/issues/92)

#### Enhancements

- update ngx-bootstrap ([eed8aaa](https://github.com/Sibiraj-S/ngx-editor/commit/eed8aaa))

#### Internal

- update compodoc ([47f34ad](https://github.com/Sibiraj-S/ngx-editor/commit/47f34ad))
- update bootstrap ([ee1555b](https://github.com/Sibiraj-S/ngx-editor/commit/ee1555b))
- update ng-packagr ([b174a14](https://github.com/Sibiraj-S/ngx-editor/commit/b174a14))

#### Breaking Changes

- remove code-editor support ([24b92e0](https://github.com/Sibiraj-S/ngx-editor/commit/24b92e0))

## v3.3.0-rc.13 (2018-03-14)

#### Features

- auto-focus while switching to code-editor mode ([1ed938e](https://github.com/Sibiraj-S/ngx-editor/commit/1ed938e)), closes [#79](https://github.com/sibiraj-s/ngx-editor/issues/79)
- show placeholder in code editor ([bae2216](https://github.com/Sibiraj-S/ngx-editor/commit/bae2216))
- option to insert video link/ youtube urls ([e074c7a](https://github.com/Sibiraj-S/ngx-editor/commit/e074c7a)), closes [#72](https://github.com/sibiraj-s/ngx-editor/issues/72)
- option to set font family ([1248db7](https://github.com/Sibiraj-S/ngx-editor/commit/1248db7)), closes [#72](https://github.com/sibiraj-s/ngx-editor/issues/72)

#### Internal

- remove dead code which used to enable or disable toolbar ([00adda2](https://github.com/Sibiraj-S/ngx-editor/commit/00adda2))

#### DEPENDENCY UPDATE

- update dependencies in package-lock file to latest satisfying version ([f62d945](https://github.com/Sibiraj-S/ngx-editor/commit/f62d945))

## v3.3.0-rc.12 (2018-03-11)

#### Features

- support TAB key to focus the editor's text-area ([8e3e65b](https://github.com/Sibiraj-S/ngx-editor/commit/8e3e65b)), closes [#79](https://github.com/sibiraj-s/ngx-editor/issues/79)

#### Bug Fixes

- don't return from writeValue ([36133e1](https://github.com/Sibiraj-S/ngx-editor/commit/36133e1)), closes [#78](https://github.com/sibiraj-s/ngx-editor/issues/78)

#### Performance

- remove unused imports/variables ([182152a](https://github.com/Sibiraj-S/ngx-editor/commit/182152a))

#### DEPENDENCY UPDATES

- update angular-cli to v1.7.3 ([0f94d1e](https://github.com/Sibiraj-S/ngx-editor/commit/0f94d1e))
- update compodoc to v1.0.9 ([a9262c2](https://github.com/Sibiraj-S/ngx-editor/commit/a9262c2))

## v3.3.0-rc.11 (2018-03-06)

#### Bug Fixes

- use codemirror's `htmlMixed` mode instead of `xml` mode ([fbf9d1d](https://github.com/Sibiraj-S/ngx-editor/commit/fbf9d1d))

#### Internal

- remove redundant karma-cli ([df192b](https://github.com/Sibiraj-S/ngx-editor/commit/df192b))

#### DEPENDENCY UPDATES

- update angular-cli to v1.7.2 ([87bb04e](https://github.com/Sibiraj-S/ngx-editor/commit/87bb04e))
- update compodoc to v1.0.8 ([47d5ba4](https://github.com/Sibiraj-S/ngx-editor/commit/47d5ba4))
- update ng-packagr to v2.2.0 ([ba86da6](https://github.com/Sibiraj-S/ngx-editor/commit/ba86da6))

## v3.3.0-rc.10 (2018-02-27)

#### Bug Fixes

- don't override default styles ([5beee77](https://github.com/Sibiraj-S/ngx-editor/commit/5beee77)), closes [#68](https://github.com/sibiraj-s/ngx-editor/issues/68)

## v3.3.0-rc.9 (2018-02-26)

#### Features

- **style** - highlight active tabs in popover ([0b7dd99](https://github.com/Sibiraj-S/ngx-editor/commit/0b7dd99))
- option to set `font color` and `background color` ([a983fd4](https://github.com/Sibiraj-S/ngx-editor/commit/a983fd4)), closes [#65](https://github.com/sibiraj-s/ngx-editor/issues/65)
- option to set `font-size` ([f49e477](https://github.com/Sibiraj-S/ngx-editor/commit/f49e477)), closes [#31](https://github.com/sibiraj-s/ngx-editor/issues/31)

#### Bug Fixes

- **style** - center align popover arrow ([2a13ca0](https://github.com/Sibiraj-S/ngx-editor/commit/2a13ca0))

#### Internal

- udpate devDependencies ([4fddfac](https://github.com/Sibiraj-S/ngx-editor/commit/4fddfac))

## v3.3.0-rc.8 (2018-02-22)

#### Bug Fixes

- fix: links inserted twice ([97398ee](https://github.com/Sibiraj-S/ngx-editor/commit/97398ee)), closes [#61](https://github.com/sibiraj-s/ngx-editor/issues/61)

## v3.3.0-rc.7 (2018-02-21)

#### Enhancements

- remove bootstrap from `peerDependency` ([8aa0ffd](https://github.com/Sibiraj-S/ngx-editor/commit/8aa0ffd))

## v3.3.0-rc.6 (2018-02-20)

#### Bug Fixes

- fix a typo in toolbar ([367474f](https://github.com/Sibiraj-S/ngx-editor/commit/367474f))

#### Enhancements

- added new peer dependencies ([683bbee](https://github.com/Sibiraj-S/ngx-editor/commit/683bbee))
- updated docs ([57e4056](https://github.com/Sibiraj-S/ngx-editor/commit/57e4056))

## v3.3.0-rc.5 (2018-02-19)

#### Features

- option to open URL in new tab ([d4001c4](https://github.com/Sibiraj-S/ngx-editor/commit/d4001c4))
- option to upload images from local filesystem ([09b69b5](https://github.com/Sibiraj-S/ngx-editor/commit/09b69b5)), closes [#34](https://github.com/sibiraj-s/ngx-editor/issues/34)

#### Internal

- documentation compiled with compodoc v1.0.7

## v3.3.0-rc.4 (2018-02-08)

#### Internal

- update ng-packager to v2.0.0

## v3.3.0-rc.3 (2018-02-05)

#### Bug Fixes

- remove border for toolbar if hidden ([4eef077](https://github.com/Sibiraj-S/ngx-editor/commit/4eef077)), closes [#43](https://github.com/sibiraj-s/ngx-editor/issues/43)
- placeholder gets duplicated if a page has more than one editor ([cdfd4bc](https://github.com/Sibiraj-S/ngx-editor/commit/cdfd4bc)), closes [#44](https://github.com/sibiraj-s/ngx-editor/issues/44)
- ngModel binding does not reflects in editor's textarea ([4f4967a](https://github.com/Sibiraj-S/ngx-editor/commit/4f4967a)), closes [#45](https://github.com/sibiraj-s/ngx-editor/issues/45)

#### Changes

- update peerDependency codemirror to v5.34.0 ([6012283](https://github.com/Sibiraj-S/ngx-editor/commit/6012283))

#### Internal

- update devDependencies ([6012283](https://github.com/Sibiraj-S/ngx-editor/commit/6012283))

## v3.3.0-rc.2 (2018-01-19)

#### Bug Fixes

- fix: add missing xml parser for code-mirror ([1078c69](https://github.com/Sibiraj-S/ngx-editor/commit/1078c69))

## v3.3.0-rc.1 (2018-01-19)

#### Bug Fixes

- fix error in exporting codemirror ([9f0e19d](https://github.com/Sibiraj-S/ngx-editor/commit/9f0e19d)), closes [#40](https://github.com/sibiraj-s/ngx-editor/issues/40)

#### Internal

- update ng-packagr to v2.0.0-rc.11 ([9f0e19d](https://github.com/Sibiraj-S/ngx-editor/commit/9f0e19d))

#### Documentation

- update additional docs ([9f0e19d](https://github.com/Sibiraj-S/ngx-editor/commit/9f0e19d))
- removed wiki

## v3.3.0-rc.0 (2018-01-19)

#### Features

- added event-emitter to emit `blur` and `focus` events ([2ed79b8](https://github.com/Sibiraj-S/ngx-editor/commit/2ed79b8))
- added option to view/edit plain `HTML` code ([2ed79b8](https://github.com/Sibiraj-S/ngx-editor/commit/2ed79b8)), closes [#26](https://github.com/sibiraj-s/ngx-editor/issues/26)

#### Internal

- update angular-cli to v1.6.5 ([2ed79b8](https://github.com/Sibiraj-S/ngx-editor/commit/2ed79b8))
- update devDependencies ([2ed79b8](https://github.com/Sibiraj-S/ngx-editor/commit/2ed79b8))

#### Documentation

- docs autogenerated using [compodoc](<[2ed79b8](https://github.com/Sibiraj-S/ngx-editor/commit/2ed79b8)>)

<!-- LINKS -->

[compodoc]: https://compodoc.github.io/website/mpodoc

## v3.2.1 (2017-12-19)

#### Bug Fixes

- add button types to toolbar to avoid firing `submit` while using in reactive forms ([d4ccc79](https://github.com/Sibiraj-S/ngx-editor/commit/d4ccc79))

#### Enhancements

- lighten placeholder color ([27ccd72](https://github.com/Sibiraj-S/ngx-editor/commit/27ccd72))

## v3.2.0 (2017-12-14)

#### Features

- enable or disable toolbar ([0a915f5](https://github.com/Sibiraj-S/ngx-editor/commit/0a915f5))

#### Bug Fixes

- fix: horizontal overflow in editor ([0a915f5](https://github.com/Sibiraj-S/ngx-editor/commit/0a915f5))
- minor style tweaks ([4390502](https://github.com/Sibiraj-S/ngx-editor/commit/4390502))

## v3.1.2 (2017-12-05)

#### Bug Fixes

- remove methods that are not supported by Internet Explorer ([7be2fd6](https://github.com/Sibiraj-S/ngx-editor/commit/7be2fd6))
- fix `grippie` svg not centre aligned in Internet Explorer ([c87c5e4](https://github.com/Sibiraj-S/ngx-editor/commit/c87c5e4))
- fix inputs not replacing configuration ([dabac4c](https://github.com/Sibiraj-S/ngx-editor/commit/dabac4c))

#### Internal

- update to [@angular/cli v1.5.5](<[9aabe1c](https://github.com/Sibiraj-S/ngx-editor/commit/9aabe1c)>)

<!-- LINKS -->

[@angular/cli v1.5.5]: https://github.com/angular/angular-cli/releases/tag/v1.5.5

## v3.1.1 (2017-11-28)

#### Internal

- move dependencies to peerDependencies ([0310191](https://github.com/Sibiraj-S/ngx-editor/commit/0310191))

## v3.1.0 (2017-11-25)

#### Features

- Reactive forms support for the editor ([ba350a83](https://github.com/Sibiraj-S/ngx-editor/commit/ba350a8))

#### Breaking Changes

- use `ngModel` instead of `html` for HTML bindings ([ba350a83](https://github.com/Sibiraj-S/ngx-editor/commit/ba350a8))

## v3.0.2 (2017-11-24)

#### Bug Fixes

- check `html` has been initialized (#17) ([ab0216b](https://github.com/Sibiraj-S/ngx-editor/commit/ab0216b)). Thanks to @ssuperczynski

## v3.0.1 (2017-11-23)

#### Internal

- update to [@angular/cli v1.5.4](<[1d3e1b2](https://github.com/Sibiraj-S/ngx-editor/commit/1d3e1b2)>)

#### Bug Fixes

- fix: default configuration not set onInit ([443c994](https://github.com/Sibiraj-S/ngx-editor/commit/443c994))

<!-- Links -->

[@angular/cli v1.5.4]: https://github.com/angular/angular-cli/releases/tag/v1.5.4

## v3.0.0 (2017-11-23)

#### Bug Fixes

- fix HTML Model not updated after subscription on Observable ([84946ed](https://github.com/Sibiraj-S/ngx-editor/commit/84946ed)), closes [#9](https://github.com/sibiraj-s/ngx-editor/issues/9)

#### Internal

- ngx-editor has been refactored. Thanks to @volodymyro-in6k (#11)
- update angular to v1.5.3 fixes a vulnerability warning due to older version of handlebars ([b707409](https://github.com/Sibiraj-S/ngx-editor/commit/b707409))
- update [ng-packagr to v1.6.0](<[cd45428](https://github.com/Sibiraj-S/ngx-editor/commit/cd45428)>)

<!-- Links -->

[ng-packagr to v1.6.0]: https://github.com/dherges/ng-packagr/blob/master/CHANGELOG.md#160-2017-11-14

## v2.0.1 (2017-11-07)

#### Internal

- update ng-packagr to [v1.5.0](https://github.com/dherges/ng-packagr/blob/master/CHANGELOG.md#150-2017-11-05) ([35fbb57](https://github.com/Sibiraj-S/ngx-editor/commit/35fbb57))

## v2.0.0 (2017-11-02)

#### Performance

- update angular to [v5.0.0](https://github.com/angular/angular/blob/master/CHANGELOG.md#500-pentagonal-donut-2017-11-01) ([f12754b](https://github.com/Sibiraj-S/ngx-editor/commit/f12754b))
- update bootstrap to [v4.0.0-beta.2](https://github.com/twbs/bootstrap/releases/tag/v4.0.0-beta.2) ([23adb5e](https://github.com/Sibiraj-S/ngx-editor/commit/23adb5e))

## v1.2.1 (2017-10-25)

#### Bug Fixes

- downgrade dependency to avoid incompatibility ([45752bc](https://github.com/Sibiraj-S/ngx-editor/commit/45752bc))
- update insert image query text ([2748cc3](https://github.com/Sibiraj-S/ngx-editor/commit/2748cc3))

## v1.2.0 (2017-10-23)

#### Features

- option to insert/edit link ([63e401b](https://github.com/Sibiraj-S/ngx-editor/commit/63e401b))
- option to edit link ([89389ab](https://github.com/Sibiraj-S/ngx-editor/commit/89389ab))
- unlink anchor tag ([90f88a5](https://github.com/Sibiraj-S/ngx-editor/commit/90f88a5))
- enable toolbar only when editor is focused ([b915d68](https://github.com/Sibiraj-S/ngx-editor/commit/b915d68))

#### Internal

- update ng-packagr ([cebc696](https://github.com/Sibiraj-S/ngx-editor/commit/cebc696))
- fix dependency mismatches with angular ([26a1a6d](https://github.com/Sibiraj-S/ngx-editor/commit/26a1a6d))

#### Enhancements

- CSS Tweaks

#### Bug Fixes

- enable/disbale toolbar on focusing the editor ([8b2bb27](https://github.com/Sibiraj-S/ngx-editor/commit/8b2bb27))

## v1.1.1 (2017-10-09)

#### Performance

- use unique CSS classes ([3ddc3b0](https://github.com/Sibiraj-S/ngx-editor/commit/3ddc3b0))

## v1.1.0 (2017-10-09)

#### Features

- set `width` and `minWidth` to editor ([731f2fc](https://github.com/Sibiraj-S/ngx-editor/commit/731f2fc))
- new resizer added ([864a5be](https://github.com/Sibiraj-S/ngx-editor/commit/864a5be))

#### Enhancements

- remove units for zero value ([3978843](https://github.com/Sibiraj-S/ngx-editor/commit/3978843))

## v1.0.0 (2017-10-06)

#### Performance

- improve value handling for attributes that hold boolean values ([8695873](https://github.com/Sibiraj-S/ngx-editor/commit/8695873))
- better handling of default values ([7a40862](https://github.com/Sibiraj-S/ngx-editor/commit/7a40862))

#### Features

- set `height` and `minHeight` for editror ([fdb1b30](https://github.com/Sibiraj-S/ngx-editor/commit/fdb1b30))
- toolbar customization ([c6a2151](https://github.com/Sibiraj-S/ngx-editor/commit/c6a2151))

#### DOCS

- get latest release direct from github ([b2ddf54](https://github.com/Sibiraj-S/ngx-editor/commit/b2ddf54))
- add [wiki](https://github.com/Sibiraj-S/ngx-editor/wiki/ngxEditor) ([da7d0c7](https://github.com/Sibiraj-S/ngx-editor/commit/da7d0c7))

## v1.0.0-beta.3 (2017-10-03)

#### Bug Fixes

- undefined intialization in editor ([d17c1dd](https://github.com/Sibiraj-S/ngx-editor/commit/d17c1dd))

#### Internal

- update angular to [v4.4.4](https://github.com/angular/angular/blob/master/CHANGELOG.md#444-2017-09-28) ([d99dff2](https://github.com/Sibiraj-S/ngx-editor/commit/d99dff2))
- update ng-packagr to [v1.2.1](https://github.com/dherges/ng-packagr/blob/master/CHANGELOG.md#121-2017-09-29) ([d99dff2](https://github.com/Sibiraj-S/ngx-editor/commit/d99dff2))

## v1.0.0-beta.2 (2017-10-02)

#### Features

- enable (or) disable HTML5 [translate](https://www.w3schools.com/tags/att_translate.asp) [An Experimental Option](<[af66d69](https://github.com/Sibiraj-S/ngx-editor/commit/af66d69)>)
- enable (or) disable editable nature of editor ([4bff8e5](https://github.com/Sibiraj-S/ngx-editor/commit/4bff8e5))

#### Enhancements

- remove unused fullscreen function ([af66d69](https://github.com/Sibiraj-S/ngx-editor/commit/af66d69))
- `spellCheck` attribute renamed to `spellcheck` ([af66d69](https://github.com/Sibiraj-S/ngx-editor/commit/af66d69))
- remove instructions from docs ([af66d69](https://github.com/Sibiraj-S/ngx-editor/commit/af66d69))

#### Bug Fixes

- fix spellcheck attribute binding to editable area ([af66d69](https://github.com/Sibiraj-S/ngx-editor/commit/af66d69))

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
