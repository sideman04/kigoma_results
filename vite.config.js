import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During development, requests to /api are forwarded to your PHP server
// (start it with:  php -S localhost:8000 -t public   inside your PHP project).
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
});
