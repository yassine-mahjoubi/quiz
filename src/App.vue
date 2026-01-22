<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
import { ref } from 'vue'
import HeaderLayout from './components/Layout/HeaderLayout.vue'
import FooterLayout from './components/Layout/FooterLayout.vue'
const showReaderScreen = ref<boolean>(false)

const handelUpdateScreen = () => {
  showReaderScreen.value = true
}
</script>
<template>
  <div class="layout container">
    <header-layout @language-changed="handelUpdateScreen" />
    <main class="main" role="main">
      <section
        v-if="showReaderScreen"
        aria-live="polite"
        aria-atomic="true"
        class="visually-hidden"
      >
        <p>
          {{ t('common.language_changed_announcement') }}
        </p>
      </section>
      <RouterView />
    </main>
    <Footer-layout />
  </div>
</template>
<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
}
</style>
