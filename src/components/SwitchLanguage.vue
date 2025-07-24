<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setI18nLanguage, SUPPORTED_LOCALES } from '@/plugins/i18n'

const { t, locale } = useI18n()
const isLoading = ref(false)

const changeLanguage = async (newLocale: string) => {
  if (newLocale === locale.value) return

  try {
    isLoading.value = true
    await setI18nLanguage(newLocale)

    // AJOUT: Forcer le re-render si nécessaire
    locale.value = newLocale

    // AJOUT: Vérification immédiate
    console.log('Current messages:', t('quizForm.title'))
  } catch (error) {
    console.error('Language change failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <select v-model="locale" @change="changeLanguage(locale)">
    <option v-for="lang in SUPPORTED_LOCALES" :key="lang" :value="lang">
      {{ lang.toUpperCase() }}
    </option>
  </select>
</template>
