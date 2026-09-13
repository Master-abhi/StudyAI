import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Plugin: after build, copy the generated public/mcq-practice/index.html → public/index.html
// This keeps the root index.html in sync with the latest bundle hashes automatically.
function syncRootIndexPlugin() {
  const safeCopy = (src: string, dest: string, maxAttempts = 5) => {
    if (!fs.existsSync(src)) return;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        fs.copyFileSync(src, dest);
        return true;
      } catch (err: any) {
        try {
          const content = fs.readFileSync(src);
          fs.writeFileSync(dest, content);
          return true;
        } catch (_) {}
        if (attempt === maxAttempts) {
          console.warn(`[sync-root-index] Could not copy ${path.basename(dest)}:`, err.message);
          return false;
        }
        const waitTill = Date.now() + 100 * attempt;
        while (Date.now() < waitTill) {}
      }
    }
  };

  return {
    name: 'sync-root-index',
    closeBundle() {
      const src = path.resolve(__dirname, '../public/mcq-practice/index.html');
      const dest = path.resolve(__dirname, '../public/index.html');
      if (safeCopy(src, dest)) {
        console.log('[sync-root-index] Synced mcq-practice/index.html → public/index.html ✅');
      }

      const apkSrc = path.resolve(__dirname, 'public/cgguru.apk');
      const apkDest = path.resolve(__dirname, '../public/cgguru.apk');
      if (safeCopy(apkSrc, apkDest)) {
        console.log('[sync-root-index] Synced cgguru.apk → public/cgguru.apk ✅');
      }

      const fontsSrc = path.resolve(__dirname, 'public/fonts');
      const fontsDest = path.resolve(__dirname, '../public/fonts');
      if (fs.existsSync(fontsSrc)) {
        try {
          fs.cpSync(fontsSrc, fontsDest, { recursive: true });
          console.log('[sync-root-index] Synced fonts → public/fonts ✅');
        } catch (e: any) {
          console.warn('[sync-root-index] Could not sync fonts:', e.message);
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
