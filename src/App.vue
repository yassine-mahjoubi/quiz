<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
import { ref } from 'vue'
import HeaderLayout from './components/Layout/HeaderLayout.vue'
const showReaderScreen = ref<boolean>(false)

const handelUpdateScreen = () => {
  showReaderScreen.value = true
}
</script>
<template>
  <header-layout @language-changed="handelUpdateScreen" />
  <main class="container" role="main">
    <p v-if="showReaderScreen" aria-live="polite" aria-atomic="true" class="visually-hidden">
      {{ t('common.language_changed_announcement') }}
    </p>
  </main>
  <RouterView />
</template>
<style lang="scss">
.home-wrapper-layout {
  padding: 1rem;
}
</style>
