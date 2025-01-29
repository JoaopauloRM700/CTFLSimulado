import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  json: {
    namedExports: true,
    stringify: false
  },
  base: "/CTFLSimulado/", // Corrige caminhos no GitHub Pages
  build: {
    outDir: "dist",
  },
  server: {
    host: "0.0.0.0", // Permite acesso externo ao container
    port: 4173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});

