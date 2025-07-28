/**
 *
 */

import { createI18n } from 'vue-i18n'
// Chargement statique des fichiers JSON
import frLocale from './fr.json'
import enLocale from './en.json'

const messages = {
  fr: frLocale,
  en: enLocale,
}
const supportedLocales = Object.keys(messages)

const envLocale = (import.meta.env.VITE_I18N_DEFAULT_LOCALE as string) || 'fr'
const DEFAULT_LOCALE = supportedLocales.includes(envLocale) ? envLocale : 'fr'

const envFallbackLocale = import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en'
const FALLBACK_LOCALE = supportedLocales.includes(envFallbackLocale) ? envFallbackLocale : 'en'

const getSavedLanguagePreference = () => {
  try {
    const savedLanguagePreference = localStorage.getItem('language-preference')
    if (savedLanguagePreference && supportedLocales.includes(savedLanguagePreference)) {
      return savedLanguagePreference
    }
  } catch (error) {
    console.warn(error)
  }
  return null
}
const getBrowserLanguage = () => {
  if (navigator && navigator.language) {
    const browserLanguage = navigator.language.split('-')[0]
    if (browserLanguage && supportedLocales.includes(browserLanguage)) {
      return browserLanguage
    }
  }
  return null
}
const getInitialLocale = () => {
  return getSavedLanguagePreference() || getBrowserLanguage() || DEFAULT_LOCALE
}
const initialLocale = getInitialLocale()
document.documentElement.lang = initialLocale

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: FALLBACK_LOCALE,
  messages: messages,
  globalInjection: true,
})

export default i18n
