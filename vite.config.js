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
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
      output: {
        manualChunks: {
          'rapier': ['@dimforge/rapier3d-compat'],
          'three': ['three'],
        }
      }
    },
    assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.bin', '**/*.jpg', '**/*.png', '**/*.svg', '**/*.ico'],
    target: ['esnext'],
  },
  optimizeDeps: {
    exclude: ['@dimforge/rapier3d-compat'],
  },
});