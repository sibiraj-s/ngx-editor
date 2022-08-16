export const SITE = {
  title: 'NgxEditor',
  description: 'Rich text editor for angular',
  defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
  image: {
    src: 'https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true',
    alt:
      'astro logo on a starry expanse of space,'
      + ' with a purple saturn-like planet floating in the right foreground',
  },
  // twitter: 'astrodotbuild',
};

export const KNOWN_LANGUAGES = {
  English: 'en',
};

// Uncomment this to add an "Edit this page" button to every page of documentation.
export const GITHUB_EDIT_URL = 'https://github.com/sibiraj-s/ngx-editor/blob/master/docs/';

// Uncomment this to add an "Join our Community" button to every page of documentation.
// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   appId: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR = {
  en: [
    { text: 'Introduction', link: 'en/introduction' },
    { text: 'Quick Start', link: 'en/quickstart' },
    { text: 'Editor', link: 'en/editor' },
    { text: 'Configuration', link: 'en/configuration' },
    { text: 'Schema', link: 'en/schema' },
    { text: 'Commands', link: 'en/commands' },
    { text: 'Menu', link: 'en/menu' },
    { text: 'Convert JSON doc to HTML', link: 'en/doc-html-doc' },

    // examples
    { text: 'Examples', header: true },
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

    // migrations
    { text: 'Migrations', header: true },
    { text: 'From v4 or other editors to v5/v6', link: 'en/migrations/migration' },
    { text: 'v5 to v6', link: 'en/migrations/migration-5-6' },
    { text: 'v6 to v7', link: 'en/migrations/migration-6-7' },
    { text: 'v7 to v8', link: 'en/migrations/migration-7-8' },
    { text: 'v8 to v9', link: 'en/migrations/migration-8-9' },
  ],
};
