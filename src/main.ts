import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from '@/plugins/i18n'
import { createHead } from '@unhead/vue'

const head = createHead()

const app = createApp(App)

app.use(createPinia()).use(router).use(head).use(i18n).mount('#app')
