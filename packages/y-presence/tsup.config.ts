import { replace } from 'esbuild-plugin-replace';
import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  tsconfig: './tsconfig.json',
  target: 'es2018',
  minify: false,
  minifySyntax: true,
  minifyWhitespace: false,
  minifyIdentifiers: true,
  clean: true,
  dts: true,
  esbuildPlugins: [
    replace({
      'use-sync-external-store/shim/with-selector':
      'use-sync-external-store/shim/with-selector.js',
    })
  ]
})
