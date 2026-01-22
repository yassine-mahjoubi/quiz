<script lang="ts" setup>
import { useLanguageSwitcher } from '../composables/useLanguageSwitch'
const { changeLanguage, languageOptions, locale, t } = useLanguageSwitcher()

const emit = defineEmits<{
  'language-changed': [lang: string]
}>()

const handleLanguageChange = (event: Event): void => {
  const target = event.target as HTMLSelectElement
  const newLocale = target.value
  changeLanguage(newLocale)
  emit('language-changed', newLocale)
}
</script>

<template>
  <select
    :value="locale"
    @change="handleLanguageChange"
    id="locale-switch"
    :aria-label="t('common.lang_choice')"
  >
    <option
      v-for="lang in languageOptions"
      :key="lang.lang"
      :value="lang.lang"
      :aria-label="lang.label"
      :lang="lang.lang"
    >
      {{ lang.display }}
    </option>
  </select>
  <p class="sr-only">
    {{ t('common.change_immidiate') }}
  </p>
</template>
