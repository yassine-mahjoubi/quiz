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
  <header class="container custom-header">
    <div>
      <p>{{ t('quizForm.title') }}</p>
    </div>
    <div>
      <switch-language @language-changed="handelUpdateScreen" />
    </div>
  </header>
</template>
<style lang="scss">
.custom-header {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding-top: 1rem;
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
