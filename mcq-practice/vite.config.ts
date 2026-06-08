import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Plugin: after build, copy the generated public/mcq-practice/index.html → public/index.html
// This keeps the root index.html in sync with the latest bundle hashes automatically.
function syncRootIndexPlugin() {
  return {
    name: 'sync-root-index',
    closeBundle() {
      const src = path.resolve(__dirname, '../public/mcq-practice/index.html');
      const dest = path.resolve(__dirname, '../public/index.html');
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log('[sync-root-index] Copied mcq-practice/index.html → public/index.html ✅');
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), syncRootIndexPlugin()],
  base: '/mcq-practice/',
  build: {
    outDir: '../public/mcq-practice',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
