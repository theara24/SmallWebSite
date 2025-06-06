import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    {
      name: 'rewrite-ts-imports',
      enforce: 'pre',
      transform(code, id) {
        if (id.endsWith('.html')) {
          return code.replace(/\.ts/g, '.js');
        }
      },
    },
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
});
