import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from '@/plugins/i18n'

const app = createApp(App)

app.use(createPinia()).use(i18n).mount('#app')
