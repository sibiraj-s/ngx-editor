import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://sibiraj-s.github.io',
  base: '/ngx-editor',
  integrations: [
    starlight({
      title: 'NgxEditor',
      description: 'The Rich Text Editor for Angular, Built on ProseMirror',
      logo: {
        src: '/src/assets/ngx-editor.svg',
      },
      customCss: process.env.NO_GRADIENTS ? [] : ['/src/assets/landing.css'],
      social: {
        github: 'https://github.com/sibiraj-s/ngx-editor',
      },
      editLink: {
        baseUrl: 'https://github.com/sibiraj-s/ngx-editor/tree/master/docs/',
      },
      pagination: true,
      lastUpdated: true,
      sidebar: [
        {
          label: '',
          items: [
            { label: 'Introduction', link: '/introduction' },
            { label: 'Quick Start', link: '/quickstart' },
            { label: 'Editor', link: '/editor' },
            { label: 'Configuration', link: '/configuration' },
            { label: 'Schema', link: '/schema' },
            { label: 'Commands', link: '/commands' },
            { label: 'Menu', link: '/menu' },
            { label: 'Convert JSON doc to HTML', link: '/doc-html-doc' },
          ],
        },
        {
          label: 'Examples',
          items: [
            { label: 'Full Featured Editor', link: '/examples/full-featured-editor' },
            { label: 'History', link: '/examples/history' },
            { label: 'Input Rules', link: '/examples/input-rules' },
            { label: 'Shortcuts', link: '/examples/shortcuts' },
            { label: 'Reactive Forms', link: '/examples/reactive-forms' },
            { label: 'NgModel Binding', link: '/examples/ng-model' },
            { label: 'Collaborative Editing', link: '/examples/collab' },
            { label: 'Floating Menu', link: '/examples/floating-menu' },
            { label: 'CodeMirror', link: '/examples/codemirror' },
            { label: 'Mentions & Tags', link: '/examples/mentions' },
          ],
        },
        {
          label: 'Migrations',
          items: [
            { label: 'From v4 or other editors to v5/v6', link: '/migrations/migration' },
            { label: 'v5 to v6', link: '/migrations/migration-5-6' },
            { label: 'v6 to v7', link: '/migrations/migration-6-7' },
            { label: 'v7 to v8', link: '/migrations/migration-7-8' },
            { label: 'v8 to v9', link: '/migrations/migration-8-9' },
          ],
        },
      ],
    }),
  ],
});
