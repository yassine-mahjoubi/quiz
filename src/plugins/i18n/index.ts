import { createI18n } from 'vue-i18n'
//import { nextTick } from 'vue'

const DEFAULT_LOCALE = import.meta.env.VITE_I18N_DEFAULT_LOCALE || 'fr'
const FALLBACK_LOCALE = import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en'

// 1. Chargement statique des fichiers JSON
import frLocale from './fr.json'
import enLocale from './en.json'

const messages = {
  fr: frLocale,
  en: enLocale,
}
const supportedLocales = Object.keys(messages)
const getInitialLocale = () => {
  const savedLanguagePreference = localStorage.getItem('language-preference')
  if (savedLanguagePreference && supportedLocales.includes(savedLanguagePreference)) {
    return savedLanguagePreference
  }
  const browserLanguage = navigator.language.split('-')[0]
  if (browserLanguage && supportedLocales.includes(browserLanguage)) {
    return browserLanguage
  }
  return DEFAULT_LOCALE
}
const initiallocale = getInitialLocale()
document.documentElement.lang = initiallocale

const i18n = createI18n({
  legacy: false,
  locale: initiallocale,
  fallbackLocale: FALLBACK_LOCALE,
  messages: messages,
  globalInjection: true,
})

export default i18n
