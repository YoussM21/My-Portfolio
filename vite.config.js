import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',
  plugins: [
    wasm(),
    topLevelAwait(),
    viteStaticCopy({
      targets: [
        {
          src: '../static/assets/**/*',
          dest: 'assets/'
        },
        {
          src: '../static/draco/**/*',
          dest: 'draco/'
        },
        {
          src: '../static/models/**/*',
          dest: 'models/'
        }
      ]
    })
  ],
  build: {
    outDir: '../dist/',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
    assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.bin', '**/*.jpg', '**/*.png', '**/*.svg', '**/*.ico'] // Add any other asset types you're using
  },
});