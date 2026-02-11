<script setup lang="ts">
import { computed, ref } from 'vue'
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
const isMenuOpen = ref<boolean>(false)
const closeMenu = () => (isMenuOpen.value = false)
</script>
<template>
  <header role="banner">
    <button
      class="btn-burguer-menu"
      @click="isMenuOpen = !isMenuOpen"
      :aria-label="isMenuOpen ? t('common.close') : t('common.open')"
      :aria-expanded="isMenuOpen"
    >
      <Icon
        aria-hidden="true"
        :icon="isMenuOpen ? 'mdi:close' : 'mdi:menu'"
        width="24"
        height="24"
      />
    </button>
    <nav role="navigation" aria-label="navigation principale" :class="{ open: isMenuOpen }">
      <ul>
        <li aria-hidden="true"><base-logo /></li>
        <li>
          <RouterLink to="/" title="home" @click="closeMenu">{{ t('nav.home') }} </RouterLink>
        </li>
        <li>
          <RouterLink to="/gallery-quiz" @click="closeMenu">{{ t('nav.gallery') }}</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" @click="closeMenu">{{ t('nav.about') }}</RouterLink>
        </li>
      </ul>
    </nav>

    <section class="nav-more">
      <switch-language @language-changed="handelUpdateScreen" />
      <button
        :title="labelThemeTranslated"
        :aria-label="labelThemeTranslated"
        @click="toggleMode()"
      >
        <Icon aria-hidden="true" :icon="updateIcon" width="24" height="24" style="color: #fff" />
      </button>
    </section>
  </header>
</template>
<style scoped>
.router-link-exact-active,
.router-link-active {
  text-decoration: underline;
}
header {
  display: flex;
  justify-content: space-between;
}
.nav-more {
  display: flex;
  gap: 1rem;
  select {
    margin: 0;
    height: max-content;
  }
  button {
    margin: 0;
    height: max-content;
  }
}

.btn-burguer-menu {
  display: none;
}
@media (max-width: 768px) {
  .btn-burguer-menu {
    display: block;
    height: max-content;
  }
  nav {
    position: fixed;
    right: -100%;
    top: 0;
    width: 80%;
    height: 100vh;
    background-color: #13171f;
    transition: right 0.3s ease-in-out;
    z-index: 999;
  }
  nav.open {
    right: 0;
    display: flex;
    justify-content: center;
  }
  nav ul {
    flex-direction: column;
  }
}
</style>
