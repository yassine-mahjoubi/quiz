<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { useSeoMeta } from '@unhead/vue'

useSeoMeta({
  title: computed(() => t('seo.pages.about.meta.title')),
  description: computed(() => t('seo.pages.about.meta.description')),
  ogTitle: computed(() => t('seo.pages.about.meta.ogTitle')),
  ogDescription: computed(() => t('seo.pages.about.meta.ogDescription')),
  ogImage: computed(() => t('seo.pages.about.meta.ogImage')),
  ogUrl: computed(() => t('seo.pages.about.meta.ogUrl')),
  ogType: 'website',
  ogSiteName: computed(() => t('seo.pages.about.meta.ogSiteName')),
})
</script>

<template>
  <section>
    <h1>{{ t('pages.about.title') }}</h1>
    <p>{{ t('pages.about.content') }}</p>
  </section>
</template>
