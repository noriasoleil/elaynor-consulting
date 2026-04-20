import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

function safePublicCopy(): Plugin {
  return {
    name: 'safe-public-copy',
    apply: 'build',
    closeBundle() {
      const publicDir = path.resolve(__dirname, 'public');
      const outDir = path.resolve(__dirname, 'dist');
      const entries = fs.readdirSync(publicDir);
      for (const entry of entries) {
        const src = path.join(publicDir, entry);
        const dest = path.join(outDir, entry);
        try {
          fs.accessSync(src, fs.constants.R_OK);
          if (!fs.existsSync(dest)) {
            fs.copyFileSync(src, dest);
          }
        } catch {
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), safePublicCopy()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  publicDir: 'public',
});
