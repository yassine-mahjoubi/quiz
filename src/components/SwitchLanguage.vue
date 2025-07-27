<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale, availableLocales } = useI18n()
const emit = defineEmits<{
  'language-changed': [lang: string]
}>()

const persistPreference = (pref: string): void => {
  localStorage.setItem('language-preference', pref)
}
const changeLanguage = (newLocale: string): void => {
  try {
    locale.value = newLocale
    document.documentElement.lang = locale.value
    persistPreference(newLocale)
    emit('language-changed', newLocale)
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
    label: t(`common.languages.${langCode}`),
    display: langCode.toUpperCase(),
  })),
)
</script>

<template>
  <label for="locale-switch">{{ t('common.lang_choice') }}</label>
  <select v-model="locale" @change="changeLanguage(locale)" id="locale-switch">
    <option
      v-for="lang in languageOptions"
      :key="lang.lang"
      :value="lang.lang"
      :aria-label="lang.label"
      :lang="lang.lang"
    >
      {{ lang.display }}
    </option>
  </select>
</template>
