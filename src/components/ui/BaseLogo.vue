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
    <Icon aria-hidden="true" class="icon" icon="game-icons:wisdom" width="36" height="36" />
  </button>
</template>
<style lang="scss" scoped>
.bt-icon {
  padding: 5px;
  border-radius: 100%;
}
</style>
