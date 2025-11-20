<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SwitchLanguage from '../SwitchLanguage.vue'
import BaseLogo from '../ui/BaseLogo.vue'

const { t } = useI18n()
const emit = defineEmits<{
  'language-changed': [lang: string]
}>()

const handelUpdateScreen = (lang: string) => {
  emit('language-changed', lang)
}
</script>
<template>
  <header class="container custom-header">
    <div class="logo">
      <base-logo />
      <p>{{ t('quizForm.title') }}</p>
    </div>
    <div>
      <switch-language @language-changed="handelUpdateScreen" />
    </div>
  </header>
</template>
<style lang="scss">
.logo {
  text-align: center;
}
.custom-header {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding-top: 1rem;
  margin-bottom: 1rem;
}
</style>
