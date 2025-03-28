import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: '#MOVIENOW',
        short_name: 'MOVIENOW',
        description: 'Список фильмов',
        theme_color: '#f62828',
        background_color: '#363232',
        display: 'standalone',
        icons: [
          {
            src: '/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/mashroom-movies-api\.netlify\.app\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'movie-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@commons': path.resolve(__dirname, 'src/components/commons'),
      '@pages': path.resolve(__dirname, 'src/components/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@HomePage': path.resolve(__dirname, 'src/components/pages/HomePage'),
      '@FilmNotFoundPage': path.resolve(__dirname, 'src/components/pages/FilmNotFoundPage'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/styles/global" as *;`,
      },
    },
  },
});
