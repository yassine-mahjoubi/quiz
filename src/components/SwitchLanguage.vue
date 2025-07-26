<script lang="ts" setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale, availableLocales } = useI18n()
const emit = defineEmits<{
  'language-changed': [lang: string]
}>()

onMounted(() => console.log('local on muonted from i18n:', locale.value))
const persistPreference = (pref: string): void => {
  localStorage.setItem('language-preference', pref)
}
const changeLanguage = (newLocale: string): void => {
  console.log('child: ancien locale ', locale.value)

  try {
    locale.value = newLocale
    document.documentElement.lang = locale.value
    persistPreference(newLocale)
    emit('language-changed', newLocale)
    console.log('child: newLocale', newLocale)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Language change failed:', error.message)
    } else {
      console.error('unknown error', error)
    }
  }
}

//to do fix changement brusque de l'interface critere:
/**
 * 1. Documentation Officielle du W3C (WCAG 2.1) :
       * Critère 3.2.2 Au déclenchement : https://www.w3.org/TR/WCAG21/#on-input (https://www.w3.org/TR/WCAG21/#on-input)
       * Comprendre le critère 3.2.2 : https://www.w3.org/WAI/WCAG21/Understanding/on-input.html (https://www.w3.org/WAI/WCAG21/Understanding/on-input.html)

   2. Référentiel Général d'Amélioration de l'Accessibilité (RGAA) en France :
       * Le RGAA est la mise en œuvre française des WCAG. Le critère correspondant est le Critère 13.1.
       * Critère 13.1 : https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode/criteres/#crit-13-1
         (https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode/criteres/#crit-13-1)
       * Ce critère stipule : "Pour chaque page web, l'utilisateur est-il averti des changements de contexte ?" et le test 13.1.1 vérifie si le changement de contexte est
         initié par un bouton ou un lien.

 */
</script>

<template>
  <label for="locale-switch">{{ t('common.lang') }}</label>
  <select v-model="locale" @change="changeLanguage(locale)" id="locale-switch">
    <option v-for="lang in availableLocales" :key="lang" :value="lang">
      {{ lang.toUpperCase() }}
    </option>
  </select>
</template>
