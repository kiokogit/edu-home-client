import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'service-worker.js',
      manifest: false,
      includeAssets: ['favicon-32x32.png', 'icon-192x192.png', 'icon-512x512.png'],
      workbox: {
        navigateFallback: '/index.html'
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.NEXT_PUBLIC_DJANGO_API_URL || 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})
