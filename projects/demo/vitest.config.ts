import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    server: {
      deps: {
        // ships ESM with extensionless relative imports, which Node cannot resolve
        inline: ['prosemirror-codemirror-6'],
      },
    },
  },
});
