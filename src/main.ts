import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { i18n, initI18n } from '@/plugins/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)

initI18n()
  .then(() => {
    // AJOUT: Vérification post-initialisation
    console.log('Available locales:', i18n.global.availableLocales)
    console.log('French messages:', i18n.global.getLocaleMessage('fr'))
    console.log('English messages:', i18n.global.getLocaleMessage('en'))

    app.mount('#app')
  })
  .catch((error) => {
    console.error('Application initialization failed:', error)
    // Option: Afficher une UI d'erreur
    app.mount('#app')
  })
