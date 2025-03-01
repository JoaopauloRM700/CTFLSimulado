import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      overlay: false
    }
  },
  base: process.env.VITE_BASE_PATH || '/CTFLSimulado', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});