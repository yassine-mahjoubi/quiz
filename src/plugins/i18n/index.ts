import { createI18n } from 'vue-i18n'
import { nextTick } from 'vue'

const DEFAULT_LOCALE = import.meta.env.VITE_I18N_DEFAULT_LOCALE || 'fr'
const FALLBACK_LOCALE = import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en'
export const SUPPORTED_LOCALES = (import.meta.env.VITE_I18N_SUPPORTED_LOCALES || 'fr,en').split(',')

// Cache pour les locales chargées
const loadedLocales = new Set<string>()

// 1. Chargement explicite des fichiers JSON
import frMessages from './fr.json'
import enMessages from './en.json'

const messagesMap: Record<string, any> = {
  fr: frMessages,
  en: enMessages,
}

// 2. Fonction de chargement simplifiée
async function loadLocaleMessages(locale: string) {
  if (loadedLocales.has(locale)) return messagesMap[locale]

  try {
    console.log(`Loading messages for ${locale}...`)
    const messages = messagesMap[locale] || messagesMap.fr

    loadedLocales.add(locale)
    return messages
  } catch (error) {
    console.error(`Error loading ${locale} messages:`, error)
    throw error
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages: {},
  silentFallbackWarn: true,
  missingWarn: false,
})

// Fonction d'initialisation principale
export async function initI18n() {
  try {
    const savedLocale = localStorage.getItem('user-locale') || DEFAULT_LOCALE
    const locale = SUPPORTED_LOCALES.includes(savedLocale) ? savedLocale : DEFAULT_LOCALE

    // Charger la locale principale
    const messages = await loadLocaleMessages(locale)
    i18n.global.setLocaleMessage(locale, messages)
    i18n.global.locale.value = locale
    document.querySelector('html')?.setAttribute('lang', locale)

    // Charger la locale de fallback
    if (FALLBACK_LOCALE !== locale && SUPPORTED_LOCALES.includes(FALLBACK_LOCALE)) {
      const fallbackMessages = await loadLocaleMessages(FALLBACK_LOCALE)
      i18n.global.setLocaleMessage(FALLBACK_LOCALE, fallbackMessages)
    }

    console.log('i18n initialized with locale:', locale)
    console.log('French messages:', i18n.global.getLocaleMessage('fr'))
    console.log('English messages:', i18n.global.getLocaleMessage('en'))

    return nextTick()
  } catch (error) {
    console.error('i18n initialization failed:', error)
    throw error
  }
}

export async function setI18nLanguage(locale: string) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    console.warn(`Unsupported locale: ${locale}`)
    locale = FALLBACK_LOCALE
  }

  if (!loadedLocales.has(locale)) {
    const messages = await loadLocaleMessages(locale)
    i18n.global.setLocaleMessage(locale, messages)
  }

  i18n.global.locale.value = locale
  document.querySelector('html')?.setAttribute('lang', locale)
  localStorage.setItem('user-locale', locale)

  return nextTick()
}

export { loadLocaleMessages }
