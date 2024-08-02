import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',
  base: '/My-Portfolio/',
  plugins: [
    wasm(),
    topLevelAwait()
  ],
  build: {
    outDir: '../dist', // Output directory relative to the root
    emptyOutDir: true, // Clears the output directory before building
    rollupOptions: {
      // Custom rollup options can be specified here
    },
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit if needed
  },
})
