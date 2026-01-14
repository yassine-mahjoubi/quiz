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
  <header class="container custom-header" role="header">
    <div class="logo">
      <base-logo />
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
  padding-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
