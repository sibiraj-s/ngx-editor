import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import react from '@astrojs/react';

const github = () => {
  /** @type {import('astro').AstroIntegration}} */
  const adapter = {
    name: 'github',
    hooks: {
      'astro:config:setup': ({ command, updateConfig }) => {
        if (command !== 'build') {
          return
        }

        updateConfig({
          base: '/ngx-editor/'
        })
      }
    },
  };

  return adapter
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    // Enable Preact to support Preact JSX components.
    preact(),
    // Enable React for the Algolia search component.
    react(),
  ],
  site: `https://sibiraj-s.github.io/ngx-editor`,
  outDir: './dist',
  publicDir: './public',
  srcDir: './src',
  trailingSlash: 'ignore',
  adapter: github()
});
