<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

import SwitchLanguage from '../SwitchLanguage.vue'

const emit = defineEmits<{
  'language-changed': [lang: string]
}>()

const handelUpdateScreen = (lang: string) => {
  emit('language-changed', lang)
}
</script>
<template>
  <header class="container">
    <nav>
      <ul>
        <li>
          <h1>{{ t('quizForm.title') }}</h1>
        </li>
      </ul>
      <ul>
        <li><switch-language @language-changed="handelUpdateScreen" /></li>
      </ul>
    </nav>
  </header>
</template>
