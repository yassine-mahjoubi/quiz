import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLanguageSwitcher = () => {
  const { t, locale, availableLocales } = useI18n()

  const persistPreference = (pref: string): void => {
    try {
      localStorage.setItem('language-preference', pref)
    } catch (error) {
      if (error instanceof Error) {
        console.error('local storage failed:', error.message)
      } else {
        console.error('unknown error', error)
      }
    }
  }
  const changeLanguage = (newLocale: string): void => {
    try {
      locale.value = newLocale
      document.documentElement.lang = locale.value
      persistPreference(newLocale)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Language change failed:', error.message)
      } else {
        console.error('unknown error', error)
      }
    }
  }

  const languageOptions = computed(() =>
    availableLocales.map((langCode) => ({
      lang: langCode,
      label: t(`common.languages_choice_label.${langCode}`),
      display: langCode.toUpperCase(),
    })),
  )
  return {
    changeLanguage,
    languageOptions,
    locale,
    t,
  }
}
