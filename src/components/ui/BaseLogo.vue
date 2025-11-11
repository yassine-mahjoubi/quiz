<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { computed, ref, watchEffect } from 'vue'
import { Icon } from '@iconify/vue'

const dataTheme: HTMLElement | null = document.querySelector('html')
const savedThemeChoice = localStorage.getItem('mode')
const startWithDarkMode = savedThemeChoice === 'dark'
const enabledDarkMode = ref<boolean>(startWithDarkMode)

watchEffect(() => {
  const newThemeChoice = enabledDarkMode.value ? 'dark' : 'light'
  dataTheme?.setAttribute('data-theme', newThemeChoice)
  localStorage.setItem('mode', newThemeChoice)
})
const toggleMode = () => {
  enabledDarkMode.value = !enabledDarkMode.value
}
const labelThemeTranslated = computed(() => {
  return (
    t('common.mode.label') +
    ' ' +
    (enabledDarkMode.value ? t('common.mode.light') : t('common.mode.dark'))
  )
})
</script>
<template>
  <button
    class="bt-icon"
    :title="labelThemeTranslated"
    :aria-label="labelThemeTranslated"
    @click="toggleMode()"
  >
    <Icon aria-hidden="true" class="icon" icon="game-icons:wisdom" width="64" height="64" />
  </button>
</template>
<style lang="scss" scoped>
.bt-icon {
  padding: 5px;
  border-radius: 100%;
}
.icon {
  cursor: pointer;
  color: currentColor;
}
</style>
