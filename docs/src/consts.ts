export const SITE = {
  title: 'NgxEditor',
  description: 'Rich text editor for angular',
  defaultLanguage: 'en-us',
} as const;

export const OPEN_GRAPH = {
  image: {
    src: 'https://github.com/sibiraj-s/ngx-editor/blob/master/sketch/ngx-editor.png?raw=true',
    alt: 'Rich text editor for angular',
  },
  // twitter: '',
};

export const KNOWN_LANGUAGES = {
  English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_URL = 'https://github.com/sibiraj-s/ngx-editor';
export const GITHUB_EDIT_URL = `${GITHUB_URL}/blob/master/docs/`;

export type Sidebar = Record<(typeof KNOWN_LANGUAGE_CODES)[number], Record<string, { text: string; link: string }[]>>;
export const SIDEBAR: Sidebar = {
  en: {
    '': [
      { text: 'Introduction', link: 'en/introduction' },
      { text: 'Quick Start', link: 'en/quickstart' },
      { text: 'Editor', link: 'en/editor' },
      { text: 'Configuration', link: 'en/configuration' },
      { text: 'Schema', link: 'en/schema' },
      { text: 'Commands', link: 'en/commands' },
      { text: 'Menu', link: 'en/menu' },
      { text: 'Convert JSON doc to HTML', link: 'en/doc-html-doc' },
    ],
    'Examples': [
      { text: 'Full Featured Editor', link: 'en/examples/full-featured-editor' },
      { text: 'History', link: 'en/examples/history' },
      { text: 'Input Rules', link: 'en/examples/input-rules' },
      { text: 'Shortcuts', link: 'en/examples/shortcuts' },
      { text: 'Reactive Forms', link: 'en/examples/reactive-forms' },
      { text: 'NgModel Binding', link: 'en/examples/ng-model' },
      { text: 'Collaborative Editing', link: 'en/examples/collab' },
      { text: 'Floating Menu', link: 'en/examples/floating-menu' },
      { text: 'CodeMirror', link: 'en/examples/codemirror' },
      { text: 'Mentions & Tags', link: 'en/examples/mentions' },
    ],
    'Migrations': [
      { text: 'From v4 or other editors to v5/v6', link: 'en/migrations/migration' },
      { text: 'v5 to v6', link: 'en/migrations/migration-5-6' },
      { text: 'v6 to v7', link: 'en/migrations/migration-6-7' },
      { text: 'v7 to v8', link: 'en/migrations/migration-7-8' },
      { text: 'v8 to v9', link: 'en/migrations/migration-8-9' },
    ],
  },
};
