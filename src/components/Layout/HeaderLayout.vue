<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import SwitchLanguage from '../SwitchLanguage.vue'
import BaseLogo from '../ui/BaseLogo.vue'
import { useThemeSwitcher } from '@/composables/useThemeSwitch'

const emit = defineEmits<{
  'language-changed': [lang: string]
}>()

const handelUpdateScreen = (lang: string) => {
  emit('language-changed', lang)
}

const { t } = useI18n()

const { toggleMode, enabledDarkMode } = useThemeSwitcher()

const labelThemeTranslated = computed(() => {
  return (
    t('common.mode.label') +
    ' ' +
    (enabledDarkMode.value ? t('common.mode.light') : t('common.mode.dark'))
  )
})
const updateIcon = computed(() =>
  enabledDarkMode.value ? 'line-md:moon' : 'bitcoin-icons:sun-outline',
)
</script>
<template>
  <header role="banner">
    <nav role="navigation">
      <ul>
        <li>
          <div class="logo">
            <RouterLink to="/" title="home"> <base-logo /> </RouterLink>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <RouterLink to="/gallery-quiz">{{ t('nav.gallery') }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/about">{{ t('nav.about') }}</RouterLink>
        </li>
      </ul>
      <ul>
        <li><switch-language @language-changed="handelUpdateScreen" /></li>
        <li>
          <button
            :title="labelThemeTranslated"
            :aria-label="labelThemeTranslated"
            @click="toggleMode()"
          >
            <Icon
              aria-hidden="true"
              :icon="updateIcon"
              width="24"
              height="24"
              style="color: #fff"
            />
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style scoped>
.router-link-exact-active,
.router-link-active {
  text-decoration: underline;
}
</style>
