import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 👈 ab @ ka matlab hamesha src folder hoga
    },
  },
  server: {
    host: true,
    port: 8080,
    open: true, // Auto open browser
    cors: true,
    hmr: {
      overlay: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8090', // 👈 yaha backend ka URL daal
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
