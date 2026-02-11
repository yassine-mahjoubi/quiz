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
})
