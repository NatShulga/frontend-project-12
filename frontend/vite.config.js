import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        changeOrigin: true,
        secure: false,
        rewriteWsOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      external: [
        'leo-profanity',
        'i18next',
        'react-i18next',
        'i18next-browser-languagedetector',
        'i18next-http-backend',
        'react-toastify',
        'react-toastify/dist/ReactToastify.css'
      ]
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
});
