import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const defineBasePath = () => {
  // Netlify définit cette variable lors du build, le chemin need to starts '/'
  if (process.env.NETLIFY) return '/'
  // sinon '/quiz/ pour heberger sur githubPages
  return 'quiz'
}

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  base: defineBasePath(),
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
