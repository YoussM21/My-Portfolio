import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { resolve } from 'path'; // Import the resolve function

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',  // This specifies your static directory relative to the config file
  plugins: [
    wasm(),
    topLevelAwait()
  ],
  build: {
    outDir: '../dist',  // Ensures output is placed in the dist folder at the project root
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
      // Ensure static assets are treated properly
      assetsInclude: ['**/*.glb']  // Include GLB files explicitly if necessary
    },
    chunkSizeWarningLimit: 1000,
  },
});
