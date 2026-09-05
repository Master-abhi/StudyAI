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
        try {
          fs.copyFileSync(src, dest);
          console.log('[sync-root-index] Copied mcq-practice/index.html → public/index.html ✅');
        } catch (e: any) {
          try {
            const content = fs.readFileSync(src, 'utf-8');
            fs.writeFileSync(dest, content, 'utf-8');
            console.log('[sync-root-index] Written mcq-practice/index.html → public/index.html (via writeFileSync) ✅');
          } catch (err: any) {
            console.warn('[sync-root-index] Could not overwrite public/index.html:', err.message);
          }
        }
      }
      const apkSrc = path.resolve(__dirname, 'public/cgguru.apk');
      const apkDest = path.resolve(__dirname, '../public/cgguru.apk');
      if (fs.existsSync(apkSrc)) {
        try {
          fs.copyFileSync(apkSrc, apkDest);
          console.log('[sync-root-index] Synced cgguru.apk → public/cgguru.apk ✅');
        } catch (e: any) {
          console.warn('[sync-root-index] Could not sync cgguru.apk:', e.message);
        }
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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/framer-motion/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/katex/') || id.includes('node_modules/react-markdown/') || id.includes('node_modules/remark-math/') || id.includes('node_modules/rehype-katex/')) {
            return 'vendor-math';
          }
          if (id.includes('node_modules/mermaid/')) {
            return 'vendor-mermaid';
          }
        }
      }
    }
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
