<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useThemeSwitcher } from '@/composables/useThemeSwitch'

const { t } = useI18n()

const { toggleMode, enabledDarkMode } = useThemeSwitcher()

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
