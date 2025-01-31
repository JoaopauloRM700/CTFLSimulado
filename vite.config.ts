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
  base: process.env.NODE_ENV === 'production' 
    ? '/CTFLSimulado/' 
    : '/', // Configuração dinâmica,
  build: {
    outDir: 'dist',
    emptyOutDir: true, 
  }
});