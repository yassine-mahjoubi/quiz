<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section>
    <h1>{{ t('pages.about.title') }}</h1>
    <p>{{ t('pages.about.content') }}</p>
  </section>
</template>
