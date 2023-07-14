import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),

  VitePWA({
    registerType: 'prompt',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'android-chrome-192x192.png', 'android-chrome-512x512.png'],
    manifest: {
      name: 'koshalFabrics',
      short_name: 'kF',
      description: 'We are a sambalpuri saree selling company',
      theme_color: '#ffffff',
      start_url: '/public',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  })
  ],
})
