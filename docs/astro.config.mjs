import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'NgxEditor',
      description: 'The Rich Text Editor for Angular, Built on ProseMirror',
      defaultLocale: 'root',
      locales: {
        en: {
          label: 'English',
          lang: 'en',
        },
      },
      logo: {
        src: '/src/assets/ang_edit_32.png',
      },
      customCss: process.env.NO_GRADIENTS ? [] : ['/src/assets/landing.css'],
      social: {
        github: 'https://github.com/sibiraj-s/ngx-editor',
      },
      editLink: {
        baseUrl: 'https://github.com/sibiraj-s/ngx-editor/tree/master/docs/',
      },
      sidebar: [
        {
          label: '',
          items: [
            { label: 'Introduction', link: 'en/introduction' },
            { label: 'Quick Start', link: 'en/quickstart' },
            { label: 'Editor', link: 'en/editor' },
            { label: 'Configuration', link: 'en/configuration' },
            { label: 'Schema', link: 'en/schema' },
            { label: 'Commands', link: 'en/commands' },
            { label: 'Menu', link: 'en/menu' },
            { label: 'Convert JSON doc to HTML', link: 'en/doc-html-doc' },
          ],
        },
        {
          label: 'Examples',
          items: [
            { label: 'Full Featured Editor', link: 'en/examples/full-featured-editor' },
            { label: 'History', link: 'en/examples/history' },
            { label: 'Input Rules', link: 'en/examples/input-rules' },
            { label: 'Shortcuts', link: 'en/examples/shortcuts' },
            { label: 'Reactive Forms', link: 'en/examples/reactive-forms' },
            { label: 'NgModel Binding', link: 'en/examples/ng-model' },
            { label: 'Collaborative Editing', link: 'en/examples/collab' },
            { label: 'Floating Menu', link: 'en/examples/floating-menu' },
            { label: 'CodeMirror', link: 'en/examples/codemirror' },
            { label: 'Mentions & Tags', link: 'en/examples/mentions' },
          ],
        },
        {
          label: 'Migrations',
          items: [
            { label: 'From v4 or other editors to v5/v6', link: 'en/migrations/migration' },
            { label: 'v5 to v6', link: 'en/migrations/migration-5-6' },
            { label: 'v6 to v7', link: 'en/migrations/migration-6-7' },
            { label: 'v7 to v8', link: 'en/migrations/migration-7-8' },
            { label: 'v8 to v9', link: 'en/migrations/migration-8-9' },
          ]
        }
      ],
    }),
  ],
});
