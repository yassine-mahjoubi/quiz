<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t, locale, availableLocales } = useI18n()

const persistPreference = (newlocal: string) => {
  return localStorage.setItem('language-preference', newlocal)
}
const changeLanguage = async (newLocale: string) => {
  try {
    locale.value = newLocale
    document.documentElement.lang = locale.value
    persistPreference(newLocale)
  } catch (error) {
    console.error('Language change failed:', error)
  }
}

// TODO: Gérer l'événement @language-changed dans le composant parent (App.vue)
// centraliser le msgreader announcement dans le app.vue
// pour mettre à jour la région live qui annonce le changement de langue.
// update changeLangue code
</script>

<template>
  <p aria-live="polite" aria-atomic="true" class="visually-hidden">
    {{ t('common.language_changed_announcement') }}
  </p>
  <label for="locale-switch">{{ t('common.lang') }}</label>
  <select v-model="locale" @change="changeLanguage(locale)" id="locale-switch">
    <option v-for="lang in availableLocales" :key="lang" :value="lang">
      {{ lang.toUpperCase() }}
    </option>
  </select>
</template>
