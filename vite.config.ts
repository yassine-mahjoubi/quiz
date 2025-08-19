import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  base: process.env.NODE_ENV === 'production' ? '/quiz/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  /* server: {
    proxy: {
      // On intercepte toutes les requêtes qui commencent par
      '/api': {
        // On les redirige vers le vrai serveur
        target: 'https://picocss.com',
        // Nécessaire pour que le proxy fonctionne avec HTTPS
        changeOrigin: true,
        // On retire le '/api' de l'URL avant de l'envoyer
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }, */
})
